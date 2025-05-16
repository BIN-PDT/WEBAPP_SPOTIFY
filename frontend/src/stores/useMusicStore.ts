import type { Album, Song } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface MusicStore {
	isLoading: boolean;
	error: string | null;
	songs: Song[];
	albums: Album[];
	currentAlbum: Album | null;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	isLoading: false,
	error: null,
	songs: [],
	albums: [],
	currentAlbum: null,

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));
