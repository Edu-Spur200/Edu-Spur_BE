"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routes
const index_1 = __importDefault(require("../routes/index"));
const schoolRoutes_1 = __importDefault(require("../routes/schoolRoutes"));
const parentRoutes_1 = __importDefault(require("../routes/parentRoutes"));
const teacherRoutes_1 = __importDefault(require("../routes/teacherRoutes"));
const enquiriesRoutes_1 = __importDefault(require("../routes/enquiriesRoutes"));
// Load environment variables
dotenv_1.default.config();
// Environment variables
const MONGODB_URI = "mongodb+srv://eduspursolutions:NVPLrh82KrlUK4aw@edu-spur-mongodb-cluste.brxslir.mongodb.net/?retryWrites=true&w=majority&appName=Edu-Spur-mongodb-cluster";
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api", index_1.default);
app.use("/api/schools", schoolRoutes_1.default);
app.use("/api/parents", parentRoutes_1.default);
app.use("/api/teachers", teacherRoutes_1.default);
app.use("/api/enquiries", enquiriesRoutes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// Error handling middleware
app.use((err, req, res, _next) => {
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
exports.default = app;
