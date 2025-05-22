import type { SongFiles, SongInfo } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/stores/useMusicStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { handleAPIError, toastError, toastSuccess } from "@/utils";

const EditSongDialog = () => {
	const { albums, updateSong } = useMusicStore();
	const { selectedSong, setSelectedSong } = useDashboardStore();
	const [isOpened, setIsOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const imageSrcRef = useRef<string>("");

	const [data, setData] = useState<SongInfo>({
		title: "",
		artist: "",
		album: "none",
		duration: "0",
	});
	const [files, setFiles] = useState<SongFiles>({ audio: null, image: null });

	useEffect(() => {
		if (selectedSong) {
			setIsOpened(true);
			setData({
				title: selectedSong.title,
				artist: selectedSong.artist,
				album: selectedSong.albumId || "none",
				duration: selectedSong.duration.toString(),
			});
		} else {
			setData({
				title: "",
				artist: "",
				album: "none",
				duration: "0",
			});
			setFiles({ audio: null, image: null });
		}
	}, [selectedSong]);

	useEffect(() => {
		if (!isOpened) setSelectedSong(null);
	}, [isOpened]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		setFiles({ ...files, image: file || null });
		imageSrcRef.current = file ? URL.createObjectURL(file) : "";
	};

	const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		if (file) {
			const audio = new Audio(URL.createObjectURL(file));
			audio.onloadedmetadata = function () {
				const duration = Math.ceil(audio.duration);
				setData({ ...data, duration: duration.toString() });
				setFiles({ ...files, audio: file });
			};
		} else {
			setData({ ...data, duration: "0" });
			setFiles({ ...files, audio: null });
		}
	};

	const validateData = () => {
		if (!data.title) {
			toastError("Title is required.");
			return false;
		}
		if (!data.artist) {
			toastError("Artist is required.");
			return false;
		}
		if (!data.duration) {
			toastError("Duration is required.");
			return false;
		}
		return true;
	};

	const handleSubmit = async () => {
		if (!selectedSong) return;

		setIsLoading(true);
		try {
			if (!validateData()) return;

			const formData = new FormData();
			if (data.title !== selectedSong.title)
				formData.append("title", data.title);
			if (data.artist !== selectedSong.artist)
				formData.append("artist", data.artist);
			if (data.duration !== selectedSong.duration.toString())
				formData.append("duration", data.duration);
			if (
				(data.album === "none" && selectedSong.albumId !== null) ||
				(data.album !== "none" && selectedSong.albumId === null)
			)
				formData.append("albumId", data.album);
			if (files.audio) formData.append("audioFile", files.audio);
			if (files.image) formData.append("imageFile", files.image);

			await updateSong(selectedSong._id, formData);

			toastSuccess("Updated song successfully.");
		} catch (error: any) {
			handleAPIError(error);
			toastError("Updated song unsuccessfully.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={setIsOpened}>
			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="font-header">Edit Song</DialogTitle>
					<DialogDescription className="font-content italic">
						Edit your song
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<input
						type="file"
						accept="image/*"
						hidden
						ref={imageInputRef}
						onChange={handleImageUpload}
					/>
					<input
						type="file"
						accept="audio/*"
						hidden
						ref={audioInputRef}
						onChange={handleAudioUpload}
					/>
					{/* IMAGE UPLOAD AREA */}
					<div
						className="min-h-44 flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
						onClick={() => imageInputRef.current?.click()}
					>
						<div className="text-center">
							{files.image ? (
								<>
									<img
										title={files.image.name}
										src={imageSrcRef.current}
										className="size-24 rounded-md"
									/>
									<p className="mt-2 text-white text-sm font-title translate-y-1/2">
										{files.image.name}
									</p>
								</>
							) : (
								<>
									{selectedSong && (
										<img
											title={selectedSong.imageUrl}
											src={selectedSong.imageUrl}
											className="size-24 rounded-md"
										/>
									)}
								</>
							)}
						</div>
					</div>
					{/* AUDIO UPLOAD AREA */}
					<div className="space-y-2">
						<label className="font-title">Audio File</label>
						<Button
							variant="outline"
							className="w-full text-sm font-title"
							onClick={() => audioInputRef.current?.click()}
						>
							{files.audio
								? files.audio.name.slice(0, 20)
								: "Choose Another File"}
						</Button>
					</div>
					{/* DURATION FIELD */}
					<div className="space-y-2">
						<label className="font-title">
							Duration{" "}
							<span className="text-sm font-content italic">
								(seconds)
							</span>
						</label>
						<Input
							readOnly
							value={data.duration}
							className="bg-zinc-800 border-zinc-700 font-content"
						/>
					</div>
					{/* TITLE FIELD */}
					<div className="space-y-2">
						<label className="font-title">Title</label>
						<Input
							value={data.title}
							onChange={(e) =>
								setData({ ...data, title: e.target.value })
							}
							className="bg-zinc-800 border-zinc-700 font-content"
						/>
					</div>
					{/* ARTIST FIELD */}
					<div className="space-y-2">
						<label className="font-title">Artist</label>
						<Input
							value={data.artist}
							onChange={(e) =>
								setData({ ...data, artist: e.target.value })
							}
							className="bg-zinc-800 border-zinc-700 font-content"
						/>
					</div>
					{/* ALBUM FIELD */}
					<div className="space-y-2">
						<label className="font-title">Album</label>
						<Select
							value={data.album}
							onValueChange={(value) =>
								setData({ ...data, album: value })
							}
						>
							<SelectTrigger className="bg-zinc-800 border-zinc-700 font-content">
								<SelectValue />
							</SelectTrigger>

							<SelectContent className="bg-zinc-800 border-zinc-700 font-content">
								<SelectItem value="none">
									No Album (Single)
								</SelectItem>
								{albums.map((album) => (
									<SelectItem
										key={album._id}
										value={album._id}
									>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter className="font-title">
					<Button
						variant="ghost"
						onClick={() => setIsOpened(false)}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="outline"
						className="bg-green-500 hover:bg-green-400"
						onClick={handleSubmit}
						disabled={
							isLoading ||
							selectedSong === null ||
							(data.title.trim() === selectedSong.title &&
								data.artist.trim() === selectedSong.artist &&
								((data.album === "none" &&
									selectedSong.albumId === null) ||
									data.album === selectedSong.albumId) &&
								files.audio === null &&
								files.image === null)
						}
					>
						{isLoading ? "Uploading..." : "Edit Song"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditSongDialog;
