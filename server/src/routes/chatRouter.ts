import { Router } from "express";
import { createChat } from "../functions/chat/createChat";
import { protect } from "../functions/auth/protect";
import { getChat } from "../functions/chat/getChat";

const router = Router();

router.post("/", protect, createChat);
router.get("/", protect, getChat);

export default router;
