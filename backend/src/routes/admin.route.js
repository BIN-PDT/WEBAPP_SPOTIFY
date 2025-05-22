import { Router } from "express";
import * as controller from "../controllers/admin.controller.js";
import {
	requireAdmin,
	requireAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuthenticated, requireAdmin);

router.get("/check", controller.checkAdmin);

router.post("/songs", controller.createSong);

router.patch("/songs/:id", controller.updateSong);

router.delete("/songs/:id", controller.deleteSong);

router.post("/albums", controller.createAlbum);

router.patch("/albums/:id", controller.updateAlbum);

router.delete("/albums/:id", controller.deleteAlbum);

export default router;
