import { Router } from "express";
import { protect } from "../functions/auth/protect";
import { createCompany } from "../functions/company/createCompany";
import { getCompany } from "../functions/company/getCompany";
import { deleteCompany } from "../functions/company/deleteCompany";
import { updateCompany } from "../functions/company/updateCompany";

const router = Router();

router.post("/", protect, createCompany);
router.get("/", protect, getCompany);
router.delete("/", protect, deleteCompany);
router.put("/", protect, updateCompany);

export default router;
