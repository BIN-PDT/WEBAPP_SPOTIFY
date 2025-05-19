import type { Song } from "@/types";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import EmptyContent from "@/components/EmptyContent";
import OtherGridSkeleton from "@/components/skeletons/OtherGridSkeleton";
import { usePlayerStore } from "@/stores/usePlayerStore";

type OtherSectionProps = {
	title: string;
	isLoading: boolean;
	songs: Song[];
};

const OtherSection = ({ title, isLoading, songs }: OtherSectionProps) => {
	const { playSong, playAlbum } = usePlayerStore();

	if (isLoading) return <OtherGridSkeleton />;
	return (
		<div className="mb-8">
			{/* HEADER */}
			<div className="flex items-center justify-between mb-4 font-title">
				<h2 className="text-lg sm:text-xl font-bold">{title}</h2>
				<Button
					onClick={() => playAlbum(songs)}
					variant="ghost"
					className="text-sm text-zinc-400 hover:text-white"
				>
					Play All
				</Button>
			</div>
			{/* CONTENT */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{songs.length === 0 ? (
					<EmptyContent />
				) : (
					songs.map((song) => (
						<div
							key={song._id}
							onClick={() => playSong(song)}
							className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer relative"
						>
							<div className="mb-4">
								<div className="aspect-square rounded-md shadow-lg overflow-hidden">
									<img
										src={song.imageUrl}
										alt={song.title}
										className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
									/>
								</div>
							</div>
							<div className="font-content">
								<h3 className="font-medium mb-1 truncate">
									{song.title}
								</h3>
								<p className="text-sm text-zinc-400 truncate">
									{song.artist}
								</p>
							</div>

							<PlayButton song={song} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default OtherSection;
