import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
	try {
		const connectionInstennce = await mongoose.connect(`${process.env.MONGOURI}/${DB_NAME}`)
		console.log(`\n MongoDb connected !! DB HOST:${connectionInstennce.connection.host}`);


	} catch (error) {
		console.log("MongoDB  connection error", error);
		process.exit(1)


	}
}
export default connectDB
