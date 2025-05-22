import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyContent from "@/components/EmptyContent";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const LeftSidebar = () => {
	const { user } = useUser();
	const { isLoading, albums, fetchAlbums } = useMusicStore();
	const { playedAlbumId } = usePlayerStore();

	useEffect(() => {
		const abortController = new AbortController();

		fetchAlbums(abortController.signal);

		return () => abortController.abort();
	}, []);

	return (
		<div className="h-full flex flex-col gap-2">
			{/* NAVIGATION MENU */}
			<div className="rounded-lg bg-zinc-900 p-4">
				<div className="flex md:flex-col items-center justify-center md:justify-start gap-2">
					<Link
						to={"/"}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className:
									"w-fit md:w-full justify-start text-white hover:bg-zinc-800",
							})
						)}
					>
						<HomeIcon className="!size-5" />
						<span className="hidden md:inline ml-2 font-title">
							Home
						</span>
					</Link>

					<SignedIn>
						<Link
							to={"/chat"}
							className={cn(
								buttonVariants({
									variant: "ghost",
									className:
										"w-fit md:w-full justify-start text-white hover:bg-zinc-800",
								})
							)}
						>
							<MessageCircle className="!size-5" />
							<span className="hidden md:inline ml-2 font-title">
								Messages
							</span>
						</Link>
					</SignedIn>
				</div>
			</div>
			{/* LIBRARY SECTION */}
			<div className="flex-1 rounded-lg bg-zinc-900">
				<div className="p-4 border-b border-zinc-800">
					<div className="flex items-center justify-center text-white px-2">
						<Library className="!size-5" />
						<span className="hidden md:inline ml-2 font-title">
							Playlists
						</span>
					</div>
				</div>

				{isLoading ? (
					<PlaylistSkeleton />
				) : albums.length === 0 ? (
					<EmptyContent />
				) : (
					<ScrollArea
						className={`h-[calc(100vh-270px)] px-4 my-4 ${
							user
								? "md:h-[calc(100vh-320px)]"
								: "md:h-[calc(100vh-270px)]"
						}`}
					>
						<div className="space-y-2">
							{albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className={`p-2 hover:bg-zinc-800 rounded-md flex items-start gap-4 group cursor-pointer ${
										playedAlbumId === album._id &&
										"bg-zinc-800"
									}`}
								>
									<img
										src={album.imageUrl}
										alt="Playlist img"
										className="size-full md:size-12 rounded-md flex-shrink-0 object-cover"
									/>

									<div className="flex-1 min-w-0 hidden md:block font-content">
										<p className="font-medium truncate">
											{album.title}
										</p>
										<p className="text-sm text-zinc-400 truncate">
											Album • {album.artist}
										</p>
									</div>
								</Link>
							))}
						</div>
					</ScrollArea>
				)}
			</div>
		</div>
	);
};

export default LeftSidebar;
