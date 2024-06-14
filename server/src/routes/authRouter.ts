import { Router } from "express";
import { login } from "../functions/auth/login";
import { register } from "../functions/auth/register";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
