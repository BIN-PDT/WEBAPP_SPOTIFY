import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { formatDuration } from "@/utils";

const AlbumPage = () => {
	const { id } = useParams();
	const { isLoading, currentAlbum, fetchAlbumById } = useMusicStore();

	useEffect(() => {
		if (id) fetchAlbumById(id);
	}, []);

	if (isLoading) return null;
	return (
		<div className="relative h-full">
			{/* BACKGROUND */}
			<div
				className="absolute inset-0 bg-white bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none rounded-t-md"
				aria-hidden="true"
			/>
			<div className="h-full relative z-10 flex flex-col gap-6">
				{/* ALBUM INFO */}
				<div className="px-6 pt-6 h-[32.5%] flex gap-6">
					<img
						src={currentAlbum?.imageUrl}
						alt={currentAlbum?.title}
						className="h-full shadow-xl rounded"
					/>
					<div className="flex flex-col justify-end">
						<h1 className="text-6xl font-header my-4">
							{currentAlbum?.title}
						</h1>
						<div className="flex items-center gap-2 font-content text-zinc-100">
							<span className="font-medium text-white">
								{currentAlbum?.artist}
							</span>
							<span>• {currentAlbum?.songs.length} songs</span>
							<span>• {currentAlbum?.releaseYear}</span>
						</div>
					</div>
				</div>
				{/* PLAY BUTTON */}
				<div className="px-6 flex items-center">
					<Button
						size="icon"
						className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
					>
						<Play className="text-black" />
					</Button>
				</div>
				{/* TABLE SECTION */}
				<div className="bg-black/20 backdrop-blur-sm h-[52.5%] flex flex-col">
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
							return (
								<div
									key={song._id}
									className="grid grid-cols-[28px_4fr_2fr_1fr] gap-5 px-8 py-4 text-sm text-zinc-400 hover:bg-white/5 group cursor-pointer"
								>
									{/* ORDINAL */}
									<div className="flex items-center">
										<span className="group-hover:hidden">
											{index + 1}
										</span>
										<Play className="size-4 hidden group-hover:block" />
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
									{/* RELEASED YEAR */}
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
