import mongoose, { Schema } from "mongoose";
import { ISchool } from "../types/index";

const schoolSchema = new Schema<ISchool>({
  schoolName: {
    type: String,
    required: true,
  },
  schoolType: {
    type: String,
    enum: ["Primary", "Secondary", "Both"],
    required: true,
  },
  contactPersonName: {
    type: String,
    required: true,
  },
  contactPersonRole: {
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
  location: {
    type: String,
    required: true,
  },
  teachersNeeded: {
    type: String,
    // enum: ["Regular Subject Teachers", "Tech Teachers", "Both"],
    required: true,
  },
  preferredSubjects: {
    type: [String],
    required: true  ,
  },
  additionalComments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})


