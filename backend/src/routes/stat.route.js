import { Router } from "express";
import { getStats } from "../controllers/stat.controller.js";
import {
	requireAdmin,
	requireAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuthenticated, requireAdmin, getStats);

export default router;
