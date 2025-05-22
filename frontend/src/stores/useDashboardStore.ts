import type { AdminAlbum } from "@/types";
import { create } from "zustand";

interface DashboardStore {
	selectedAlbum: AdminAlbum | null;

	setSelectedAlbum: (album: AdminAlbum | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
	selectedAlbum: null,

	setSelectedAlbum: (album) => {
		set({ selectedAlbum: album });
	},
}));
