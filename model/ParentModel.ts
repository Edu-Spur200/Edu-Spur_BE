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
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  childGradeLevel: {
    type: String,
    required: true,
  },
  subjectsNeeded: {
    type: [String],
    required: true,
  },
  classToTeach: {
    type: String,
    required: true,
  },
  preferredTeachingTimes: {
    type: String,
    required: true,
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
