import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
	queue: Song[];
	isPlaying: boolean;
	currentSong: Song | null;
	currentIndex: number;

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	playSong: (song: Song) => void;
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
		if (get().queue.length > 0) return;

		const newQueue = [...songs];
		set({ queue: newQueue, currentSong: newQueue[0], currentIndex: 0 });
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
	playSong: (song) => {
		set({
			queue: [],
			currentSong: song,
			currentIndex: -1,
			isPlaying: true,
		});
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
