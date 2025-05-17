import { useEffect } from "react";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import OtherSection from "./components/OtherGridSection";
import FeaturedSection from "./components/FeaturedGridSection";
import { useMusicStore } from "@/stores/useMusicStore";
import { getGreeting } from "@/utils";

const HomePage = () => {
	const {
		isLoading,
		personalSongs,
		trendingSongs,
		fetchFeaturedSongs,
		fetchPersonalSongs,
		fetchTrendingSongs,
	} = useMusicStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchPersonalSongs();
		fetchTrendingSongs();
	}, []);

	return (
		<main className="h-full rounded-t-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
			<Topbar />
			<ScrollArea className="h-[calc(100vh-180px)]">
				<div className="p-4 sm:p-6">
					<h1 className="text-2xl sm:text-3xl font-header mb-6">
						{getGreeting()}
					</h1>
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
