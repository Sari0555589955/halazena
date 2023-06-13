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
exports.productValidation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const savedProduct_1 = __importDefault(require("./savedProduct"));
const order_model_1 = __importDefault(require("./order.model"));
const productSchema = new mongoose_1.Schema({
    title_en: {
        type: String,
        required: true,
    },
    title_ar: {
        type: String,
        required: true,
    },
    description_en: {
        type: String,
        required: true,
    },
    description_ar: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    price: { type: Number, required: true },
    sale: {
        type: Number,
        default: 1,
    },
    images: [
        {
            type: String,
            default: "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ],
    likes: [{ user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" } }],
    count: {
        type: Number,
        default: 1,
    },
    ratings: [
        {
            rating: Number,
            user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    avgRating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    payInCash: {
        type: Boolean,
        default: false,
    },
    attributes: {
        type: [{ key_en: String, key_ar: String, values: Array }],
        default: [
            { key_en: "weight", key_ar: "الوزن", values: [] },
            { key_en: "size", key_ar: "الحجم", values: [] },
        ],
    },
    sub: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    smallDesc_ar: String,
    smallDesc_en: String,
}, { timestamps: true });
// productSchema.pre('save', async function (next) {
//   if (!this.isNew) return next()
//   const data: any = [
//     { key: 'color', values: [] },
//     { key: 'size', values: [] },
//   ]
//   this.attributes = data
// })
productSchema.pre("findOneAndDelete", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let product = yield this.model.findOne(this.getQuery());
        let savedProduct = yield savedProduct_1.default.findOneAndDelete({
            product: product === null || product === void 0 ? void 0 : product._id,
        });
        console.log("savedProducat: ", savedProduct);
        // deleting the product from inside the category
        yield order_model_1.default.updateMany({}, {
            $pull: {
                products: {
                    product: product === null || product === void 0 ? void 0 : product._id,
                },
            },
        });
    });
});
productSchema.post("findOneAndDelete", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield order_model_1.default.deleteMany({ products: { $size: 0 } });
    });
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
const productValidation = (product, reqType) => {
    const schema = joi_1.default.object({
        title_ar: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        title_en: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        category: joi_1.default.objectId(),
        description_ar: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        description_en: joi_1.default.string().alter({
            post: (schema) => schema.required(),
        }),
        price: joi_1.default.number().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.forbidden(),
        }),
        ratins: joi_1.default.array().items(joi_1.default.object({
            rating: joi_1.default.number(),
            user: joi_1.default.objectId(),
        })),
        reviews: joi_1.default.number(),
        avgRating: joi_1.default.number(),
        likes: joi_1.default.array().items(joi_1.default.object({
            like: joi_1.default.string(),
            user: joi_1.default.objectId(),
        })),
        image: joi_1.default.string(),
        images: joi_1.default.array().items(joi_1.default.string()),
        sale: joi_1.default.number(),
        payInCash: joi_1.default.boolean().alter({
            post: (schema) => schema.required(),
            put: (schema) => schema.optional(),
        }),
        attributes: joi_1.default.array(),
        smallDesc_en: joi_1.default.string(),
        smallDesc_ar: joi_1.default.string(),
        sub: joi_1.default.objectId().required(),
    });
    return schema.tailor(reqType).validate(product);
};
exports.productValidation = productValidation;
