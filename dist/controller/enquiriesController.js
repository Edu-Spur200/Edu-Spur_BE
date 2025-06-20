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
exports.getEnquiryById = exports.createEnquiry = exports.getAllEnquiries = void 0;
const Enquiries_1 = __importDefault(require("../model/Enquiries"));
// Get all teachers
const getAllEnquiries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enquiries = yield Enquiries_1.default.find({});
        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllEnquiries = getAllEnquiries;
// Create a new teacher
const createEnquiry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enquiries = new Enquiries_1.default(req.body);
        yield enquiries.save();
        res.status(201).json({
            success: true,
            data: enquiries,
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
exports.createEnquiry = createEnquiry;
// Get a specific teacher by ID
const getEnquiryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const enquiries = yield Enquiries_1.default.findById(id);
        if (!enquiries) {
            const error = new Error("Enquiry not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: enquiries,
        });
    }
    catch (err) {
        const error = err;
        if (error.name === "CastError") {
            error.statusCode = 400;
            error.message = "Invalid enquiry ID";
        }
        next(error);
    }
});
exports.getEnquiryById = getEnquiryById;
