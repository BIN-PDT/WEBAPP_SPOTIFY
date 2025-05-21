import cloudinary from "../configs/cloudinary.config.js";

export async function uploadToCloudinary(file) {
	const result = await cloudinary.uploader.upload(file.tempFilePath, {
		resource_type: "auto",
	});
	return [result.public_id, result.url];
}

export async function removeOfCloudinary(public_id, resource_type) {
	await cloudinary.uploader.destroy(public_id, { resource_type });
}
