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
exports.orderValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: { type: String },
    lastName: { type: String },
    products: {
        type: [],
        default: [],
    },
    subTotal: {
        type: Number,
        default: 0,
    },
    shipping: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    orderNotes: {
        type: String,
        required: false,
    },
    formalName: {
        type: String,
    },
    payInCash: {
        type: Boolean,
        default: false,
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
    orderStatus: {
        type: String,
        num: ["pending", "done"],
        default: "pending",
    },
    totalQuantity: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    receiptDay: {
        type: Number,
        required: true,
    },
    properties: { type: [{ key: String, value: String }] },
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
const orderValidation = (order, reqType) => {
    const schema = joi_1.default.object({
        user: joi_1.default.objectId(),
        firstName: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        lastName: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        email: joi_1.default.string().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        products: joi_1.default.array().items(joi_1.default.object()),
        subTotal: joi_1.default.number(),
        shipping: joi_1.default.number(),
        totalQuantity: joi_1.default.number(),
        total: joi_1.default.number(),
        city: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        phoneNumber: joi_1.default.number().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        country: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        address: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        formalName: joi_1.default.alternatives().conditional("payInCash", [
            { is: false, then: joi_1.default.string().required(), otherwise: joi_1.default.string() },
        ]),
        payInCash: joi_1.default.boolean(),
        creditCard: joi_1.default.alternatives().conditional("payInCash", [
            { is: false, then: joi_1.default.number().required(), otherwise: joi_1.default.number() },
        ]),
        expirationDate: joi_1.default.alternatives().conditional("payInCash", [
            { is: false, then: joi_1.default.date().required(), otherwise: joi_1.default.date() },
        ]),
        protectionSymbol: joi_1.default.alternatives().conditional("payInCash", [
            { is: false, then: joi_1.default.number().required(), otherwise: joi_1.default.number() },
        ]),
        orderStatus: joi_1.default.string().valid("pending", "done"),
        orderNotes: joi_1.default.optional(),
        receiptDay: joi_1.default.number().min(5).max(30).required(),
        properties: joi_1.default.optional(),
    });
    return schema.tailor(reqType).validate(order);
};
exports.orderValidation = orderValidation;
