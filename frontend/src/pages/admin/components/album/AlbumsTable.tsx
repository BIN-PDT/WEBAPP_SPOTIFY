import { Calendar, Edit, ListMusic, MicVocal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import EditAlbumDialog from "./EditAlbumDialog";
import { useMusicStore } from "@/stores/useMusicStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

const AlbumsTable = () => {
	const { albums, deleteAlbum } = useMusicStore();
	const { setSelectedAlbum } = useDashboardStore();

	return (
		<Table>
			<TableHeader>
				<TableRow className="h-12 hover:bg-transparent font-title">
					<TableHead className="w-[72px]"></TableHead>
					<TableHead>Title</TableHead>
					<TableHead>
						<div className="flex items-center gap-2">
							<MicVocal className="size-4" />
							Artist
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-2">
							<Calendar className="size-4" />
							Release Year
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-2">
							<ListMusic className="size-4" />
							Songs
						</div>
					</TableHead>
					<TableHead className="text-right pr-[16px]">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{albums.map((album) => (
					<TableRow
						key={album._id}
						className="h-20 hover:bg-zinc-800/50 font-content"
					>
						<TableCell>
							<img
								src={album.imageUrl}
								alt={album.title}
								className="ml-auto size-12 rounded object-cover"
							/>
						</TableCell>
						<TableCell className="font-medium">
							{album.title}
						</TableCell>
						<TableCell>{album.artist}</TableCell>
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								{album.releaseYear}
							</span>
						</TableCell>
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								{album.songs.length} song
								{album.songs.length >= 2 && "s"}
							</span>
						</TableCell>

						<TableCell className="text-right pr-[16px]">
							<div className="flex gap-2 justify-end">
								<Button
									variant={"ghost"}
									size={"icon"}
									className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
									onClick={() => setSelectedAlbum(album)}
								>
									<Edit className="size-4" />
								</Button>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
									onClick={() => deleteAlbum(album._id)}
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>

			<EditAlbumDialog />
		</Table>
	);
};

export default AlbumsTable;
