import { Document } from "mongoose";

// School interface
export interface ISchool extends Document {
  schoolName: string;
  schoolType: "Primary" | "Secondary" | "Both";
  contactPersonName: string;
  contactPersonRole: string;
  email: string;
  phoneNumber: string;
  location: string;
  teachersNeeded: "Regular Subject Teachers" | "Tech Teachers" | "Both";
  preferredSubjects: string[];
  additionalComments?: string;
  createdAt: Date;
}

// Parent interface
export interface IParent extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  childGradeLevel: string;
  subjectsNeeded: string[];
  classToTeach: string;
  preferredTeachingTimes: string;
  location: string;
  additionalRequests?: string;
  createdAt: Date;
}

// Teacher interface
export interface ITeacher extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  specialization: string[];
  qualifications: string;
  experienceLevel: string;
  location: string;
  reasonToJoin: string;
  createdAt: Date;
}

// Error interface
export interface AppError extends Error {
  statusCode?: number;
}
