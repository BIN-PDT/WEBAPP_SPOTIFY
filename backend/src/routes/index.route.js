import { Router } from "express";
import { InternalServerErrorMiddleware } from "../middlewares/error-handlers.middleware.js";
import authRouter from "./auth.route.js";
import adminRouter from "./admin.route.js";
import userRouter from "./user.route.js";
import songRouter from "./song.route.js";
import albumRouter from "./album.route.js";
import statRouter from "./stat.route.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/admin", adminRouter);

router.use("/users", userRouter);

router.use("/songs", songRouter);

router.use("/albums", albumRouter);

router.use("/stats", statRouter);

router.use(InternalServerErrorMiddleware);

export default router;
