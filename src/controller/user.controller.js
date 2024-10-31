import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

	const { fullName, email, username, password } = req.body
	console.log("email", email);

	if (
		[fullName, email, username, password].some((field) => field?.trim() === "")
	) {
		throw new ApiError("Please fill in all fields");


	}

	const existedUsers = User.findOne({
		$or: [{ username }, { email }]
	})
	if (existedUsers) {
		throw new ApiError(409, "user with this emai or username already exists");

	}
	const avatarLocalPath = req.files?.avatar[0]?.path;
	const coverImagelocalpath = req.files?.coverImage[0]?.path;
	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar file is require");


	}
	const avatar = await uploadOnCloudinary(avatarLocalPath)
	const coverImage = await uploadOnCloudinary(coverImagelocalpath)
	if (!avatar) {
		throw new ApiError(400, "Avatar file is require");

	}

	const user = await User.create({
		fullName,
		avatar: avatar.url,
		coverImage: coverImage?.url || "",
		email,
		password,
		username: username.toLowerCase()
	})
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	)
	if (!createdUser) {
		throw new ApiError(500, "Usomthing went wrong while register user");
	}
	return res.status(201).json(
		new ApiResponse(200, createdUser, "user register successfuly")

	)
})

export { registerUser }
