"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const categorySchema = new mongoose_1.Schema({
    name_en: { type: String, required: true },
    name_ar: { type: String, required: true },
    sub: { type: mongodb_1.ObjectId, ref: "Category" },
    image: {
        type: String,
    },
    count: Number,
}, { timestamps: true });
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
const categoryValidation = (category) => {
    const schema = joi_1.default.object({
        name_en: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        name_ar: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        sub: joi_1.default.objectId().optional(),
        image: joi_1.default.string(),
    });
    return schema.validate(category);
};
exports.categoryValidation = categoryValidation;
