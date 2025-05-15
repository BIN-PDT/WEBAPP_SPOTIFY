import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { requireAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuthenticated, controller.listUsers);

export default router;
