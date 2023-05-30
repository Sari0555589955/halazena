import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../model/user.model';
export interface AuthenticatedRequest extends Request {
    user?: IUser | any,

}

export const Authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const token: any = req.headers['authorization']?.trim()
    if (token === "null") {
        return res.status(401).send({ error_en: 'unauthorized Person', error_ar: 'مستخدم غير مصرح' })
    }
    if (token) {
        
        const { id }: string | any = jwt.verify(token, process.env.JWT_SECRET!)
        console.log('token',id)
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).send({ error_en: "Invalid Token", error_ar: 'رمز مميز غير صالح' })
        }
        else {

            (req as AuthenticatedRequest).user = user
        }

    }
    next();
}