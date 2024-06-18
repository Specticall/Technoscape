import { Router } from "express";
import { protect } from "../functions/auth/protect";
import { getStatistics } from "../functions/statistics/getStatistics";
import { createStatistics } from "../functions/statistics/createStatistics";

const router = Router();

// router.post("/", protect, createStatistics);
// router.get("/", protect, getStatistics);

export default router;
