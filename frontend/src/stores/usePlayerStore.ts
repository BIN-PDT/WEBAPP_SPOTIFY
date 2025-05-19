import type { Song } from "@/types";
import { create } from "zustand";
import { shuffle } from "@/utils";

interface PlayerStore {
	queue: Song[];
	originalSongs: Song[];
	isPlaying: boolean;
	currentSong: Song | null;
	currentIndex: number;
	isRepeated: boolean;
	isShuffled: boolean;

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	playSong: (song: Song) => void;
	togglePlay: () => void;
	playNext: (audio: HTMLAudioElement | null) => void;
	playPrev: (audio: HTMLAudioElement | null) => void;
	shuffleSongs: () => void;
	toggleRepeat: () => void;
	toggleShuffle: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	queue: [],
	originalSongs: [],
	isPlaying: false,
	currentSong: null,
	currentIndex: -1,
	isRepeated: false,
	isShuffled: false,

	initializeQueue: (songs) => {
		const { queue, shuffleSongs } = get();
		if (queue.length > 0) return;

		const newQueue = [...songs];
		set({
			queue: newQueue,
			originalSongs: newQueue,
			currentSong: newQueue[0],
			currentIndex: 0,
		});
		shuffleSongs();
	},
	playAlbum: (songs, startIndex = 0) => {
		const { shuffleSongs } = get();
		if (songs.length === 0) return;

		const newQueue = [...songs];
		set({
			queue: newQueue,
			originalSongs: newQueue,
			currentSong: newQueue[startIndex],
			currentIndex: startIndex,
			isPlaying: true,
		});
		shuffleSongs();
	},
	playSong: (song) => {
		set({
			queue: [],
			originalSongs: [],
			currentSong: song,
			currentIndex: -1,
			isPlaying: true,
			isShuffled: false,
		});
	},
	togglePlay: () => {
		const { isPlaying } = get();
		const willStartPlaying = !isPlaying;

		set({ isPlaying: willStartPlaying });
	},
	playNext: (audio) => {
		if (!audio) return;

		const { currentIndex, queue, isRepeated } = get();
		const nextIndex = currentIndex + 1;

		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];

			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else {
			if (!isRepeated) set({ isPlaying: false });
			else {
				if (queue.length > 0) {
					set({ currentSong: queue[0], currentIndex: 0 });
				}
				audio.play();
			}
		}
	},
	playPrev: (audio) => {
		if (!audio) return;

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
	shuffleSongs: () => {
		const { queue, currentSong, isShuffled } = get();

		if (isShuffled) {
			const shuffledSongs = shuffle(queue);
			const currentIndex = shuffledSongs.findIndex(
				(song) => song._id === currentSong?._id
			);
			set({ queue: shuffledSongs, currentIndex: currentIndex });
		}
	},
	toggleRepeat: () => {
		const { isRepeated } = get();
		const willStartRepeating = !isRepeated;

		set({ isRepeated: willStartRepeating });
	},
	toggleShuffle: () => {
		const { originalSongs, currentSong, isShuffled, shuffleSongs } = get();
		const willStartShuffling = !isShuffled;

		set({ isShuffled: willStartShuffling });
		if (willStartShuffling) shuffleSongs();
		else {
			const currentIndex = originalSongs.findIndex(
				(song) => song._id === currentSong?._id
			);
			set({ queue: originalSongs, currentIndex: currentIndex });
		}
	},
}));
