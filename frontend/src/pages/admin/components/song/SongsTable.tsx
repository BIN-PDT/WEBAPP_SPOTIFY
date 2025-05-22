import { Calendar, Edit, Library, MicVocal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import EditSongDialog from "./EditSongDialog";
import { useMusicStore } from "@/stores/useMusicStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

const SongsTable = () => {
	const { songs, albums, deleteSong } = useMusicStore();
	const { setSelectedSong } = useDashboardStore();

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
							Release Date
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-2">
							<Library className="size-4" />
							Album
						</div>
					</TableHead>
					<TableHead className="text-right pr-[16px]">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{songs.map((song) => (
					<TableRow
						key={song._id}
						className="h-20 hover:bg-zinc-800/50 font-content"
					>
						<TableCell>
							<img
								src={song.imageUrl}
								alt={song.title}
								className="ml-auto size-12 rounded object-cover"
							/>
						</TableCell>
						<TableCell className="font-medium">
							{song.title}
						</TableCell>
						<TableCell>{song.artist}</TableCell>
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								{song.createdAt.split("T")[0]}
							</span>
						</TableCell>
						<TableCell>
							<span className="inline-flex items-center gap-1 text-zinc-400">
								{
									albums.find(
										(album) => album._id === song.albumId
									)?.title
								}
							</span>
						</TableCell>

						<TableCell className="text-right pr-[16px]">
							<div className="flex gap-2 justify-end">
								<Button
									variant={"ghost"}
									size={"icon"}
									className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
									onClick={() => setSelectedSong(song)}
								>
									<Edit className="size-4" />
								</Button>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
									onClick={() =>
										deleteSong(song._id, song.albumId)
									}
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>

			<EditSongDialog />
		</Table>
	);
};

export default SongsTable;
