import { Library, ListMusic } from "lucide-react";
import { useEffect } from "react";
import Header from "./components/Header";
import AdminLoader from "./components/AdminLoader";
import Unauthorized from "./components/Unauthorized";
import DashboardStats from "./components/DashboardStats";
import SongsTabContent from "./components/song/SongsTabContent";
import AlbumsTabContent from "./components/album/AlbumsTabContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
	const { isLoading, isAdmin } = useAuthStore();
	const { songs, albums, fetchSongs, fetchAlbums, fetchStats } =
		useMusicStore();

	useEffect(() => {
		const abortController = new AbortController();

		fetchSongs(abortController.signal);
		fetchAlbums(abortController.signal);

		return () => abortController.abort();
	}, []);

	useEffect(() => {
		const abortController = new AbortController();

		fetchStats(abortController.signal);

		return () => abortController.abort();
	}, [songs, albums]);

	if (isLoading) return <AdminLoader />;
	if (!isAdmin) return <Unauthorized />;
	return (
		<div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
			<Header />
			<DashboardStats />

			<Tabs defaultValue="songs" className="space-y-6">
				<TabsList className="p-1 bg-zinc-800/50 font-title">
					<TabsTrigger
						value="songs"
						className="data-[state=active]:bg-zinc-700"
					>
						<ListMusic className="mr-2 size-4" />
						Songs
					</TabsTrigger>
					<TabsTrigger
						value="albums"
						className="data-[state=active]:bg-zinc-700"
					>
						<Library className="mr-2 size-4" />
						Albums
					</TabsTrigger>
				</TabsList>

				<TabsContent value="songs">
					<SongsTabContent />
				</TabsContent>
				<TabsContent value="albums">
					<AlbumsTabContent />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AdminPage;
