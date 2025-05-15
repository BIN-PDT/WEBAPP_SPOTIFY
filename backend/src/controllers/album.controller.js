import APIResponse from "../common/APIResponse.js";
import { Album } from "../models/album.model.js";

export const listAlbums = async (req, res, next) => {
	try {
		const albums = await Album.find();

		return new APIResponse(200).setData(albums).send(res);
	} catch (error) {
		next(error);
	}
};

export const retrieveAlbum = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	try {
		const album = await Album.findById(id).populate("songs");
		if (!album) {
			return new APIResponse(404)
				.setMessage("Album not found.")
				.send(res);
		}

		return new APIResponse(200).setData(album).send(res);
	} catch (error) {
		next(error);
	}
};
