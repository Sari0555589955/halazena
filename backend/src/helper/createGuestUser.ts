import jwt from 'jsonwebtoken'
import User from '../model/user.model';
import { AuthenticatedRequest } from './../middleWares/authentication.middleWare';
import { Response } from 'express';

// const generateRandomUserId = async () => {
//     const users = await User.find({})
//     let state = true;
//     let _id: string;
//     do {
//         _id = uuidv4().replace(/\-/g, "")
//         users.forEach((user) => {
//             if (user._id.toString() !== _id) {
//                 state = false
//             }
//         })
//     } while (state)
//     // GENERATED ID IS READY TO BE INJECTED TO THE USERS
//     return _id;

// }
export const createGuestUser = async (req: AuthenticatedRequest, res: Response) => {
    // let _id = await generateRandomUserId();
    const user = new User({email:'test',role:'user'})
     user.save();
   
    // GENERATE TOKEN OF THAT USER AND RETURN IT TO THE FRONT SIDE

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)
    if (token) {
        console.log('user GetBack:khaidhfiahsdifhiasdhifhiadshifahidsfh ', user)
        return res.status(200).send({ success_en: "Token For Guest User", token })
    }
    res.status(400).send({ error_en: "Cant Send Token To Guest user" })
}
