import {
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume1,
	Volume2,
	VolumeOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/utils";

const PlaybackControl = () => {
	const {
		queue,
		isPlaying,
		currentSong,
		currentIndex,
		isRepeated,
		isShuffled,
		togglePlay,
		playNext,
		playPrev,
		toggleRepeat,
		toggleShuffle,
	} = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) audioRef.current.currentTime = value[0];
	};

	useEffect(() => {
		audioRef.current = document.querySelector("audio");
		const audioElement = audioRef.current;
		if (!audioElement) return;

		const updateTime = () => setCurrentTime(audioElement.currentTime);
		const updateDuration = () => setDuration(audioElement.duration);

		audioElement.addEventListener("timeupdate", updateTime);
		audioElement.addEventListener("loadedmetadata", updateDuration);

		return () => {
			audioElement.removeEventListener("timeupdate", updateTime);
			audioElement.removeEventListener("loadedmetadata", updateDuration);
		};
	}, [currentSong]);

	return (
		<footer className="h-24 mx-2 px-4 bg-zinc-900 border-t border-zinc-800 rounded-t-md">
			<div className="flex items-center justify-between h-full max-w-[1800px] mx-auto">
				{/* SONG INFO */}
				<div className="hidden sm:flex items-center gap-4 min-w-[150px] w-[27.5%] justify-start">
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className="size-14 object-cover rounded-md"
							/>
							<div className="flex-1 min-w-0 font-content">
								<div className="font-medium truncate">
									{currentSong.title}
								</div>
								<div className="text-sm text-zinc-400 truncate">
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>
				{/* PLAYER CONTROLS */}
				<div className="flex flex-col items-center gap-3 flex-1 max-w-full sm:max-w-[45%]">
					<div className="flex items-center gap-4 sm:gap-5">
						{/* TOGGLE SHUFFLE */}
						<Button
							size="icon"
							variant={isShuffled ? "outline" : "ghost"}
							className="hidden sm:inline-flex hover:text-white text-zinc-400"
							onClick={toggleShuffle}
							disabled={queue.length === 0}
						>
							<Shuffle />
						</Button>
						{/* PLAY PREVIOUS */}
						<Button
							size="icon"
							variant="ghost"
							className="hover:text-white text-zinc-400"
							onClick={() => playPrev(audioRef.current)}
							disabled={queue.length === 0 || currentIndex === 0}
						>
							<SkipBack />
						</Button>
						{/* TOGGLE PLAY */}
						<Button
							size="icon"
							className="size-8 rounded-full text-white"
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? (
								<Pause className="fill-white" />
							) : (
								<Play className="fill-white" />
							)}
						</Button>
						{/* PLAY NEXT */}
						<Button
							size="icon"
							variant="ghost"
							className="hover:text-white text-zinc-400"
							onClick={() => playNext(audioRef.current)}
							disabled={
								queue.length === 0 ||
								currentIndex === queue.length - 1
							}
						>
							<SkipForward />
						</Button>
						{/* TOGGLE REPEAT */}
						<Button
							size="icon"
							variant={isRepeated ? "outline" : "ghost"}
							className="hidden sm:inline-flex hover:text-white text-zinc-400"
							onClick={toggleRepeat}
						>
							<Repeat />
						</Button>
					</div>

					<div className="hidden sm:flex items-center gap-2 w-full font-content">
						<div className="text-xs text-zinc-400">
							{formatDuration(currentTime)}
						</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className="w-full hover:cursor-grab active:cursor-grabbing"
							onValueChange={handleSeek}
						/>
						<div className="text-xs text-zinc-400">
							{formatDuration(duration)}
						</div>
					</div>
				</div>
				{/* VOLUME CONTROLS */}
				<div className="hidden sm:flex items-center gap-4 min-w-[150px] w-[27.5%] justify-end">
					{/* ADJUST SPEAKER */}
					<div className="flex items-center gap-2">
						<Button
							size="icon"
							onClick={() => {
								const value = volume === 0 ? 75 : 0;
								setVolume(value);
								if (audioRef.current) {
									audioRef.current.volume = value / 100;
								}
							}}
							variant="ghost"
							className="hover:text-white text-zinc-400"
						>
							{volume === 0 ? (
								<VolumeOff />
							) : volume < 50 ? (
								<Volume1 />
							) : (
								<Volume2 />
							)}
						</Button>

						<Slider
							value={[volume]}
							max={100}
							step={1}
							className="w-24 hover:cursor-grab active:cursor-grabbing"
							onValueChange={(value) => {
								setVolume(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default PlaybackControl;
