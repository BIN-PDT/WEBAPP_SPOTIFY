import { Server } from "socket.io";
import settings from "./settings.config.js";

export function initializeSocket(server) {
	const io = new Server(server, {
		cors:
			process.env.NODE_ENV !== "production"
				? { origin: settings.FRONTEND_ORIGIN, credentials: true }
				: undefined,
	});

	const userSockets = new Map();
	const userActivities = new Map();

	io.on("connection", (socket) => {
		socket.on("connect_user", (userId) => {
			userSockets.set(userId, socket.id);
			userActivities.set(userId, null);

			io.emit("user_connected", userId);
			socket.emit("online_users", Array.from(userSockets.keys()));
			socket.emit("activities", Array.from(userActivities.entries()));
		});

		socket.on("update_activity", ({ userId, activity }) => {
			userActivities.set(userId, activity);

			io.emit("activity_updated", { userId, activity });
		});

		socket.on("disconnect", () => {
			for (const [userId, socketId] of userSockets.entries()) {
				if (socketId === socket.id) {
					userSockets.delete(userId);
					userActivities.delete(userId);

					io.emit("user_disconnected", userId);
					break;
				}
			}
		});
	});
}
