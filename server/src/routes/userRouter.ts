import { Router } from "express";
import { getUser } from "../functions/user/getUser";

const router = Router();

router.get("/", getUser);

export default router;
