import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface AuthStore {
	isLoading: boolean;
	isAdmin: boolean;

	checkAdminRole: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoading: false,
	isAdmin: false,

	checkAdminRole: async () => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.data.admin });
		} catch (error: any) {
			console.log(error);
			set({ isAdmin: false });
		} finally {
			set({ isLoading: false });
		}
	},
}));
