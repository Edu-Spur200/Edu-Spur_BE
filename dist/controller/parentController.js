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
exports.getParentById = exports.createParent = exports.getAllParents = void 0;
const ParentModel_1 = __importDefault(require("../model/ParentModel"));
// Get all parents
const getAllParents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield ParentModel_1.default.find({});
        res.status(200).json({
            success: true,
            count: parents.length,
            data: parents,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllParents = getAllParents;
// Create a new parent
const createParent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parent = new ParentModel_1.default(req.body);
        yield parent.save();
        res.status(201).json({
            success: true,
            data: parent,
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
exports.createParent = createParent;
// Get a specific parent by ID
const getParentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parent = yield ParentModel_1.default.findById(id);
        if (!parent) {
            const error = new Error("Parent not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: parent,
        });
    }
    catch (err) {
        const error = err;
        if (error.name === "CastError") {
            error.statusCode = 400;
            error.message = "Invalid parent ID";
        }
        next(error);
    }
});
exports.getParentById = getParentById;
