import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { requireAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuthenticated, controller.listUsers);

router.get("/messages/:id", requireAuthenticated, controller.getMessages);

export default router;
