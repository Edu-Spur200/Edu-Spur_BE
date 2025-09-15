import { Request, Response, NextFunction } from "express";
import Teacher from "../model/TeachersModel";
import { AppError } from "../types/index.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail";

// Get all teachers
export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const teachers = await Teacher.find({});
    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new teacher with email verification
export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name } = req.body;

    // Check if email already exists
    const existing = await Teacher.findOne({ email });
    if (existing) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    // Create new teacher with isVerified false
    const teacher = new Teacher({ ...req.body, isVerified: false });
    await teacher.save();

    // Generate verification token
    const token = jwt.sign(
      { id: teacher._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Create verification link
    const verificationLink = `http://localhost:5173/signup-success?token=${token}`;

    await sendEmail(
      email,
      "Verify Your Email - Edu-Spur Teacher",
      `<p>Hi ${name || "there"},</p>
       <p>Welcome to Edu-Spur as a teacher! Please verify your email by clicking the link below:</p>
       <a href="${verificationLink}">${verificationLink}</a>
       <p>This link will expire in 24 hours.</p>`
    );

    res.status(201).json({
      success: true,
      message: "Teacher created. Verification email sent.",
      data: {
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        isVerified: teacher.isVerified
      },
      token
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Verify teacher email
export const verifyTeacherEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string };
    const teacher = await Teacher.findById(decoded.id);

    if (!teacher) {
      res.status(404).json({ success: false, message: "Teacher not found" });
      return;
    }

    if (teacher.isVerified) {
      res.status(409).json({ success: false, message: "Email already verified" });
      return;
    }

    teacher.isVerified = true;
    await teacher.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

// Get a specific teacher by ID
export const getTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      const error = new Error("Teacher not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "CastError") {
      error.statusCode = 400;
      error.message = "Invalid teacher ID";
    }
    next(error);
  }
};