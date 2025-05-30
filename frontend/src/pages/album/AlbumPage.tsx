import { Clock, Disc3, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatDuration } from "@/utils";

const AlbumPage = () => {
	const { id } = useParams();
	const [isPlayed, setIsPlayed] = useState(false);
	const { isLoading, currentAlbum, fetchAlbumById } = useMusicStore();
	const {
		isPlaying,
		currentSong,
		playedAlbumId,
		setPlayedAlbum,
		playAlbum,
		togglePlay,
	} = usePlayerStore();

	useEffect(() => {
		const abortController = new AbortController();

		if (id) fetchAlbumById(id, abortController.signal);

		return () => abortController.abort();
	}, [id]);

	useEffect(() => {
		if (!currentAlbum) setIsPlayed(false);
		else setIsPlayed(currentAlbum._id === playedAlbumId);
	}, [currentAlbum, playedAlbumId]);

	const handlePlayAlbum = () => {
		if (!currentAlbum) return;

		if (isPlayed) togglePlay();
		else {
			playAlbum(currentAlbum.songs, 0);
			setPlayedAlbum(currentAlbum._id);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;

		playAlbum(currentAlbum.songs, index);
		setPlayedAlbum(currentAlbum._id);
	};

	if (isLoading) return null;
	return (
		<div className="relative h-full">
			{/* BACKGROUND */}
			<div
				className="absolute inset-0 bg-white bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none rounded-t-md"
				aria-hidden="true"
			/>
			<div className="h-full relative z-10 flex flex-col justify-between">
				{/* ALBUM INFO */}
				<div className="p-6 h-[37.5%] flex gap-6">
					<div className="relative">
						<img
							src={currentAlbum?.imageUrl}
							alt={currentAlbum?.title}
							className="h-full shadow-xl rounded"
						/>
						{/* PLAY BUTTON */}
						{currentAlbum && currentAlbum.songs.length > 0 && (
							<div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 flex items-center">
								<Button
									onClick={handlePlayAlbum}
									size="icon"
									className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all text-white"
								>
									{isPlayed && isPlaying ? (
										<Pause className="fill-white" />
									) : (
										<Play className="fill-white" />
									)}
								</Button>
							</div>
						)}
					</div>

					<div className="flex flex-col justify-end">
						<h1 className="text-6xl font-header my-4">
							{currentAlbum?.title}
						</h1>
						<div className="flex items-center gap-2 font-content text-zinc-100 truncate">
							<span className="font-medium text-white">
								{currentAlbum?.artist}
							</span>
							<span>• {currentAlbum?.songs.length} songs</span>
							<span>• {currentAlbum?.releaseYear}</span>
						</div>
					</div>
				</div>
				{/* TABLE SECTION */}
				<div className="bg-black/20 backdrop-blur-sm h-[56.4%] flex flex-col">
					{/* TABLE HEADER */}
					<div className="grid grid-cols-[28px_4fr_2fr_1fr] gap-5 px-8 py-4 text-sm text-zinc-400 border-b border-white/5 items-center font-title">
						<div>#</div>
						<div>Title</div>
						<div>Released Date</div>
						<div>
							<Clock className="size-4 mx-auto" />
						</div>
					</div>
					{/* TABLE CONTENT */}
					<div className="font-content overflow-auto scrollbar-hidden">
						{currentAlbum?.songs.map((song, index) => {
							const isCurrentSong = song._id === currentSong?._id;

							return (
								<div
									key={song._id}
									onClick={() => handlePlaySong(index)}
									className={`grid grid-cols-[28px_4fr_2fr_1fr] gap-5 px-8 py-4 text-sm text-zinc-400 hover:bg-white/5 group cursor-pointer ${
										currentAlbum &&
										playedAlbumId === currentAlbum._id &&
										isCurrentSong &&
										"bg-white/5"
									}`}
								>
									{/* ORDINAL */}
									<div className="flex items-center">
										{isPlayed && isCurrentSong ? (
											<Disc3
												className={`size-4 ${
													isPlaying &&
													"text-green-500 animate-spin"
												}`}
											/>
										) : (
											<span className="group-hover:hidden">
												{index + 1}
											</span>
										)}
										{(!isPlayed || !isCurrentSong) && (
											<Play className="size-4 hidden group-hover:block" />
										)}
									</div>
									{/* SONG INFO */}
									<div className="flex items-center gap-3">
										<img
											src={song.imageUrl}
											alt={song.title}
											className="size-10 rounded-sm"
										/>

										<div>
											<div className="font-medium text-white">
												{song.title}
											</div>
											<div>{song.artist}</div>
										</div>
									</div>
									{/* RELEASED DATE */}
									<div className="flex items-center">
										{song.createdAt.split("T")[0]}
									</div>
									{/* DURATION */}
									<div className="mx-auto flex items-center">
										{formatDuration(song.duration)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumPage;
