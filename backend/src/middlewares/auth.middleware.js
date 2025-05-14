import { clerkClient } from "@clerk/express";
import APIResponse from "../common/APIResponse.js";
import settings from "../configs/settings.config.js";

export async function requireAuthenticated(req, res, next) {
	const { auth } = req;

	if (!auth.userId) {
		return new APIResponse(401)
			.setMessage("Unauthorized - Require logged in.")
			.send(res);
	}
	next();
}

export async function requireAdmin(req, res, next) {
	const { auth } = req;

	try {
		const currentUser = await clerkClient.users.getUser(auth.userId);
		const isAdmin =
			currentUser.primaryEmailAddress?.emailAddress ===
			settings.ADMIN_EMAIL;

		if (!isAdmin) {
			return new APIResponse(403)
				.setMessage("Unauthorized - Require admin role.")
				.send(res);
		}
		next();
	} catch (error) {
		next(error);
	}
}
