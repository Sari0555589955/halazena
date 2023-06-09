import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { Brand, Colors, Sizes } from "./../enum/enums.enum";
import Joi from "joi";
import SavedProduct from "./savedProduct";
import Order from "./order.model";

export interface IProduct {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: mongoose.Schema.Types.ObjectId;
  price: number;
  attributes: {
    type: [
      {
        key_en: String;
        key_ar: String;
        value: Array<{
          en: String;
          ar: String;
        }>;
      }
    ];
  };
  sale: Number;
  images: string[];
  likes: [{ like: string; user: mongoose.Schema.Types.ObjectId }];
  ratings: [
    { rating: number; user: mongoose.Schema.Types.ObjectId; ref: "User" }
  ];
  reviews: number;
  avgRating: number;
  count: number;
  payInCash: boolean;
  smallDesc_ar: String;
  smallDesc_en: String;
  sub: ObjectId;
}
const productSchema = new Schema<IProduct>(
  {
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
      type: mongoose.Schema.Types.ObjectId,
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
        default:
          "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    count: {
      type: Number,
      default: 1,
    },

    ratings: [
      {
        rating: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    smallDesc_ar: String,
    smallDesc_en: String,
  },
  { timestamps: true }
);
// productSchema.pre('save', async function (next) {
//   if (!this.isNew) return next()
//   const data: any = [
//     { key: 'color', values: [] },
//     { key: 'size', values: [] },
//   ]
//   this.attributes = data
// })
productSchema.pre("findOneAndDelete", async function () {
  let product = await this.model.findOne(this.getQuery());

  let savedProduct = await SavedProduct.findOneAndDelete({
    product: product?._id,
  });
  console.log("savedProducat: ", savedProduct);
  // deleting the product from inside the category
  await Order.updateMany(
    {},
    {
      $pull: {
        products: {
          product: product?._id,
        },
      },
    }
  );
});
productSchema.post("findOneAndDelete", async function () {
  await Order.deleteMany({ products: { $size: 0 } });
});
const Product = mongoose.model("Product", productSchema);
export default Product;
export const productValidation = (product: IProduct, reqType: any) => {
  const schema = Joi.object({
    title_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    title_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    category: Joi.objectId(),
    description_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    description_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    price: Joi.number().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.forbidden(),
    }),
    ratins: Joi.array().items(
      Joi.object({
        rating: Joi.number(),
        user: Joi.objectId(),
      })
    ),
    reviews: Joi.number(),
    avgRating: Joi.number(),
    likes: Joi.array().items(
      Joi.object({
        like: Joi.string(),
        user: Joi.objectId(),
      })
    ),
    image: Joi.string(),
    images: Joi.array().items(Joi.string()),
    sale: Joi.number(),
    payInCash: Joi.boolean().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    attributes: Joi.array(),
    smallDesc_en: Joi.string(),
    smallDesc_ar: Joi.string(),
    sub: Joi.objectId().required(),
  });
  return schema.tailor(reqType).validate(product);
};
