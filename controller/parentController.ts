import { Request, Response, NextFunction } from "express";
import Parent from "../model/ParentModel";
import { AppError } from "../types/index.js";

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
    const parent = new Parent(req.body);
    await parent.save();

    res.status(201).json({
      success: true,
      data: parent,
    });
  } catch (err) {
    const error = err as AppError;
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
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
