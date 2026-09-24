import express from "express";
import { deleteResume, getResume, updateResume, uploadResume } from "../controllers/file.upload.controller";
import upload from "../config/multer";
const router = express.Router();
router.post("/", upload.single("resume"), uploadResume);
router.get("/",getResume);
router.patch("/",upload.single("resume"),updateResume);
router.delete("/",deleteResume);

export default router;
