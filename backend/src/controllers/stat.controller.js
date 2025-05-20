import APIResponse from "../common/APIResponse.js";
import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
	try {
		const [totalUsers, totalSongs, totalAlbums, uniqueArtists] =
			await Promise.all([
				User.countDocuments(),
				Song.countDocuments(),
				Album.countDocuments(),
				Song.aggregate([
					{
						$unionWith: {
							coll: "albums",
							pipeline: [],
						},
					},
					{
						$group: {
							_id: "$artist",
						},
					},
					{
						$count: "count",
					},
				]),
			]);

		return new APIResponse(200)
			.setData({
				totalUsers,
				totalSongs,
				totalAlbums,
				totalArtists: uniqueArtists[0]?.count || 0,
			})
			.send(res);
	} catch (error) {
		next(error);
	}
};
