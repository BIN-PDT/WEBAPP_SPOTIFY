import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
	isLoading: boolean;
	error: string | null;
	isAdmin: boolean;

	checkAdminRole: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoading: false,
	error: null,
	isAdmin: false,

	checkAdminRole: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.data.admin });
		} catch (error: any) {
			set({ isAdmin: false, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ isLoading: false, error: null, isAdmin: false });
	},
}));
