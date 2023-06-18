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
exports.sectionValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const sectionSchem = new mongoose_1.Schema({
    title_en: {
        type: String,
        default: "",
    },
    title_ar: {
        type: String,
        default: "",
    },
    description_en: {
        type: String,
        default: "",
    },
    description_ar: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ["slider", "banner", "aboutus", "privacy"],
    },
    alignment: {
        type: String,
    },
});
const Section = mongoose_1.default.model("Section", sectionSchem);
exports.default = Section;
const sectionValidation = (section, reqType) => {
    const schema = joi_1.default.object({
        type: joi_1.default.string().valid("slider", "banner", "aboutus", "privacy"),
        title_en: joi_1.default.alternatives().conditional("type", [
            { is: "slider", then: joi_1.default.string().required() },
            { is: "aboutus", then: joi_1.default.string().required() },
            { is: "privacy", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.optional() },
        ]),
        title_ar: joi_1.default.alternatives().conditional("type", [
            { is: "slider", then: joi_1.default.string().required() },
            { is: "aboutus", then: joi_1.default.string().required() },
            { is: "privacy", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.optional() },
        ]),
        description_en: joi_1.default.alternatives().conditional("type", [
            { is: "slider", then: joi_1.default.string().required() },
            { is: "aboutus", then: joi_1.default.string().required() },
            { is: "privacy", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.optional() },
        ]),
        description_ar: joi_1.default.alternatives().conditional("type", [
            { is: "slider", then: joi_1.default.string().required() },
            { is: "aboutus", then: joi_1.default.string().required() },
            { is: "privacy", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.optional() },
        ]),
        image: joi_1.default.alternatives().conditional("type", [
            { is: "slider", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.string().required() },
            { is: "aboutus", then: joi_1.default.string().required() },
            { is: "privacy", then: joi_1.default.string().required() },
            { is: "banner", then: joi_1.default.string().required() },
        ]),
        alignment: joi_1.default.when("type", [
            {
                is: "banner",
                then: joi_1.default.string().required(),
                otherwise: joi_1.default.optional(),
            },
        ]).valid("horizontal", "vertical"),
    });
    return schema.tailor(reqType).validate(section);
};
exports.sectionValidation = sectionValidation;
