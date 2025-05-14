import "dotenv/config";

const settings = {
	PORT: process.env.PORT,
	DATABASE_URI: process.env.DATABASE_URI,
	ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};

export default settings;
