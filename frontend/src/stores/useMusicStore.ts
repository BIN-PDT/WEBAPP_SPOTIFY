import type { Album, Song, Stats } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toastError, toastSuccess } from "@/utils";

interface AdminAlbum {
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: string[];
}

interface MusicStore {
	isLoading: boolean;
	songs: Song[];
	albums: AdminAlbum[];
	currentAlbum: Album | null;
	featuredSongs: Song[];
	personalSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchSongs: () => Promise<void>;
	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: (signal: AbortSignal) => Promise<void>;
	fetchPersonalSongs: (signal: AbortSignal) => Promise<void>;
	fetchTrendingSongs: (signal: AbortSignal) => Promise<void>;
	fetchStats: () => Promise<void>;
	createSong: (data: FormData) => Promise<void>;
	deleteSong: (id: string, albumId: string | null) => Promise<void>;
	createAlbum: (data: FormData) => Promise<void>;
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

	fetchSongs: async () => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data.data });
		} catch (error: any) {
			console.log(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchAlbums: async () => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data.data });
		} catch (error: any) {
			console.log(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchAlbumById: async (id) => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data.data });
		} catch (error: any) {
			console.log(error);
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
			console.log(error);
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
			console.log(error);
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
			console.log(error);
		} finally {
			set({ isLoading: false });
		}
	},
	fetchStats: async () => {
		set({ isLoading: true });

		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data.data });
		} catch (error: any) {
			console.log(error);
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
			console.log(error);
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
			console.log(error);
			toastError("Deleted album unsuccessfully.");
		} finally {
			set({ isLoading: false });
		}
	},
}));
