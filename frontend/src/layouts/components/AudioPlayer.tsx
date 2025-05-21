import { useEffect, useRef } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AudioPlayer = () => {
	const { update_activity } = useChatStore();
	const { isPlaying, currentSong, playNext } = usePlayerStore();
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	// HANDLE PLAY/PAUSE.
	useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement) return;

		if (isPlaying) audioElement.play();
		else audioElement.pause();
	}, [isPlaying]);
	// HANDLE SONG ENDED.
	useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement) return;

		function handleEnded() {
			playNext(audioRef.current);
		}

		audioElement.addEventListener("ended", handleEnded);
		return () => audioElement.removeEventListener("ended", handleEnded);
	}, []);
	// HANDLE SONG CHANGED.
	useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement || !currentSong) return;

		if (prevSongRef.current !== currentSong.audioUrl) {
			prevSongRef.current = currentSong.audioUrl;

			audioElement.src = currentSong.audioUrl;
			audioElement.currentTime = 0;
			if (isPlaying) audioElement.play();
		}
		// UPDATE TO SOCKET.
		const activity = isPlaying
			? { title: currentSong.title, artist: currentSong.artist }
			: null;
		update_activity(activity);
	}, [isPlaying, currentSong]);

	return <audio ref={audioRef} />;
};

export default AudioPlayer;
