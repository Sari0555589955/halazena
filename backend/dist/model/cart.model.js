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
exports.cartValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const cartSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    Quantity: {
        type: Number,
        default: 1,
    },
    properties: { type: [{ key: String, value: String }] },
});
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
const cartValidation = (cart, reqType) => {
    const schema = joi_1.default.object({
        product: joi_1.default.objectId().alter({
            post: (schema) => schema.required(),
        }),
        user: joi_1.default.objectId().alter({
            post: (schema) => schema.required(),
        }),
        quantity: joi_1.default.number().alter({
            post: (schema) => schema.required(),
        }),
        price: joi_1.default.number().alter({
            post: (schema) => schema.required(),
        }),
        properties: joi_1.default.optional(),
    });
    return schema.tailor(reqType).validate(cart);
};
exports.cartValidation = cartValidation;
