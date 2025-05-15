import cors from "cors";
import settings from "./settings.config.js";

export const frontendCORS = cors({
	origin: settings.FRONTEND_ORIGIN,
	credentials: true,
});
