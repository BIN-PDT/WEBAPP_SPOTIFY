import type { Album, Song } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface MusicStore {
	isLoading: boolean;
	error: string | null;
	songs: Song[];
	albums: Album[];
	currentAlbum: Album | null;
	featuredSongs: Song[];
	personalSongs: Song[];
	trendingSongs: Song[];

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: (signal: AbortSignal) => Promise<void>;
	fetchPersonalSongs: (signal: AbortSignal) => Promise<void>;
	fetchTrendingSongs: (signal: AbortSignal) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	isLoading: false,
	error: null,
	songs: [],
	albums: [],
	currentAlbum: null,
	featuredSongs: [],
	personalSongs: [],
	trendingSongs: [],

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
	fetchFeaturedSongs: async (signal) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/featured", {
				signal,
			});
			set({ featuredSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response?.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchPersonalSongs: async (signal) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/personal", {
				signal,
			});
			set({ personalSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response?.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	fetchTrendingSongs: async (signal) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/songs/trending", {
				signal,
			});
			set({ trendingSongs: response.data.data });
		} catch (error: any) {
			set({ error: error.response?.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));
