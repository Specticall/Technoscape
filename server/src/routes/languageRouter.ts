import { Router } from "express";
import { protect } from "../functions/auth/protect";
import { getLanguage } from "../functions/language/getLanguage";

const router = Router();

router.get("/", protect, getLanguage);

export default router;
