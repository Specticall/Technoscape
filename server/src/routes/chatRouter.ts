import { Router } from "express";
import { createChat } from "../functions/chat/createChat";
import { protect } from "../functions/auth/protect";

const router = Router();

router.post("/", protect, createChat);

export default router;
