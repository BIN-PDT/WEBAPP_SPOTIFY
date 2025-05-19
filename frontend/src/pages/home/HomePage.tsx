import { useEffect } from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Greeting from "./components/Greeting";
import OtherSection from "./components/OtherGridSection";
import FeaturedSection from "./components/FeaturedGridSection";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
	const {
		isLoading,
		featuredSongs,
		personalSongs,
		trendingSongs,
		fetchFeaturedSongs,
		fetchPersonalSongs,
		fetchTrendingSongs,
	} = useMusicStore();
	const { initializeQueue } = usePlayerStore();

	useEffect(() => {
		const abortController = new AbortController();

		fetchFeaturedSongs(abortController.signal);
		fetchPersonalSongs(abortController.signal);
		fetchTrendingSongs(abortController.signal);

		return () => abortController.abort();
	}, []);

	useEffect(() => {
		if (featuredSongs.length > 0) initializeQueue(featuredSongs);
	}, [featuredSongs]);

	return (
		<main className="h-full rounded-t-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<div className="p-4 sm:p-6">
					<Greeting />
					<FeaturedSection />

					<div className="space-y-8">
						<OtherSection
							title="Personal"
							isLoading={isLoading}
							songs={personalSongs}
						/>
						<OtherSection
							title="Trending"
							isLoading={isLoading}
							songs={trendingSongs}
						/>
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;
