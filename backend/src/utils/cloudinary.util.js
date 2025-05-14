import cloudinary from "../configs/cloudinary.config.js";

export async function uploadToCloudinary(file) {
	const result = await cloudinary.uploader.upload(file.tempFilePath, {
		resource_type: "auto",
	});
	return result.url;
}
