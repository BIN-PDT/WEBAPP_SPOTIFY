import { Library } from "lucide-react";
import AlbumsTable from "./AlbumTable";
import AddAlbumDialog from "./AddAlbumDialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const AlbumsTabContent = () => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2 font-title font-normal">
							<Library className="size-5 text-violet-500" />
							Albums Library
						</CardTitle>
						<CardDescription className="font-content italic">
							Manage your album collection
						</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>

			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
	);
};

export default AlbumsTabContent;
