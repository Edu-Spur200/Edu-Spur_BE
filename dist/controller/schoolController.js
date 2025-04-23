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
exports.getSchoolById = exports.createSchool = exports.getAllSchools = void 0;
const SchoolsModel_1 = __importDefault(require("../model/SchoolsModel"));
// Get all schools
const getAllSchools = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schools = yield SchoolsModel_1.default.find({});
        res.status(200).json({
            success: true,
            count: schools.length,
            data: schools,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllSchools = getAllSchools;
// Create a new school
const createSchool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const school = new SchoolsModel_1.default(req.body);
        yield school.save();
        res.status(201).json({
            success: true,
            data: school,
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
exports.createSchool = createSchool;
// Get a specific school by ID
const getSchoolById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const school = yield SchoolsModel_1.default.findById(id);
        if (!school) {
            const error = new Error("School not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: school,
        });
    }
    catch (err) {
        const error = err;
        if (error.name === "CastError") {
            error.statusCode = 400;
            error.message = "Invalid school ID";
        }
        next(error);
    }
});
exports.getSchoolById = getSchoolById;
