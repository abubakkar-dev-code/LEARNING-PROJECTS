import express from "express";
import {
  createSkill,
  deletSkill,
  getSkill,
  updateSkill,
} from "../controllers/skill.controller";
const router = express.Router();

router.post("/", createSkill);
router.get("/", getSkill);
router.patch("/:skillId", updateSkill);
router.delete("/:skillId", deletSkill);

export default router;
