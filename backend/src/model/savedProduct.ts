import Joi from "joi";
import mongoose, { Schema } from "mongoose";
// cart should have data of product not the same product
interface ISavedProduct {
  product: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
const savedProductSchema = new Schema<ISavedProduct>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const SavedProduct = mongoose.model("SavedProduct", savedProductSchema);
export default SavedProduct;

export const savedProductValidation = (
  savedProduct: ISavedProduct,
  reqType: any
) => {
  const schema = Joi.object({
    product: Joi.objectId().alter({
      post: (schema: any) => schema.required(),
    }),
    user: Joi.objectId(),
  });
  return schema.tailor(reqType).validate(savedProduct);
};
