import express from "express";
import settings from "./configs/settings.config.js";
import { connectDatabase } from "./configs/database.config.js";
import router from "./routes/index.route.js";

const app = express();

app.use("/api", router);

app.listen(settings.PORT, async () => {
	console.log(`Server is running on port ${settings.PORT}.`);
	await connectDatabase();
});
