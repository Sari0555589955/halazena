import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import Joi, { objectId } from 'joi'

export interface ICategory {
  name: string
  _id?: string
  sub: ObjectId
  count: Number
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    sub: { type: ObjectId, ref: 'Category' },
    count: Number,
  },
  { timestamps: true },
)

const Category = mongoose.model<ICategory>('Category', categorySchema)
export default Category

export const categoryValidation = (category: ICategory) => {
  const schema = Joi.object({
    name: Joi.string().alter({
      post: (schema: any) => schema.required(),
    }),
    sub: Joi.objectId().optional(),
  })
  return schema.validate(category)
}
