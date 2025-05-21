import { io } from "socket.io-client";

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;

export const socketClient = io(BACKEND_ORIGIN, {
	autoConnect: false,
	withCredentials: true,
});
