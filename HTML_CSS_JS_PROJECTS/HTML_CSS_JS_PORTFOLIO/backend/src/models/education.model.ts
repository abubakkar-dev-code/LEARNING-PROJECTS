import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  degeree: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  startYear: {
    type: Date,
  },
  endYear: {
    type: Date,
  },
  order: {
    type: Number,
    default: 1,
  },
});
const Education = mongoose.model("Education", educationSchema);
export default Education