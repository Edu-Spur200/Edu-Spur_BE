import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// Import routes
import indexRoutes from "../routes/index";
import schoolRoutes from "../routes/schoolRoutes";
import parentRoutes from "../routes/parentRoutes";
import teacherRoutes from "../routes/teacherRoutes";

// Load environment variables
dotenv.config();

// Environment variables
const MONGODB_URI =
  "mongodb+srv://eduspursolutions:NVPLrh82KrlUK4aw@edu-spur-mongodb-cluste.brxslir.mongodb.net/?retryWrites=true&w=majority&appName=Edu-Spur-mongodb-cluster";
const PORT = process.env.PORT || 3000;

// Error interface
interface AppError extends Error {
  statusCode?: number;
}

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api", indexRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/teachers", teacherRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("EduSpur School Connection API initialized");
});

app.get("/", (req, res) => {
  console.log("Server up");
  res.send("Server is running");
});


export default app;
