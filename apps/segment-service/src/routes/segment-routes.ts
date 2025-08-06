import express from "express";
import { evaluateSegmentHandler } from "../controllers/segment-controller";

const router = express.Router();

router.post("/evaluate", evaluateSegmentHandler);

export default router;
