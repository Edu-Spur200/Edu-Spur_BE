import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/index.js";
import Enquiries from "../model/Enquiries";

// Get all teachers
export const getAllEnquiries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enquiries = await Enquiries.find({});
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new teacher
export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enquiries = new Enquiries(req.body);
    await enquiries.save();

    res.status(201).json({
      success: true,
      data: enquiries,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
  }
};

// Get a specific teacher by ID
export const getEnquiryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const enquiries = await Enquiries.findById(id);

    if (!enquiries) {
      const error = new Error("Enquiry not found") as AppError;
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "CastError") {
      error.statusCode = 400;
      error.message = "Invalid enquiry ID";
    }
    next(error);
  }
};
