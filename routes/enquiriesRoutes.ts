import express from "express";
import * as enquiriesController from "../controller/enquiriesController";

const router = express.Router();

// Get all teachers
router.get("/get-all-enquiries", enquiriesController.getAllEnquiries);

// Create a new teacher
router.post("/createEnquiry", enquiriesController.createEnquiry);

// Get a specific teacher by ID
router.get("/get-enquiry-by-id/:id", enquiriesController.getEnquiryById);

export default router; 
