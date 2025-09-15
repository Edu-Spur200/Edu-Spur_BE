import { Request, Response, NextFunction } from "express";
import Parent from "../model/ParentModel";
import { AppError } from "../types/index.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendMail";

// Get all parents
export const getAllParents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parents = await Parent.find({});
    res.status(200).json({
      success: true,
      count: parents.length,
      data: parents,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new parent

export const createParent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name } = req.body;

    // Check if email already exists
    const existing = await Parent.findOne({ email });
    if (existing) {
      res.status(400).json({ success: false, message: "Email already exists" });
      return;
    }

    // Create new parent with isVerified false
    const parent = new Parent({ ...req.body, isVerified: false });
    await parent.save();

    // Generate verification token
    const token = jwt.sign(
      { id: parent._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Create verification link
    const verificationLink = `http://localhost:5173/signup-success?token=${token}`;

    await sendEmail(
      email,
      "Verify Your Email",
      `<p>Hi ${name || "there"},</p>
   <p>Please verify your email by clicking the link below:</p>
   <a href="${verificationLink}">${verificationLink}</a>`
    );



    res.status(201).json({
      success: true,
      message: "Parent created. Verification email sent.",
      data: parent,
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

export const verifyParentEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string };
    const parent = await Parent.findById(decoded.id);

    if (!parent) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (parent.isVerified) {
       res.status(409).json({ success: false, message: "Email already verified" });
       return
    }

    parent.isVerified = true;
    await parent.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};


// Get a specific parent by ID
export const getParentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parent = await Parent.findById(id);

    if (!parent) {
      const error = new Error("Parent not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: parent,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "CastError") {
      error.statusCode = 400;
      error.message = "Invalid parent ID";
    }
    next(error);
  }
};
