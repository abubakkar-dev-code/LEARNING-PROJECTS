import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
  getProjectById,
} from "../controllers/project.controller";
const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:projectId",getProjectById)
router.patch("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);
export default router;
