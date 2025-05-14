import "dotenv/config";

const settings = {
	PORT: process.env.PORT,
	DATABASE_URI: process.env.DATABASE_URI,
	ADMIN_EMAIL: process.env.ADMIN_EMAIL,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default settings;
