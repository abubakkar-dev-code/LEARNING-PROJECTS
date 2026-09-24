import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller";

const router = express.Router();
router.post("/", createProfile);
router.get("/", getProfile);
router.patch("/", updateProfile);

export default router;
