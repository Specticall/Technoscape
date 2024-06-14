import { Router } from "express";
import { protect } from "../functions/auth/protect";
import { createCompany } from "../functions/company/createCompany";
import { getCompany } from "../functions/company/getCompany";

const router = Router();

router.post("/", protect, createCompany);
router.get("/", protect, getCompany);

export default router;
