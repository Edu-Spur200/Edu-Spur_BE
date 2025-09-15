import mongoose, { Schema } from "mongoose";
import { IParent } from "../types/index";

const parentSchema = new Schema<IParent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  phoneNumber: {
    type: String,
    required: true,
  },
  childGradeLevel: {
    type: String,
  },
  subjectsNeeded: {
    type: [String],
  },
  classToTeach: {
    type: String,
  },
  preferredTeachingTimes: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  additionalRequests: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Parent = mongoose.model<IParent>("Parent", parentSchema);

export default Parent;
