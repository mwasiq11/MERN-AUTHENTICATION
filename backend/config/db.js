import mongoose from "mongoose";

export const connectDB=async()=>{
	try {
		const MongoDB=await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${MongoDB.connection.host}`);
	} catch (error) {
		console.log("Error while connecting to database",error);
		process.exit(1);
	}
}