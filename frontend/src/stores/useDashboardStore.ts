import type { AdminAlbum, Song } from "@/types";
import { create } from "zustand";

interface DashboardStore {
	selectedSong: Song | null;
	selectedAlbum: AdminAlbum | null;

	setSelectedSong: (song: Song | null) => void;
	setSelectedAlbum: (album: AdminAlbum | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
	selectedAlbum: null,
	selectedSong: null,

	setSelectedSong: (song) => {
		set({ selectedSong: song });
	},
	setSelectedAlbum: (album) => {
		set({ selectedAlbum: album });
	},
}));
