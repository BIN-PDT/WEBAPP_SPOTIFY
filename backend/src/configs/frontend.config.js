import path from "path";
import express from "express";

function connectFrontend(app) {
	const __dirname = path.resolve();

	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("/{*splat}", (_, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});

	console.log("Frontend connected successfully!");
}

export default connectFrontend;
