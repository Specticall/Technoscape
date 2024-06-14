import { Router } from "express";
import { login } from "../functions/auth/login";
import { register } from "../functions/auth/register";
import { protect } from "../functions/auth/protect";

const router = Router();

router.post("/login", protect, login);
router.post("/register", protect, register);

export default router;
