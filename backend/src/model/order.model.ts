import Joi, { required } from "joi";
import mongoose, { Schema } from "mongoose";

export interface IOrder {
  user: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  products: [];
  subTotal: number;
  totalQuantity: number;
  shipping: number;
  total: number;
  city: string;
  country: string;
  address: string;
  orderNotes: string;
  payInCash: boolean;
  formalName: string;
  creditCard: number;
  expirationDate: Date;
  protectionSymbol: number;
  orderStatus: string;
  phoneNumber: number;
  receiptTime: number;
  email: string;
  properties: [{ key: String; value: String }];
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
    receiptTime: {
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
    firstName: Joi.string().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    lastName: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    email: Joi.string().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    products: Joi.array().items(Joi.object()),
    subTotal: Joi.number(),
    shipping: Joi.number(),
    totalQuantity: Joi.number(),
    total: Joi.number(),
    city: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    phoneNumber: Joi.number().alter({
      post: (schema: any) => schema.required(),
      put: (schema: any) => schema.optional(),
    }),
    country: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    address: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),

    formalName: Joi.alternatives().conditional("payInCash", [
      { is: false, then: Joi.string().required(), otherwise: Joi.string() },
    ]),
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
    orderNotes: Joi.optional(),
    properties: Joi.optional(),
  });
  return schema.tailor(reqType).validate(order);
};
