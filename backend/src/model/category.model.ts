import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import Joi, { objectId } from "joi";

export interface ICategory {
  name_en: string;
  name_ar: string;
  _id?: string;
  sub: ObjectId;
  count: Number;
}

const categorySchema = new Schema<ICategory>(
  {
    name_en: { type: String, required: true },
    name_ar: { type: String, required: true },
    sub: { type: ObjectId, ref: "Category" },
    count: Number,
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;

export const categoryValidation = (category: ICategory) => {
  const schema = Joi.object({
    name_en: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    name_ar: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    sub: Joi.objectId().optional(),
  });
  return schema.validate(category);
};
