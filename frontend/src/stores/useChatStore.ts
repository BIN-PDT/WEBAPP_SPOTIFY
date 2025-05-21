import type { User } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { handleAPIError } from "@/utils";

interface ChatSore {
	isLoading: boolean;
	users: User[];

	fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatSore>((set) => ({
	isLoading: false,
	users: [],

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
