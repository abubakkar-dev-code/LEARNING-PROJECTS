import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  updateContact,
} from "../controllers/contact.controller";
const router = express.Router();
router.post("/", createContact);
router.get("/", getContact);
router.patch("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);
export default router;
