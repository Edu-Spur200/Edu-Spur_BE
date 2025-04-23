import { Request, Response, NextFunction } from "express";
import School from "../model/SchoolsModel";
import { AppError } from "../types/index.js";

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

// Create a new school
export const createSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const school = new School(req.body);
    await school.save();

    res.status(201).json({
      success: true,
      data: school,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
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
