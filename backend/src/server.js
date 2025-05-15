import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import { clerkMiddleware } from "@clerk/express";
import settings from "./configs/settings.config.js";
import { frontendCORS } from "./configs/cors.config.js";
import { connectDatabase } from "./configs/database.config.js";
import router from "./routes/index.route.js";

const __dirname = path.resolve();

const app = express();

if (process.env.NODE_ENV !== "production") app.use(frontendCORS);
app.use(express.json());
app.use(clerkMiddleware());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024,
		},
	})
);

app.use("/api", router);

app.listen(settings.PORT, async () => {
	console.log(`Server is running on port ${settings.PORT}.`);
	await connectDatabase();
});
