import express from "express";
import * as teacherController from "../controller/teacherController";

const router = express.Router();

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Create a new teacher
router.post("/", teacherController.createTeacher);

// Get a specific teacher by ID
router.get("/:id", teacherController.getTeacherById);

export default router;
