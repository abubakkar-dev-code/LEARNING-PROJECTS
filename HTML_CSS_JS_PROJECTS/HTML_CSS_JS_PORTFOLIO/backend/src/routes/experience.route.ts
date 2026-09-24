import express from "express";
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperienceById,
  updateExperience,
} from "../controllers/experience.controller";
const router = express.Router();

router.post("/", createExperience);
router.get("/", getExperience);
router.get("/:experienceId", getExperienceById);
router.patch("/:experienceId", updateExperience);
router.delete("/:experienceId", deleteExperience);

export default router;
