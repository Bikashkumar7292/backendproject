// require ('dotenv').config({path:'.env'})
import { app } from "./app.js"
import dotenv from 'dotenv'


import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js"
import connectDB from "./db/index.js";

dotenv.config({
	path: './env'
})





connectDB()
	.then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server is running port at:${process.env.PORT}`);

		})
	})
	.catch((err) => {
		console.log("Mongo db connection faild !!!", err);

	})
// (async () => {
// 	try {
// 		await mongoose.connect(`${process.env.MONGOURI}/${DB_NAME}`)

// 	} catch (error) {
// 		console.error("ERROR:", error)
// 		throw err


// 	}
// })()
