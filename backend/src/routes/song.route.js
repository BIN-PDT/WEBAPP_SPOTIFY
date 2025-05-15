import { Router } from "express";
import * as controller from "../controllers/song.controller.js";
import {
	requireAdmin,
	requireAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuthenticated, requireAdmin, controller.listSongs);

router.get("/featured", controller.getFeaturedSongs);

router.get("/personal", controller.getPersonalSongs);

router.get("/trending", controller.getTrendingSongs);

export default router;
