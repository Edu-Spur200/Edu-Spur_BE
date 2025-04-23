import mongoose, { Schema } from "mongoose";
import { ITeacher } from "../types/index";

const teacherSchema = new Schema<ITeacher>({
  fullName: {
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
  specialization: {
    type: [String],
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reasonToJoin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
