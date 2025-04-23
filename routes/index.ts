import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to EduSpur School Connection API",
    version: "1.0.0",
    endpoints: {
      schools: "/api/schools",
      parents: "/api/parents",
      teachers: "/api/teachers",
    },
  });
});

export default router;
