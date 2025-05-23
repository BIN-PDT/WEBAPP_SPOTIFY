import fs from "fs";
import APIResponse from "../common/APIResponse.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import {
	removeOfCloudinary,
	uploadToCloudinary,
} from "../utils/cloudinary.util.js";

export const checkAdmin = (req, res) => {
	return new APIResponse(200).setData({ admin: true }).send(res);
};

export const createSong = async (req, res, next) => {
	const {
		files: { audioFile, imageFile },
		body: { title, artist, albumId = null, duration },
	} = req;

	if (!audioFile || !imageFile) {
		return new APIResponse(400)
			.setMessage("Please upload all required files.")
			.send(res);
	}

	try {
		// UPLOAD FILES TO MEIDA SERVER.
		const [audioPid, audioUrl] = await uploadToCloudinary(audioFile);
		const [imagePid, imageUrl] = await uploadToCloudinary(imageFile);
		// CREATE NEW SONG.
		const newSong = new Song({
			title,
			artist,
			albumId,
			duration,
			audioPid,
			audioUrl,
			imagePid,
			imageUrl,
		});
		await newSong.save();
		// UPDATE ALBUM.
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: newSong._id },
			});
		}

		return new APIResponse(201).setData({ song: newSong }).send(res);
	} catch (error) {
		next(error);
	} finally {
		fs.unlink(imageFile.tempFilePath, (error) => {
			if (error) console.log(error);
		});
		fs.unlink(audioFile.tempFilePath, (error) => {
			if (error) console.log(error);
		});
	}
};

export const updateSong = async (req, res, next) => {
	const {
		params: { id },
		body: data = {},
		files,
	} = req;
	const imageFile = files?.imageFile;
	const audioFile = files?.audioFile;

	try {
		const existSong = await Song.findById(id);
		if (!existSong) {
			return new APIResponse(404)
				.setMessage("Album not found.")
				.send(res);
		}
		// UPDATE MEDIA FILES.
		if (imageFile) {
			await removeOfCloudinary(existSong.imagePid, "image");
			const [imagePid, imageUrl] = await uploadToCloudinary(imageFile);
			data.imagePid = imagePid;
			data.imageUrl = imageUrl;
		}
		if (audioFile) {
			await removeOfCloudinary(existSong.audioPid, "video");
			const [audioPid, audioUrl] = await uploadToCloudinary(audioFile);
			data.audioPid = audioPid;
			data.audioUrl = audioUrl;
		}
		// UPDATE ALBUM OF SONG.
		if (data.albumId) {
			data.albumId = data.albumId === "none" ? null : data.albumId;

			await Album.findByIdAndUpdate(existSong.albumId, {
				$pull: { songs: id },
			});
			if (data.albumId !== null) {
				await Album.findByIdAndUpdate(data.albumId, {
					$push: { songs: id },
				});
			}
		}
		// UPDATE SONG.
		const updateSong = await Song.findByIdAndUpdate(id, data, {
			new: true,
		});

		return new APIResponse(200).setData({ song: updateSong }).send(res);
	} catch (error) {
		next(error);
	} finally {
		if (imageFile) {
			fs.unlink(imageFile.tempFilePath, (error) => {
				if (error) console.log(error);
			});
		}
		if (audioFile) {
			fs.unlink(audioFile.tempFilePath, (error) => {
				if (error) console.log(error);
			});
		}
	}
};

export const deleteSong = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	try {
		const existSong = await Song.findById(id);
		if (!existSong) {
			return new APIResponse(404).setMessage("Song not found.").send(res);
		}
		// DELETE MEDIA FILES.
		await removeOfCloudinary(existSong.audioPid, "video");
		await removeOfCloudinary(existSong.imagePid, "image");
		// UPDATE ALBUM OF SONG.
		if (existSong.albumId) {
			await Album.findOneAndUpdate(existSong.albumId, {
				$pull: { songs: existSong._id },
			});
		}
		// DELETE SONG.
		await existSong.deleteOne();

		return new APIResponse(204)
			.setMessage("Deleted song successfully.")
			.send(res);
	} catch (error) {
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	const {
		files: { imageFile },
		body: { title, artist, releaseYear },
	} = req;

	if (!imageFile) {
		return new APIResponse(400)
			.setMessage("Please upload all required files.")
			.send(res);
	}

	try {
		// UPLOAD FILES TO MEIDA SERVER.
		const [imagePid, imageUrl] = await uploadToCloudinary(imageFile);
		// CREATE NEW ALBUM.
		const newAlbum = new Album({
			title,
			artist,
			releaseYear,
			imagePid,
			imageUrl,
		});
		await newAlbum.save();

		return new APIResponse(201).setData({ album: newAlbum }).send(res);
	} catch (error) {
		next(error);
	} finally {
		fs.unlink(imageFile.tempFilePath, (error) => {
			if (error) console.log(error);
		});
	}
};

export const updateAlbum = async (req, res, next) => {
	const {
		params: { id },
		body: data = {},
		files,
	} = req;
	const imageFile = files?.imageFile;

	try {
		const existAlbum = await Album.findById(id);
		if (!existAlbum) {
			return new APIResponse(404)
				.setMessage("Album not found.")
				.send(res);
		}
		// UPDATE MEDIA FILES.
		if (imageFile) {
			await removeOfCloudinary(existAlbum.imagePid, "image");
			const [imagePid, imageUrl] = await uploadToCloudinary(imageFile);
			data.imagePid = imagePid;
			data.imageUrl = imageUrl;
		}
		// UPDATE ALBUM.
		const updatedAlbum = await Album.findByIdAndUpdate(id, data, {
			new: true,
		});

		return new APIResponse(200).setData({ album: updatedAlbum }).send(res);
	} catch (error) {
		next(error);
	} finally {
		if (imageFile) {
			fs.unlink(imageFile.tempFilePath, (error) => {
				if (error) console.log(error);
			});
		}
	}
};

export const deleteAlbum = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	try {
		const existAlbum = await Album.findById(id);
		if (!existAlbum) {
			return new APIResponse(404)
				.setMessage("Album not found.")
				.send(res);
		}
		// DELETE MEDIA FILES.
		await removeOfCloudinary(existAlbum.imagePid, "image");
		// UPDATE SONGS OF ALBUM.
		await Song.updateMany({ albumId: existAlbum._id }, { albumId: null });
		// DELETE ALBUM.
		await existAlbum.deleteOne();

		return new APIResponse(204)
			.setMessage("Deleted album successfully.")
			.send(res);
	} catch (error) {
		next(error);
	}
};
