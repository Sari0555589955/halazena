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
exports.contactValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    contactType: {
        type: String,
        enum: ['complaints', 'suggestions', 'customerService'],
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isOpened: {
        type: Boolean,
        default: false
    }
});
const Contact = mongoose_1.default.model('ContactSchema', contactSchema);
exports.default = Contact;
const contactValidation = (contact, reqType) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        message: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        email: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        phone: joi_1.default.number().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        isOpened: joi_1.default.boolean(),
        contactType: joi_1.default.string().valid('suggestions', 'complaints', 'customerService').required()
    });
    return schema.tailor(reqType).validate(contact);
};
exports.contactValidation = contactValidation;
