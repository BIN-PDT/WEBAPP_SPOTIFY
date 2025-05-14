import { Router } from "express";
import { InternalServerErrorMiddleware } from "../middlewares/error-handlers.middleware.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/auth", authRouter);

router.use(InternalServerErrorMiddleware);

export default router;
