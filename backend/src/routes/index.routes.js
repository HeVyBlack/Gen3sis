import { Router } from "express";
import { renderIndex } from "../controllers/index.controller";

const router = Router();

router.get("/", renderIndex);

export default router;
