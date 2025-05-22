import type { AlbumFile, AlbumInfo } from "@/types";
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
import { useMusicStore } from "@/stores/useMusicStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { handleAPIError, toastError, toastSuccess } from "@/utils";

const EditAlbumDialog = () => {
	const { updateAlbum } = useMusicStore();
	const { selectedAlbum, setSelectedAlbum } = useDashboardStore();
	const [isOpened, setIsOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const imageSrcRef = useRef<string>("");

	const [data, setData] = useState<AlbumInfo>({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear().toString(),
	});
	const [file, setFile] = useState<AlbumFile>({ image: null });

	useEffect(() => {
		if (selectedAlbum) {
			setIsOpened(true);
			setData({
				title: selectedAlbum.title,
				artist: selectedAlbum.artist,
				releaseYear: selectedAlbum.releaseYear.toString(),
			});
		} else {
			setData({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear().toString(),
			});
			setFile({ image: null });
		}
	}, [selectedAlbum]);

	useEffect(() => {
		if (!isOpened) setSelectedAlbum(null);
	}, [isOpened]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		setFile({ image: file || null });
		imageSrcRef.current = file ? URL.createObjectURL(file) : "";
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
		if (!data.releaseYear) {
			toastError("Release Year is required.");
			return false;
		}
		return true;
	};

	const handleSubmit = async () => {
		if (!selectedAlbum) return;

		setIsLoading(true);
		try {
			if (!validateData()) return;

			const formData = new FormData();
			if (data.title !== selectedAlbum.title)
				formData.append("title", data.title);
			if (data.artist !== selectedAlbum.artist)
				formData.append("artist", data.artist);
			if (data.releaseYear !== selectedAlbum.releaseYear.toString())
				formData.append("releaseYear", data.releaseYear);
			if (file.image) formData.append("imageFile", file.image);

			await updateAlbum(selectedAlbum._id, formData);

			toastSuccess("Updated album successfully.");
			setIsOpened(false);
		} catch (error: any) {
			handleAPIError(error);
			toastError("Updated album unsuccessfully.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={setIsOpened}>
			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="font-header">
						Edit Album
					</DialogTitle>
					<DialogDescription className="font-content italic">
						Edit your album
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
					{/* IMAGE UPLOAD AREA */}
					<div
						className="min-h-44 flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
						onClick={() => imageInputRef.current?.click()}
					>
						<div className="text-center">
							{file.image ? (
								<>
									<img
										title={file.image.name}
										src={imageSrcRef.current}
										className="size-24 rounded-md mx-auto"
									/>
									<p className="mt-2 text-white text-sm font-title translate-y-1/2">
										{file.image.name}
									</p>
								</>
							) : (
								<>
									{selectedAlbum && (
										<img
											title={selectedAlbum.imageUrl}
											src={selectedAlbum.imageUrl}
											className="size-24 rounded-md"
										/>
									)}
								</>
							)}
						</div>
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
					{/* RELEASE YEAR FIELD */}
					<div className="space-y-2">
						<label className="font-title">Release Year</label>
						<Input
							type="number"
							min="0"
							value={data.releaseYear}
							onChange={(e) =>
								setData({
									...data,
									releaseYear: e.target.value,
								})
							}
							className="bg-zinc-800 border-zinc-700 font-content"
						/>
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
							selectedAlbum === null ||
							(data.title.trim() === selectedAlbum.title &&
								data.artist.trim() === selectedAlbum.artist &&
								data.releaseYear.trim() ===
									selectedAlbum.releaseYear.toString() &&
								file.image === null)
						}
					>
						{isLoading ? "Uploading..." : "Edit Album"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditAlbumDialog;
