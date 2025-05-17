import { PlaneTakeoff } from "lucide-react";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";

const FeaturedSection = () => {
	const { isLoading, featuredSongs } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			{featuredSongs.length === 0 ? (
				<div className="min-h-[80px] col-span-full flex items-center justify-center gap-4">
					<PlaneTakeoff />
					<span className="font-title text-zinc-400">
						See you later!
					</span>
				</div>
			) : (
				featuredSongs.map((song) => (
					<div
						key={song._id}
						className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
					>
						<img
							src={song.imageUrl}
							alt={song.title}
							className="size-16 sm:size-20 object-cover flex-shrink-0"
						/>
						<div className="flex-1 p-4 font-content">
							<p className="font-medium truncate">{song.title}</p>
							<p className="text-sm text-zinc-400 truncate">
								{song.artist}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default FeaturedSection;
