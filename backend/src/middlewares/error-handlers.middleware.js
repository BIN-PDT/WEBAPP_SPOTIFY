import APIResponse from "../common/APIResponse.js";

export function InternalServerErrorMiddleware(err, req, res, next) {
	console.log(err);
	return new APIResponse(500)
		.setMessage("Whoops! Something went wrong.")
		.send(res);
}
