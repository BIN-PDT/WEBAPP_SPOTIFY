import type { User } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface ChatSore {
	isLoading: boolean;
	error: string | null;
	users: User[];

	fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatSore>((set) => ({
	isLoading: false,
	error: null,
	users: [],

	fetchUsers: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/users");
			set({ users: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));
