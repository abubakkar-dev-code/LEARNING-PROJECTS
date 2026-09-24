import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: Number,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
