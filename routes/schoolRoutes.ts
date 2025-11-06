import express from "express";
import * as schoolController from "../controller/schoolController";

const router = express.Router();

router.get("/verify", schoolController.verifySchoolEmail);

// Get all schools
router.get("/", schoolController.getAllSchools);

// Create a new school
router.post("/", schoolController.createSchool);

// Get a specific school by ID
router.get("/:id", schoolController.getSchoolById);

export default router;
