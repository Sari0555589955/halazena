"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.adminCreateUser = exports.userLogout = exports.getMe = exports.getUserAndGuestInDay = exports.addUserWithRole = exports.addRole = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllusers = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../middleWares/asyncHandler");
const order_model_1 = __importDefault(require("../model/order.model"));
// register 
//desc: any user can register to the application 
//access: public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create the logic of user based on if the user ip is exist in the schema or not 
    const user = req.user;
    // i have body and user itSelf
    // 3 situations 
    //1) if user email is exist then return error user Exist
    //2) user email not exist then create new user
    //3) req.user.email is empty then update the existed empty user
    // then we NEED TO UPDATE THE USER DATAT
    const userExist = yield user_model_1.default.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).send({
            error_en: 'Email is Been Taken Already', error_ar: 'تم استخدام البريد الإلكتروني بالفعل'
        });
    }
    else {
        if (user.email == '') {
            const updatedUser = yield user_model_1.default.findByIdAndUpdate(user._id, Object.assign(Object.assign({}, req.body), { password: bcryptjs_1.default.hashSync(req.body.password, 10) }), { new: true });
            if (!exports.updateUser) {
                return res.status(400).send({ error_en: "Can't update User ", error_ar: 'لا يمكن تحديث المستخدم' });
            }
            res.status(200).send({ success_en: "User Data updated successfully", success_ar: "تم تحديث بيانات المستخدم بنجاح", user: updatedUser });
        }
        else {
            // should create new User 
            const user = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: bcryptjs_1.default.hashSync(req.body.password, 10) }));
            yield user.save();
            res.status(200).send({ success_en: "User Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user });
        }
    }
});
exports.createUser = createUser;
//Login
//Desc : login String 
//Access: public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ email: req.body.email });
    if (!isExist) {
        return res.status(400).send({ error_en: 'Invalid Email ', error_ar: 'ايميل المستخدم خاطئ' });
    }
    else {
        // means email is valid so check the password
        const isMatch = bcryptjs_1.default.compareSync(req.body.password, isExist.password ? isExist.password : '');
        if (!isMatch) {
            return res.status(400).send({ error_en: 'Invalid password ', error_ar: 'باسورد المستخدم خاطئ' });
        }
    }
    // dont put expiration 
    const token = jsonwebtoken_1.default.sign({ id: isExist._id }, process.env.JWT_SECRET);
    const changeUserStatus = yield user_model_1.default.findByIdAndUpdate(isExist._id, { status: true }, { new: true });
    res.status(200).send({ success_en: 'LogedInSuccessfully', successes_ar: "تم تسجيل الدخول بنجاح", userInfo: { user: changeUserStatus, token } });
});
exports.loginUser = loginUser;
//DESC : Get All Users 
//Route : GET/unStore/api/v1/user/getAll
//access: private(admin,super admin,subAdmin)
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // need to create pagination for the user 
    const filterationObject = {};
    if (req.params.roleType) {
        filterationObject['role'] = { '$in': ['sub admin', 'admin'] };
    }
    else {
        filterationObject['role'] = 'user';
    }
    filterationObject['email'] = { '$ne': '' };
    const page = req.query.page;
    let limit = 2;
    // get the number of pages 
    const count = yield user_model_1.default.find({ role: 'user' }).countDocuments();
    let pages = Math.round(count / limit);
    let skipLimit = (page - 1) * limit;
    if (!req.query.page) {
        skipLimit = 0;
        limit = count;
    }
    // NEED TO GET ALL THE USER NOOT THE GUEST 
    // THEN GET HOW MANY ITEM THAT USER HAS BUGHT
    const users = yield user_model_1.default.find(filterationObject).skip(skipLimit).limit(limit);
    console.log(users);
    let usersObj = {};
    users.forEach((user, index) => {
        usersObj[user._id] = { user, totalRevinue: 0 };
    });
    // done no lets lookup order by user id then lets add it 
    const orders = yield order_model_1.default.find({});
    if (orders[0]) {
        orders.forEach((order) => {
            let temp = usersObj[order.user];
            if (usersObj[order.user]) {
                temp.totalRevinue += order.total;
            }
        });
    }
    if (!users[0]) {
        return res.status(400).send({
            error_en: 'users are Not Found', error_ar: 'لم يتم العثور على المستخدمين'
        });
    }
    res.status(200).send({ success_en: 'Users are fetched successfully', success_ar: 'تم جلب المستخدمين بنجاح', count: pages, users: usersObj });
});
exports.getAllusers = getAllusers;
//DESC : Get user ById
//Route : GET/unStore/api/v1/user/getById/:userId
//access: private(admin,super admin,subAdmin)
exports.getUserById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.userId);
    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدمين'
        });
    }
    res.status(200).send({ success_en: 'Users are fetched successfully', success_ar: 'تم جلب المستخدم بنجاح', user });
}));
//DESC: update user 
//Route: put /unStore/api/v1/user/update/:userId
//access private (super admin ,admin)
exports.updateUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        req.body.password = bcryptjs_1.default.hashSync(req.body.password, 10);
    }
    const user = yield user_model_1.default.findByIdAndUpdate(req.params.userId, Object.assign({}, req.body), { new: true });
    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدم'
        });
    }
    res.status(200).send({ success_en: 'user Updated  Successfully', success_ar: 'تم تحديث المستخدم بنجاح  ', user });
}));
//DESC: delete user 
//Route: delete /unStore/api/v1/user/delete/:userId
//access private (super admin ,admin)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndDelete(req.params.userId);
    if (!user) {
        return res.status(400).send({
            error_en: 'user is Not Found', error_ar: 'لم يتم العثور على المستخدم'
        });
    }
    res.status(200).send({ success_en: 'user Deleted  Successfully', success_ar: 'تم حذف المستخدم بنجاح  ', user });
});
exports.deleteUser = deleteUser;
// add role for user 
// Route : /put /unStore/api/v1/user/addRole/:userId
//access: private(super admin,admin)
const addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exist 
    // now user exist lets add the role to it 
    const updatedRole = yield user_model_1.default.findByIdAndUpdate(req.params.userId, {
        $set: { role: req.body.role },
    }, { new: true });
    if (!updatedRole) {
        return res.status(400).send({ error_en: 'User Not Found', error_ar: 'لم يتم العثور على المستخدم' });
    }
    res.status(200).send({ success_en: 'User role Updated Successfully ', success_ar: 'تم تحديث دور المستخدم بنجاح', user: updatedRole });
});
exports.addRole = addRole;
const addUserWithRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.default.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).send({
            error_en: 'Email is Been Taken Already', error_ar: 'تم استخدام البريد الإلكتروني بالفعل'
        });
    }
    else {
        // should create new User 
        const user = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: bcryptjs_1.default.hashSync(req.body.password, 10) }));
        yield user.save();
        res.status(200).send({ success_en: "User  Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user });
    }
});
exports.addUserWithRole = addUserWithRole;
// get all the guest user in the day and get all the signed user in the day 
//ROUTE /GET /getUserAndGuestInDay
exports.getUserAndGuestInDay = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date();
    const users = yield user_model_1.default.find({});
    let userNumbers = 0, guestNumbers = 0;
    if (!users[0]) {
        return res.status(400).send({
            error_en: "Users Are Not Found", error_ar: "لم يتم العثور على المستخدمين"
        });
    }
    else {
        users.map((user) => {
            const userDate = new Date(user.createdAt);
            const startToday = new Date(new Date().setHours(0, 59));
            const endToday = new Date(new Date().setHours(23, 59));
            // first for the user where its not visitor
            // how to get the time starting from one hour 
            if (userDate >= startToday && userDate <= endToday) {
                if (user.email == '') {
                    guestNumbers++;
                }
                else if (user.email.includes('@')) {
                    userNumbers++;
                }
            }
        });
        res.status(200).send({
            success_en: "users Fetched Successfully", success_ar: "تم جلب المستخدمين بنجاح",
            guestNumbers, userNumbers
        });
    }
}));
exports.getMe = ((0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundUser = yield user_model_1.default.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).select('-fullName_ar -fullName_en -userName_ar -password -__v -createdAt -updatedAt');
    if (!foundUser) {
        return res.status(400).send({ error_en: "User NOt Found", error_ar: 'لم يتم العثور على المستخدم' });
    }
    res.status(200).send({ success: 'user found ', user: foundUser });
})));
exports.userLogout = ((0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const foundUser = yield user_model_1.default.findOneAndUpdate({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, { $set: { status: false } }, { new: true });
    if (!foundUser) {
        return res.status(400).send({ error_en: "User NOt Found" });
    }
    res.status(200).send({ success: 'user found ', user: foundUser });
})));
const adminCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create the logic of user based on if the user ip is exist in the schema or not 
    const userExist = yield user_model_1.default.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).send({ error_en: 'User Already Exist', error_ar: 'مستخدم موجود' });
    }
    else {
        // createNew user
        const user = new user_model_1.default(Object.assign(Object.assign({}, req.body), { password: bcryptjs_1.default.hashSync(req.body.password, 10) }));
        yield user.save();
        res.status(200).send({ success_en: "User Created Successfully", success_ar: "تم اضافة المستخدم بنجاح", user });
    }
});
exports.adminCreateUser = adminCreateUser;
exports.adminLogin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ email: req.body.email });
    console.log(isExist);
    if (!isExist) {
        return res.status(400).send({ error_en: 'Invalid Email ', error_ar: 'ايميل المستخدم خاطئ' });
    }
    else {
        // means email is valid so check the password
        const isMatch = bcryptjs_1.default.compareSync(req.body.password, isExist.password ? isExist.password : '');
        if (!isMatch) {
            return res.status(400).send({ error_en: 'Invalid password ', error_ar: 'باسورد المستخدم خاطئ' });
        }
        const token = jsonwebtoken_1.default.sign({ id: isExist._id }, process.env.JWT_SECRET);
        if (!(isExist.role == 'admin' || isExist.role == 'super admin' || isExist.role == 'sub admin')) {
            return res.status(400).send({ error_en: "only Admin Can Access DashBoard", error_ar: "يمكن للمسؤول فقط الوصول إلى لوحة المعلومات" });
        }
        res.status(200).send({ success_en: 'LogedInSuccessfully', successes_ar: "تم تسجيل الدخول بنجاح", userInfo: { user: isExist, token } });
    }
    // dont put expiration 
}));
