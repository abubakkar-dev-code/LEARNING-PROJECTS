import express from "express";
import {
  createEducation,
  deleteEducation,
  getEducation,
  getSingleEducation,
  updateEducation,
} from "../controllers/education.controller";
const router = express.Router();

router.post("/", createEducation);
router.get("/", getEducation);
router.get("/:educationId", getSingleEducation);
router.patch("/:educationId", updateEducation);
router.delete("/:educationId", deleteEducation);

export default router;
