import APIResponse from "../common/APIResponse.js";
import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	const {
		body: { id, firstName, lastName, imageUrl },
	} = req;

	try {
		const existUser = await User.findOne({ clerkId: id });
		if (!existUser) {
			await User.create({
				fullName: `${firstName} ${lastName}`,
				imageUrl: imageUrl,
				clerkId: id,
			});
		}

		return new APIResponse(200).send(res);
	} catch (error) {
		next(error);
	}
};
