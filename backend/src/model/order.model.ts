import Joi, { required } from "joi";
import mongoose, { Schema } from "mongoose";

export interface IOrder {
  user: mongoose.Schema.Types.ObjectId;
  firstName_en: string;
  firstName_ar: string;

  lastName_en: string;
  lastName_ar: string;

  city_en: string;
  city_ar: string;

  country_en: string;
  country_ar: string;

  address_en: string;
  address_ar: string;

  orderNotes_en: string;
  orderNotes_ar: string;

  formalName_en: string;
  formalName_ar: string;

  products: [];
  subTotal: number;
  totalQuantity: number;
  shipping: number;
  total: number;
  payInCash: boolean;
  creditCard: number;
  expirationDate: Date;
  protectionSymbol: number;
  orderStatus: string;
  phoneNumber: number;
  email: string;
  properties: [{ key: String; value: String }];
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    firstName_en: { type: String },
    firstName_ar: { type: String },

    lastName_en: { type: String },
    lastName_ar: { type: String },

    city_en: {
      type: String,
      required: true,
    },
    city_ar: {
      type: String,
      required: true,
    },

    country_en: {
      type: String,
      required: true,
    },
    country_ar: {
      type: String,
      required: true,
    },
    address_en: {
      type: String,
      required: true,
    },
    address_ar: {
      type: String,
      required: true,
    },
    orderNotes_en: {
      type: String,
      required: false,
    },
    orderNotes_ar: {
      type: String,
      required: false,
    },
    formalName_en: {
      type: String,
    },
    formalName_ar: {
      type: String,
    },
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

    email: {
      type: String,
      required: true,
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
    properties: { type: [{ key: String, value: String }] },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

export const orderValidation = (order: IOrder, reqType: any) => {
  const schema: any = Joi.object<IOrder>({
    user: Joi.objectId(),
    firstName_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    firstName_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    lastName_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    lastName_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    city_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    city_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    country_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    country_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    address_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    address_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    formalName_en: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.string().required(), otherwise: Joi.string() },
    ]),
    formalName_ar: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.string().required(), otherwise: Joi.string() },
    ]),
    orderNotes_en: Joi.optional(),
    orderNotes_ar: Joi.optional(),
    email: Joi.string().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    products: Joi.array().items(Joi.object()),
    subTotal: Joi.number(),
    shipping: Joi.number(),
    totalQuantity: Joi.number(),
    total: Joi.number(),

    phoneNumber: Joi.number().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),

    payInCash: Joi.boolean(),
    creditCard: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.number().required(), otherwise: Joi.number() },
    ]),
    expirationDate: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.date().required(), otherwise: Joi.date() },
    ]),
    protectionSymbol: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.number().required(), otherwise: Joi.number() },
    ]),
    orderStatus: Joi.string().valid("pending", "done"),
    properties: Joi.optional(),
  });
  return schema.tailor(reqType).validate(order);
};
