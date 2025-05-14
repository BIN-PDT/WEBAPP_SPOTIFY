import { v2 as cloudinary } from "cloudinary";
import settings from "./settings.config.js";

cloudinary.config({
	cloud_name: settings.CLOUDINARY_CLOUD_NAME,
	api_key: settings.CLOUDINARY_API_KEY,
	api_secret: settings.CLOUDINARY_API_SECRET,
});

export default cloudinary;
