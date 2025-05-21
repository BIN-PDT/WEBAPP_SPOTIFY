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
		// UPDATE ALBUM (OPTIONAL).
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

export const deleteSong = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	try {
		const existSong = await Song.findById(id);
		if (!existSong) {
			return new APIResponse(404).setMessage("Song not found.").send(res);
		}
		// UPDATE ALBUM (OPTIONAL).
		if (existSong.albumId) {
			await Album.findOneAndUpdate(existSong.albumId, {
				$pull: { songs: existSong._id },
			});
		}
		// DELETE MEDIA FILES.
		await removeOfCloudinary(existSong.audioPid, "video");
		await removeOfCloudinary(existSong.imagePid, "image");
		// DELETE SONG.
		await existSong.deleteOne();

		return new APIResponse(200)
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
		// DELETE SONGS OF ALBUM.
		await Song.updateMany({ albumId: existAlbum._id }, { albumId: null });
		// DELETE ALBUM.
		await existAlbum.deleteOne();

		return new APIResponse(200)
			.setMessage("Deleted album successfully.")
			.send(res);
	} catch (error) {
		next(error);
	}
};
