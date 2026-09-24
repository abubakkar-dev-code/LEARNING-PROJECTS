import mongoose, { Schema, Document } from "mongoose";
interface Icategory extends Document {
  name: string;
  order: number;
}

const skillCategorySchema = new Schema<Icategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);
const SkillCategory = mongoose.model<Icategory>(
  "SkillCategory",
  skillCategorySchema,
);
export default SkillCategory;
