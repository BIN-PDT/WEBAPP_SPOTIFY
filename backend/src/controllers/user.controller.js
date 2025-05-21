import APIResponse from "../common/APIResponse.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const listUsers = async (req, res, next) => {
	const {
		auth: { userId },
	} = req;

	try {
		const users = await User.find({ clerkId: { $ne: userId } });

		return new APIResponse(200).setData(users).send(res);
	} catch (error) {
		next(error);
	}
};

export const getMessages = async (req, res, next) => {
	const {
		auth: { userId },
		params: { id: targetUserId },
	} = req;

	try {
		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: targetUserId },
				{ senderId: targetUserId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		return new APIResponse(200).setData(messages).send(res);
	} catch (error) {
		next(error);
	}
};
