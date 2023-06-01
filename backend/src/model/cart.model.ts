import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";
// cart should have data of product not the same product
interface ICart {
  product: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  price: number;
  Quantity: number;

  properties: [{ key: String; value: String }];
}
const cartSchema = new Schema<ICart>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Quantity: {
    type: Number,
    default: 1,
  },
  properties: { type: [{ key: String, value: String }] },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

export const cartValidation = (cart: ICart, reqType: any) => {
  const schema = Joi.object({
    product: Joi.objectId().alter({
      post: (schema: any) => schema.required(),
    }),
    user: Joi.objectId().alter({
      post: (schema: any) => schema.required(),
    }),
    Quantity: Joi.number().alter({
      post: (schema: any) => schema.required(),
    }),
    price: Joi.number().alter({
      post: (schema: any) => schema.required(),
    }),
    properties: Joi.optional(),
  });
  return schema.tailor(reqType).validate(cart);
};
