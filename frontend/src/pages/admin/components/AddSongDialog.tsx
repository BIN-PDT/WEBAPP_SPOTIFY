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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/stores/useMusicStore";
import { axiosInstance } from "@/lib/axios";
import { toastError, toastSuccess } from "@/utils";

interface SongInfo {
	title: string;
	artist: string;
	album: string;
	duration: string;
}

interface SongFiles {
	audio: File | null;
	image: File | null;
}

const AddSongDialog = () => {
	const { albums } = useMusicStore();

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

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			if (!files.audio || !files.image) {
				toastError("Require both audio and image files.");
				return;
			}

			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("artist", data.artist);
			formData.append("duration", data.duration);
			if (data.album !== "none") {
				formData.append("albumId", data.album);
			}
			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance.post("/admin/songs", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			setData({ title: "", artist: "", album: "none", duration: "0" });
			setFiles({ audio: null, image: null });

			toastSuccess("Added song successfully.");
		} catch (error: any) {
			console.log(error);
			toastError("Added song unsuccessfully.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={setIsOpened}>
			<DialogTrigger asChild>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-title">
					<Plus className="size-4" />
					Add Song
				</Button>
			</DialogTrigger>

			<DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="font-header">
						Add New Song
					</DialogTitle>
					<DialogDescription className="font-content italic">
						Add a new song to your music library
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
								: "Choose File"}
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
						disabled={isLoading}
					>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AddSongDialog;
