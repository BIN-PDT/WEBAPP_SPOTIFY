import type { Song } from "@/types";
import { Disc3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";

type PlayButtonProps = { song: Song };

const PlayButton = ({ song }: PlayButtonProps) => {
	const { isPlaying, currentSong } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	return (
		<Button
			size={"icon"}
			variant={"ghost"}
			className={`absolute right-0.5 bottom-0.5 hover:bg-transparent transition-all opacity-0 ${
				isCurrentSong
					? "opacity-100"
					: "opacity-0 group-hover:opacity-100"
			}`}
		>
			{isCurrentSong ? (
				<Disc3
					className={`!size-5 ${
						isPlaying && "text-green-500 animate-spin"
					}`}
				/>
			) : (
				<Play />
			)}
		</Button>
	);
};

export default PlayButton;
