import { Request, Response } from 'express'
import User, { userValidation } from "../model/user.model"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from '../middleWares/authentication.middleWare'
import { asyncHandler } from '../middleWares/asyncHandler'
import moment from 'moment'
import Order from '../model/order.model'
import { IUser } from './../model/user.model';
// register 
//desc: any user can register to the application 
//access: public

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
    // create the logic of user based on if the user ip is exist in the schema or not 
    const user = req.user;
    // i have body and user itSelf
    // 3 situations 
    //1) if user email is exist then return error user Exist
    //2) user email not exist then create new user
    //3) req.user.email is empty then update the existed empty user



    // then we NEED TO UPDATE THE USER DATAT
    const userExist = await User.findOne({ email: req.body.email })

    if (userExist) {
        return res.status(400).send({
            error_en: 'Email is Been Taken Already', error_ar: 'تم استخدام البريد الإلكتروني بالفعل'
        })

    }
    else {

        if (user.email == '') {

            const updatedUser = await User.findByIdAndUpdate(user._id, {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10)
            }, { new: true })
            if (!updateUser) {
                return res.status(400).send({ error_en: "Can't update User ", error_ar: 'لا يمكن تحديث المستخدم' })
            }
            res.status(200).send({ success_en: "User Data updated successfully", success_ar: "تم تحديث بيانات المستخدم بنجاح", user: updatedUser })
        }
        else {
            // should create new User 
            const user = new User({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
            await user.save();
            res.status(200).send({ success_en: "User Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user })
        }
    }










}


//Login
//Desc : login String 
//Access: public

export const loginUser = async (req: Request, res: Response) => {
    const isExist = await User.findOne({ email: req.body.email })
    if (!isExist) {
        return res.status(400).send({ error_en: 'Invalid Email ', error_ar: 'ايميل المستخدم خاطئ' })
    }
    else {
        // means email is valid so check the password
        const isMatch = bcrypt.compareSync(req.body.password, isExist.password ? isExist.password : '')
        if (!isMatch) {
            return res.status(400).send({ error_en: 'Invalid password ', error_ar: 'باسورد المستخدم خاطئ' })
        }
    }
    // dont put expiration 
    const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET!)
    const changeUserStatus = await User.findByIdAndUpdate(isExist._id, { status: true }, { new: true })
    res.status(200).send({ success_en: 'LogedInSuccessfully', successes_ar: "تم تسجيل الدخول بنجاح", userInfo: { user: changeUserStatus, token } })
}

//DESC : Get All Users 
//Route : GET/unStore/api/v1/user/getAll
//access: private(admin,super admin,subAdmin)
export const getAllusers = async (req: AuthenticatedRequest, res: Response) => {
    // need to create pagination for the user 
    const filterationObject:any={}
    if(req.params.roleType){
        filterationObject['role']={'$in':['sub admin','admin']}
    }else{
        filterationObject['role']='user';
    }
    filterationObject['email']= { '$ne': '' }
    const page: any = req.query.page;
    let limit = 2;
    // get the number of pages 
    const count = await User.find({ role: 'user' }).countDocuments()
    let pages = Math.round(count / limit)

    let skipLimit = (page - 1) * limit;
    if (!req.query.page) {
        skipLimit = 0
        limit = count;
    }


    // NEED TO GET ALL THE USER NOOT THE GUEST 
    // THEN GET HOW MANY ITEM THAT USER HAS BUGHT



    const users = await User.find(filterationObject).skip(skipLimit).limit(limit)
    console.log(users)

    let usersObj: any = {}
    users.forEach((user: any, index: any) => {
        usersObj[user._id] = { user, totalRevinue: 0 };
    })
    // done no lets lookup order by user id then lets add it 
    const orders = await Order.find({})
    if (orders[0]) {
        orders.forEach((order: any) => {
            let temp = usersObj[order.user]
            if (usersObj[order.user]) {
                temp.totalRevinue += order.total;
            }
        })
    }


    if (!users[0]) {
        return res.status(400).send({
            error_en: 'users are Not Found', error_ar: 'لم يتم العثور على المستخدمين'
        })
    }
    res.status(200).send({ success_en: 'Users are fetched successfully', success_ar: 'تم جلب المستخدمين بنجاح', count: pages, users: usersObj })
}
//DESC : Get user ById
//Route : GET/unStore/api/v1/user/getById/:userId
//access: private(admin,super admin,subAdmin)
export const getUserById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.params.userId)
    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدمين'
        })
    }
    res.status(200).send({ success_en: 'Users are fetched successfully', success_ar: 'تم جلب المستخدم بنجاح', user })
})
//DESC: update user 
//Route: put /unStore/api/v1/user/update/:userId
//access private (super admin ,admin)
export const updateUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    const user = await User.findByIdAndUpdate(req.params.userId, { ...req.body, }, { new: true })

    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدم'
        })
    }

    res.status(200).send({ success_en: 'user Updated  Successfully', success_ar: 'تم تحديث المستخدم بنجاح  ', user })
})
//DESC: delete user 
//Route: delete /unStore/api/v1/user/delete/:userId
//access private (super admin ,admin)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.userId)
    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدم'
        })
    }

    res.status(200).send({ success_en: 'user Deleted  Successfully', success_ar: 'تم حذف المستخدم بنجاح  ', user })
}

// add role for user 
// Route : /put /unStore/api/v1/user/addRole/:userId
//access: private(super admin,admin)
export const addRole = async (req: AuthenticatedRequest, res: Response) => {
    // check if user exist 

    // now user exist lets add the role to it 
    const updatedRole = await User.findByIdAndUpdate(req.params.userId, {
        $set: { role: req.body.role },

    }, { new: true })

    if (!updatedRole) {
        return res.status(400).send({ error_en: 'User Not Found', error_ar: 'لم يتم العثور على المستخدم' })
    }
    res.status(200).send({ success_en: 'User role Updated Successfully ', success_ar: 'تم تحديث دور المستخدم بنجاح', user: updatedRole })

}



export const addUserWithRole = async (req: AuthenticatedRequest, res: Response) => {
    const userExist: any = await User.findOne({ email: req.body.email })

    if (userExist) {
        return res.status(400).send({
            error_en: 'Email is Been Taken Already', error_ar: 'تم استخدام البريد الإلكتروني بالفعل'
        })

    } else {



        // should create new User 
        const user = new User({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
        await user.save();
        res.status(200).send({ success_en: "User  Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user })

    }

}
// get all the guest user in the day and get all the signed user in the day 
//ROUTE /GET /getUserAndGuestInDay
export const getUserAndGuestInDay = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    let date = new Date();
    const users = await User.find({})

    let userNumbers = 0, guestNumbers = 0;
    if (!users[0]) {
        return res.status(400).send({
            error_en: "Users Are Not Found", error_ar: "لم يتم العثور على المستخدمين"
        })
    }
    else {

        users.map((user: any) => {
            const userDate = new Date(user.createdAt)
            const startToday = new Date(new Date().setHours(0, 59))
            const endToday = new Date(new Date().setHours(23, 59))

            // first for the user where its not visitor
            // how to get the time starting from one hour 




            if (userDate >= startToday && userDate <= endToday) {
                if (user.email == '') {
                    guestNumbers++
                }
                else if (user.email.includes('@')) {
                    userNumbers++;
                }

            }
        })
        res.status(200).send({
            success_en: "users Fetched Successfully", success_ar: "تم جلب المستخدمين بنجاح",
            guestNumbers, userNumbers
        })
    }

})



export const getMe = (asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const foundUser = await User.findOne({ _id: req.user?._id }).select('-fullName_ar -fullName_en -userName_ar -password -__v -createdAt -updatedAt')

    if (!foundUser) {
        return res.status(400).send({ error_en: "User NOt Found", error_ar: 'لم يتم العثور على المستخدم' })
    }
    res.status(200).send({ success: 'user found ', user: foundUser })
}))

export const userLogout = (asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const foundUser = await User.findOneAndUpdate({ _id: req.user?._id }, { $set: { status: false } }, { new: true })
    if (!foundUser) {
        return res.status(400).send({ error_en: "User NOt Found" })
    }
    res.status(200).send({ success: 'user found ', user: foundUser })
}))


export const adminCreateUser = async (req: AuthenticatedRequest, res: Response) => {
    // create the logic of user based on if the user ip is exist in the schema or not 

    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) {
        return res.status(400).send({ error_en: 'User Already Exist', error_ar: 'مستخدم موجود' })

    }
    else {
        // createNew user
        const user = new User({ ...req.body, password: bcrypt.hashSync(req.body.password, 10) })
        await user.save();
        res.status(200).send({ success_en: "User Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user })

    }


}


export const adminLogin = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const isExist:any = await User.findOne({ email: req.body.email })
    console.log(isExist)
    if (!isExist) {
        return res.status(400).send({ error_en: 'Invalid Email ', error_ar: 'ايميل المستخدم خاطئ' })
    }
    else {
        // means email is valid so check the password
        const isMatch = bcrypt.compareSync(req.body.password, isExist.password ? isExist.password : '')
        if (!isMatch) {
            return res.status(400).send({ error_en: 'Invalid password ', error_ar: 'باسورد المستخدم خاطئ' })
        }
        const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET!)
        if (!(isExist.role == 'admin' || isExist.role=='super admin' || isExist.role=='sub admin')) {
            return res.status(400).send({ error_en: "only Admin Can Access DashBoard", error_ar: "يمكن للمسؤول فقط الوصول إلى لوحة المعلومات" })
        }
        res.status(200).send({ success_en: 'LogedInSuccessfully', successes_ar: "تم تسجيل الدخول بنجاح", userInfo: { user: isExist, token } })
    }
    // dont put expiration 
})


