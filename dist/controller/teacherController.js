"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeacherById = exports.createTeacher = exports.getAllTeachers = void 0;
const TeachersModel_1 = __importDefault(require("../model/TeachersModel"));
// Get all teachers
const getAllTeachers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield TeachersModel_1.default.find({});
        res.status(200).json({
            success: true,
            count: teachers.length,
            data: teachers,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTeachers = getAllTeachers;
// Create a new teacher
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = new TeachersModel_1.default(req.body);
        yield teacher.save();
        res.status(201).json({
            success: true,
            data: teacher,
        });
    }
    catch (err) {
        const error = err;
        if (error.name === "ValidationError") {
            error.statusCode = 400;
        }
        next(error);
    }
});
exports.createTeacher = createTeacher;
// Get a specific teacher by ID
const getTeacherById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const teacher = yield TeachersModel_1.default.findById(id);
        if (!teacher) {
            const error = new Error("Teacher not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: teacher,
        });
    }
    catch (err) {
        const error = err;
        if (error.name === "CastError") {
            error.statusCode = 400;
            error.message = "Invalid teacher ID";
        }
        next(error);
    }
});
exports.getTeacherById = getTeacherById;
