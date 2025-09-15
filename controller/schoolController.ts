import { Request, Response, NextFunction } from "express";
import School from "../model/SchoolsModel";
import { AppError } from "../types/index.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail";

// Get all schools
export const getAllSchools = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schools = await School.find({});
    res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new school with email verification
export const createSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, schoolName, contactPerson } = req.body;

    // Check if email already exists
    const existing = await School.findOne({ email });
    if (existing) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    // Create new school with isVerified false
    const school = new School({ ...req.body, isVerified: false });
    await school.save();

    // Generate verification token
    const token = jwt.sign(
      { id: school._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Create verification link
    const verificationLink = `http://localhost:5173/signup-success?token=${token}`;

    await sendEmail(
      email,
      "Verify Your School Email - Edu-Spur",
      `<p>Hi ${contactPerson || schoolName || "there"},</p>
       <p>Welcome to Edu-Spur! Please verify your school email by clicking the link below:</p>
       <a href="${verificationLink}">${verificationLink}</a>
       <p>This link will expire in 24 hours.</p>
       <p>Thank you for registering ${schoolName} on our platform!</p>`
    );

    res.status(201).json({
      success: true,
      message: "School registered. Verification email sent.",
      data: {
        _id: school._id,
        schoolName: school.schoolName,
        email: school.email,
        contactPersonName: school.contactPersonName,
        isVerified: school.isVerified
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

// Verify school email
export const verifySchoolEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string };
    const school = await School.findById(decoded.id);

    if (!school) {
      res.status(404).json({ success: false, message: "School not found" });
      return;
    }

    if (school.isVerified) {
      res.status(409).json({ success: false, message: "Email already verified" });
      return;
    }

    school.isVerified = true;
    await school.save();

    res.status(200).json({ success: true, message: "School email verified successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

// Get a specific school by ID
export const getSchoolById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);

    if (!school) {
      const error = new Error("School not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "CastError") {
      error.statusCode = 400;
      error.message = "Invalid school ID";
    }
    next(error);
  }
};