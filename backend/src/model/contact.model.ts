import Joi from "joi";
import mongoose, { Schema } from "mongoose";


export interface IContact {
    name: string,
    phone: number,
    message: string,
    email: string,
    contactType: string,
    isOpened:boolean;
}


const contactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    contactType: {
        type: String,
        enum: ['complaints', 'suggestions', 'customerService'],
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isOpened:{
        type:Boolean,
        default:false
    }
})

const Contact = mongoose.model('ContactSchema', contactSchema)

export default Contact



export const contactValidation = (contact: IContact, reqType: any) => {
    const schema = Joi.object({
        name: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        message: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        email: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        phone: Joi.number().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional(),
        }),
        isOpened:Joi.boolean(),
        contactType: Joi.string().valid('suggestions', 'complaints', 'customerService').required()
    })
    return schema.tailor(reqType).validate(contact)
}