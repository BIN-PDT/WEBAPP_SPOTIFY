import { Router } from "express";
import { InternalServerErrorMiddleware } from "../middlewares/error-handlers.middleware.js";
import authRouter from "./auth.route.js";
import adminRouter from "./admin.route.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/admin", adminRouter);

router.use(InternalServerErrorMiddleware);

export default router;
