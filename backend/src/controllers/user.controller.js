import APIResponse from "../common/APIResponse.js";
import { User } from "../models/user.model.js";

export const listUsers = async (req, res, next) => {
	const {
		auth: { userId },
	} = req;

	try {
		const users = await User.find({ clerkId: { $ne: { userId } } });

		return new APIResponse(200).setData(users).send(res);
	} catch (error) {
		next(error);
	}
};
