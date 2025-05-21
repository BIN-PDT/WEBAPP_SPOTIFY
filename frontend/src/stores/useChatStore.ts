import type { User } from "@/types";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { handleAPIError } from "@/utils";
import { socketClient, type SocketAuth } from "@/lib/socket";

type UserActivity = { title: string; artist: string };

interface ChatSore {
	isLoading: boolean;
	users: User[];
	socket: Socket;
	isConnected: boolean;
	onlineUsers: Set<string>;
	userActivities: Map<string, UserActivity | null>;

	initializeSocket: (userId: string) => void;
	disconnectSocket: () => void;
	update_activity: (activity: UserActivity | null) => void;
	fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatSore>((set, get) => ({
	isLoading: false,
	users: [],
	socket: socketClient,
	isConnected: false,
	onlineUsers: new Set(),
	userActivities: new Map(),

	initializeSocket: (userId) => {
		const { socket, isConnected } = get();
		if (isConnected) return;

		socket.auth = { userId };
		socket.connect();
		socket.emit("connect_user", userId);

		socket.on("user_connected", (userId: string) => {
			set((state) => ({
				onlineUsers: new Set([...state.onlineUsers, userId]),
			}));
		});

		socket.on("user_disconnected", (userId: string) => {
			set((state) => {
				const newOnlineUsers = new Set(state.onlineUsers);
				newOnlineUsers.delete(userId);
				const newUserActivities = new Map(state.userActivities);
				newUserActivities.delete(userId);

				return {
					onlineUsers: newOnlineUsers,
					userActivities: newUserActivities,
				};
			});
		});

		socket.on("online_users", (users: string[]) => {
			set({ onlineUsers: new Set(users) });
		});

		socket.on("activities", (activities: [string, UserActivity][]) => {
			set({ userActivities: new Map(activities) });
		});

		socket.on("activity_updated", ({ userId, activity }) => {
			set((state) => {
				const newUserActivities = new Map(state.userActivities);
				newUserActivities.set(userId, activity);
				return { userActivities: newUserActivities };
			});
		});

		set({ isConnected: true });
	},
	disconnectSocket: () => {
		const { socket, isConnected } = get();
		if (!isConnected) return;

		socket.disconnect();
		set({ isConnected: false });
	},
	update_activity: (activity) => {
		const { socket, isConnected } = get();
		if (!isConnected) return;

		const { userId } = socket.auth as SocketAuth;
		if (userId) socket.emit("update_activity", { userId, activity });
	},
	fetchUsers: async () => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/users");
			set({ users: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
}));
