import { io } from "socket.io-client";
import settings from "./settings.ts";

export const socketClient = io(settings.BACKEND_ORIGIN, {
	autoConnect: false,
	withCredentials: true,
});
