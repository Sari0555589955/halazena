import Joi from 'joi';
import mongoose, { Schema } from 'mongoose'
import { OrderStatus } from './../enum/enums.enum';

interface IInventory {
    product: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    order: Schema.Types.ObjectId,
    reports: [{ orderStatus: string, description: string }]
}

const inventorySchema = new Schema<IInventory>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    reports: [
        Object
    ]
})
const Inventory=mongoose.model('Inventory',inventorySchema)
export default Inventory;
export const inventoryValidation = (inventory: IInventory, reqType: any) => {
    const schema = Joi.object({
        product: Joi.objectId().required(),
        user: Joi.objectId().required(),
        order: Joi.objectId().required(),
        description: Joi.array().items(Joi.object())
    })
    return schema.tailor(reqType).validate(inventory)
}