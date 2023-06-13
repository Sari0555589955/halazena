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
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const enums_enum_1 = require("../enum/enums.enum");
const userSchema = new mongoose_1.Schema({
    fullName_en: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    userName_en: { type: String },
    // userName_ar: { type: String, },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: String },
    role: {
        type: String,
        enum: enums_enum_1.Roles,
        default: enums_enum_1.Roles.USER,
    },
    ip: {
        type: String,
    },
    creditCard: {
        type: Number,
    },
    expirationDate: {
        type: Date,
    },
    protectionSymbol: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
const userValidation = (user, reqType) => {
    const schema = joi_1.default.object({
        fullName_en: joi_1.default.string(),
        // fullName_ar: Joi.string(),
        userName_en: joi_1.default.string(),
        // userName_ar: Joi.string(),
        email: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        password: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        phone: joi_1.default.number(),
        role: joi_1.default.string().valid(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUB_ADMIN, enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.USER),
        cardInfo: joi_1.default.number(),
        ip: joi_1.default.string(),
        creditCard: joi_1.default.number(),
        expirationDate: joi_1.default.date(),
        protectionSymbol: joi_1.default.number(),
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        status: joi_1.default.boolean(),
    });
    return schema.tailor(reqType).validate(user);
};
exports.userValidation = userValidation;
exports.default = User;
