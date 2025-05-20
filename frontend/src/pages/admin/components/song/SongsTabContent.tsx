import { ListMusic } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const SongsTabContent = () => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2 font-title font-normal">
							<ListMusic className="size-5 text-emerald-500" />
							Song Collection
						</CardTitle>
						<CardDescription className="font-content italic">
							Manage your song collection
						</CardDescription>
					</div>
					<AddSongDialog />
				</div>
			</CardHeader>

			<CardContent>
				<SongsTable />
			</CardContent>
		</Card>
	);
};

export default SongsTabContent;
