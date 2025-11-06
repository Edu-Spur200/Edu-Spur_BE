import express from "express";
import * as parentController from "../controller/parentController";

const router = express.Router();

router.get("/verify", parentController.verifyParentEmail);

// Get all parents
router.get("/", parentController.getAllParents);

// Create a new parent
router.post("/", parentController.createParent);


// Get a specific parent by ID
router.get("/:id", parentController.getParentById);

export default router;
