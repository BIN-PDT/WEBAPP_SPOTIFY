import type { Song } from "@/types";
import { PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import OtherGridSkeleton from "@/components/skeletons/OtherGridSkeleton";

type OtherSectionProps = {
	title: string;
	isLoading: boolean;
	songs: Song[];
};

const OtherSection = ({ title, isLoading, songs }: OtherSectionProps) => {
	if (isLoading) return <OtherGridSkeleton />;
	return (
		<div className="mb-8">
			{/* HEADER */}
			<div className="flex items-center justify-between mb-4 font-title">
				<h2 className="text-lg sm:text-xl font-bold">{title}</h2>
				<Button
					variant="link"
					className="text-sm text-zinc-400 hover:text-white"
				>
					Show all
				</Button>
			</div>
			{/* CONTENT */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{songs.length === 0 ? (
					<div className="min-h-[80px] col-span-full flex items-center justify-center gap-4">
						<PlaneTakeoff />
						<span className="font-title text-zinc-400">
							See you later!
						</span>
					</div>
				) : (
					songs.map((song) => (
						<div
							key={song._id}
							className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
						>
							<div className="relative mb-4">
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
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default OtherSection;
