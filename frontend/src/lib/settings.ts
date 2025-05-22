const env = import.meta.env;

const settings = {
	CLERK_PUBLISHABLE_KEY: env.VITE_CLERK_PUBLISHABLE_KEY,
	BACKEND_ORIGIN: env.MODE === "development" ? env.VITE_BACKEND_ORIGIN : "/",
	BACKEND_URL: env.MODE === "development" ? env.VITE_BACKEND_URL : "/api",
};

export default settings;
