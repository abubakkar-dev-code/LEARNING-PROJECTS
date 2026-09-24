import mongoose, { Document, Schema } from "mongoose";

interface Iprofile extends Document {
  name: string;
  email: string;
  role: string;
  aboutDescription: string;
  profileImg: string;
  location: string;
  socialLinks: String[];
}
const profileSchema = new Schema<Iprofile>(
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
    role: {
      type: String,
      required: true,
    },
    aboutDescription: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    location: {
      type: String,
    },
    socialLinks: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);
const Profile = mongoose.model<Iprofile>("Profile", profileSchema);
export default Profile;
