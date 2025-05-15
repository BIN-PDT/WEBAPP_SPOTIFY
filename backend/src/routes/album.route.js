import { Router } from "express";
import * as controller from "../controllers/album.controller.js";

const router = Router();

router.get("/", controller.listAlbums);

router.get("/:id", controller.retrieveAlbum);

export default router;
