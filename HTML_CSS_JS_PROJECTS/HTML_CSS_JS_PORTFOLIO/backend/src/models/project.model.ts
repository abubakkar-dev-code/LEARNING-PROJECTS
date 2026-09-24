import mongoose from "mongoose";
import { features } from "node:process";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Completed", "OnGoing"],
      default: "OnGoing",
    },
  },
  { timestamps: true },
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
