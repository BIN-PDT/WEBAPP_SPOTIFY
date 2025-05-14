import mongoose from "mongoose";
import settings from "./settings.config.js";

export async function connectDatabase() {
	try {
		const conn = await mongoose.connect(settings.DATABASE_URI);
		console.log("MongoDB connected successfully!", conn.connection.host);
	} catch (error) {
		console.log("MongoDB connected unsuccessfully!", error);
		process.exit(1);
	}
}
