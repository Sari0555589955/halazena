import Joi, { number } from 'joi'
import mongoose, { Schema } from 'mongoose'
import { Roles } from '../enum/enums.enum'

export interface IUser {
    firstName: string,
    lastName: string,
    fullName_en: string,
    fullName_ar: string,
    userName_en: string,
    userName_ar: string
    email: string,
    password: string,
    phone: string,
    role: string,
    creditCard: number,
    expirationDate: Date,
    protectionSymbol: number,
    ip: string,
    status: boolean,

}


const userSchema = new Schema({
    fullName_en: { type: String, },
    firstName: { type: String },
    lastName: { type: String },
    userName_en: { type: String, },
    // userName_ar: { type: String, },
    email: { type: String ,default:""},
    password: { type: String, default: '' },
    phone: { type: String },
    role: {
        type: String,
        enum: Roles,
        default: Roles.USER
    },

    ip: {
        type: String,
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
    status: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export const userValidation = (user: IUser, reqType: any) => {
    const schema = Joi.object({
        fullName_en: Joi.string(),
        // fullName_ar: Joi.string(),
        userName_en: Joi.string(),
        // userName_ar: Joi.string(),
        email: Joi.string().alter({
            post: (schema: any) => schema.required(),
        }),
        password: Joi.string().alter({
            post: (schema: any) => schema.required(),
            put: (schema: any) => schema.optional()
        }),
        phone: Joi.number(),
        role: Joi.string().valid(Roles.ADMIN, Roles.SUB_ADMIN, Roles.SUPER_ADMIN, Roles.USER),
        cardInfo: Joi.number(),
        ip: Joi.string(),
        creditCard: Joi.number(),
        expirationDate: Joi.date(),
        protectionSymbol: Joi.number(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        status: Joi.boolean(),

    })
    return schema.tailor(reqType).validate(user)
}

export default User