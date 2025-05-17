import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
	queue: Song[];
	isPlaying: boolean;
	currentSong: Song | null;
	currentIndex: number;

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	handlePlay: (song: Song) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	queue: [],
	isPlaying: false,
	currentSong: null,
	currentIndex: -1,

	initializeQueue: (songs) => {
		set({
			queue: songs,
			currentSong: get().currentSong || songs[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		});
	},
	playAlbum: (songs, startIndex = 0) => {
		if (songs.length === 0) return;
		const song = songs[startIndex];

		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},
	setCurrentSong: (song) => {
		if (!song) return;
		const songIndex = get().queue.findIndex((s) => s._id === song._id);

		set({
			currentSong: song,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
			isPlaying: true,
		});
	},
	handlePlay: (song) => {
		const isCurrentSong = get().currentSong?._id === song._id;

		if (isCurrentSong) get().togglePlay();
		else get().setCurrentSong(song);
	},
	togglePlay: () => {
		const willStartPlaying = !get().isPlaying;

		set({ isPlaying: willStartPlaying });
	},
	playNext: () => {
		const { currentIndex, queue } = get();
		const nextIndex = currentIndex + 1;

		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];

			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else {
			set({ isPlaying: false });
		}
	},
	playPrevious: () => {
		const { currentIndex, queue } = get();
		const previousIndex = currentIndex - 1;

		if (previousIndex >= 0) {
			const previousSong = queue[previousIndex];

			set({
				currentSong: previousSong,
				currentIndex: previousIndex,
				isPlaying: true,
			});
		} else {
			set({ isPlaying: false });
		}
	},
}));
