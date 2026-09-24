import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
});
const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
