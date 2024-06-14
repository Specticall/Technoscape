import { Router } from "express";
import { getUser } from "../functions/user/getUser";
import { protect } from "../functions/auth/protect";

const router = Router();

router.get("/", protect, getUser);

export default router;
