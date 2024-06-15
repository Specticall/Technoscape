import { Router } from "express";
import { createChat } from "../functions/chat/createChat";
import { protect } from "../functions/auth/protect";
import { getChat } from "../functions/chat/getChat";
import { updateChat } from "../functions/chat/updateChat";

const router = Router();

router.post("/", protect, createChat);
router.get("/", protect, getChat);
router.put("/regenerate", protect, updateChat);

export default router;
