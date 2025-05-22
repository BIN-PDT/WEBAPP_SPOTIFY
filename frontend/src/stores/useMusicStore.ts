import type { AdminAlbum, Album, Song, Stats } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { handleAPIError, toastError, toastSuccess } from "@/utils";

interface MusicStore {
	isLoading: boolean;
	songs: Song[];
	albums: AdminAlbum[];
	currentAlbum: Album | null;
	featuredSongs: Song[];
	personalSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchSongs: (signal: AbortSignal) => Promise<void>;
	fetchAlbums: (signal: AbortSignal) => Promise<void>;
	fetchAlbumById: (id: string, signal: AbortSignal) => Promise<void>;
	fetchFeaturedSongs: (signal: AbortSignal) => Promise<void>;
	fetchPersonalSongs: (signal: AbortSignal) => Promise<void>;
	fetchTrendingSongs: (signal: AbortSignal) => Promise<void>;
	fetchStats: (signal: AbortSignal) => Promise<void>;
	createSong: (data: FormData) => Promise<void>;
	updateSong: (id: string, data: FormData) => Promise<void>;
	deleteSong: (id: string, albumId: string | null) => Promise<void>;
	createAlbum: (data: FormData) => Promise<void>;
	updateAlbum: (id: string, data: FormData) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	isLoading: false,
	songs: [],
	albums: [],
	currentAlbum: null,
	featuredSongs: [],
	personalSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},

	fetchSongs: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/songs", { signal });
			set({ songs: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchAlbums: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/albums", { signal });
			set({ albums: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchAlbumById: async (id, signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get(`/albums/${id}`, {
				signal,
			});
			set({ currentAlbum: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchFeaturedSongs: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/songs/featured", {
				signal,
			});
			set({ featuredSongs: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchPersonalSongs: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/songs/personal", {
				signal,
			});
			set({ personalSongs: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchTrendingSongs: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/songs/trending", {
				signal,
			});
			set({ trendingSongs: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchStats: async (signal) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/stats", { signal });
			set({ stats: response.data.data });
		} catch (error: any) {
			handleAPIError(error);
		} finally {
			set({ isLoading: false });
		}
	},
	createSong: async (data) => {
		const response = await axiosInstance.post("/admin/songs", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const newSong: Song = response.data.data.song;

		set((state) => ({ songs: [newSong, ...state.songs] }));
		if (newSong.albumId) {
			set((state) => ({
				albums: state.albums.map((album) =>
					album._id === newSong.albumId
						? { ...album, songs: [...album.songs, newSong._id] }
						: album
				),
			}));
		}
	},
	updateSong: async (id, data) => {
		const response = await axiosInstance.patch(`/admin/songs/${id}`, data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const updatedSong = response.data.data.song;

		set((state) => ({
			songs: state.songs.map((song) =>
				song._id === id ? updatedSong : song
			),
		}));
	},
	deleteSong: async (id, albumId) => {
		set({ isLoading: true });

		try {
			await axiosInstance.delete(`admin/songs/${id}`);
			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			if (albumId) {
				set((state) => ({
					albums: state.albums.map((album) =>
						album._id === albumId
							? {
									...album,
									songs: album.songs.filter(
										(songId) => songId !== id
									),
							  }
							: album
					),
				}));
			}

			toastSuccess("Deleted song successfully.");
		} catch (error: any) {
			handleAPIError(error);
			toastError("Deleted song unsuccessfully.");
		} finally {
			set({ isLoading: false });
		}
	},
	createAlbum: async (data) => {
		const response = await axiosInstance.post("/admin/albums", data, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		const newAlbum: AdminAlbum = response.data.data.album;

		set((state) => ({ albums: [newAlbum, ...state.albums] }));
	},
	updateAlbum: async (id, data) => {
		const response = await axiosInstance.patch(
			`/admin/albums/${id}`,
			data,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		const updatedAlbum: AdminAlbum = response.data.data.album;

		set((state) => ({
			albums: state.albums.map((album) =>
				album._id === id ? updatedAlbum : album
			),
		}));
	},
	deleteAlbum: async (id) => {
		set({ isLoading: true });

		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === id ? { ...song, albumId: null } : song
				),
			}));

			toastSuccess("Deleted album successfully.");
		} catch (error: any) {
			handleAPIError(error);
			toastError("Deleted album unsuccessfully.");
		} finally {
			set({ isLoading: false });
		}
	},
}));
