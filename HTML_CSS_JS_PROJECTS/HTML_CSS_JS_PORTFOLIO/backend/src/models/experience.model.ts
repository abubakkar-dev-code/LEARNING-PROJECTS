import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    order: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
