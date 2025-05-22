import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useMusicStore } from "@/stores/useMusicStore";
import { handleAPIError, toastError, toastSuccess } from "@/utils";

interface AlbumInfo {
	title: string;
	artist: string;
	releaseYear: string;
}

interface AlbumFile {
	image: File | null;
}

const AddAlbumDialog = () => {
	const { createAlbum } = useMusicStore();
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

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		setFile({ image: file || null });
		imageSrcRef.current = file ? URL.createObjectURL(file) : "";
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!file.image) {
				toastError("Require an image file.");
				return;
			}

			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("artist", data.artist);
			formData.append("releaseYear", data.releaseYear);
			formData.append("imageFile", file.image);

			await createAlbum(formData);

			setData({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear().toString(),
			});
			setFile({ image: null });

			toastSuccess("Added album successfully.");
		} catch (error: any) {
			handleAPIError(error);
			toastError("Added album unsuccessfully.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={setIsOpened}>
			<DialogTrigger asChild>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-title">
					<Plus className="size-4" />
					Add Album
				</Button>
			</DialogTrigger>

			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="font-header">
						Add New Album
					</DialogTitle>
					<DialogDescription className="font-content italic">
						Add a new album to your album collection
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
										className="size-24 rounded-md"
									/>
									<p className="mt-2 text-white text-sm font-title translate-y-1/2">
										{file.image.name}
									</p>
								</>
							) : (
								<>
									<div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
										<Upload className="size-6 text-zinc-400" />
									</div>
									<div className="text-sm text-zinc-400 mb-2 font-title">
										Upload artwork
									</div>
									<Button
										variant="outline"
										size="sm"
										className="text-xs font-title"
									>
										Choose File
									</Button>
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
						disabled={isLoading}
					>
						{isLoading ? "Uploading..." : "Add Album"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddAlbumDialog;
