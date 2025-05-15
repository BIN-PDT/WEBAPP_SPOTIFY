import APIResponse from "../common/APIResponse.js";
import { Song } from "../models/song.model.js";

export const listSongs = async (req, res, next) => {
	try {
		const songs = await Song.find().sort({ createdAt: -1 });

		return new APIResponse(200).setData(songs).send(res);
	} catch (error) {
		next(error);
	}
};

export const getFeaturedSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 6 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		return new APIResponse(200).setData(songs).send(res);
	} catch (error) {
		next(error);
	}
};

export const getPersonalSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 4 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		return new APIResponse(200).setData(songs).send(res);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 4 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		return new APIResponse(200).setData(songs).send(res);
	} catch (error) {
		next(error);
	}
};
