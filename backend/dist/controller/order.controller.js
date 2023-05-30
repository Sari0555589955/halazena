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
exports.getHowManyOrdersInOneDay = exports.deleteOrder = exports.getOrdersByUser = exports.getOrderById = exports.getALLOrders = exports.UpdateOrder = exports.createOrder = void 0;
const enums_enum_1 = require("./../enum/enums.enum");
const asyncHandler_1 = require("../middleWares/asyncHandler");
const order_model_1 = __importDefault(require("../model/order.model"));
const cart_model_1 = __importDefault(require("../model/cart.model"));
const moment_1 = __importDefault(require("moment"));
// user creating order
// ROUTE /POST /unStore/api/v1/order
//access Public(user)
exports.createOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create order for user
    // check if there is order with the same data
    // first lets get the user that is registered right now to get the user then get the cart for that user
    // then use this data iniside the product of the owner
    const foundUser = req.user;
    if (foundUser) {
        // get all the cart product with that user id
        const cartProducts = yield cart_model_1.default.find({ user: foundUser._id })
            .populate([
            { path: 'user', model: 'User' },
            { path: 'product', model: 'Product' },
        ])
            .select('-_id');
        if (!cartProducts[0]) {
            return res.status(400).send({
                error_en: 'cant Create Order Without adding to the cart first',
                error_ar: 'لا يمكن إنشاء طلب دون الإضافة إلى سلة التسوق أولاً',
            });
        }
        const totals = calculateTotalOrder(cartProducts);
        // means create new Order
        const order = new order_model_1.default(Object.assign(Object.assign({}, req.body), { products: cartProducts, subTotal: totals.subTotal, totalQuantity: totals.totalQuantity, user: foundUser._id }));
        order.total = order.subTotal + order.shipping;
        // i should free the cart after creating the order
        yield order.save();
        console.log('foundUserId; ', foundUser === null || foundUser === void 0 ? void 0 : foundUser._id);
        yield cart_model_1.default.deleteMany({ user: foundUser._id });
        res.status(200).send({
            success_en: 'Order Added Successfully',
            success_ar: 'تمت إضافة الطلب بنجاح',
            order,
        });
    }
}));
const calculateTotalOrder = (cartProducts) => {
    let subTotal = 0;
    let totalQuantity = 0;
    cartProducts.forEach((item) => {
        const { product } = item;
        subTotal += product.price * product.sale * item.Quantity;
        totalQuantity += item.Quantity;
    });
    return { subTotal, totalQuantity };
};
// update order data
// ROUTE /put /unStore/api/v1/update/:orderId
exports.UpdateOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrder = yield order_model_1.default.findByIdAndUpdate(req.params.orderId, Object.assign(Object.assign({}, req.body), { orderStatus: req.body.orderStatus == 'pending' ? 'done' : 'pending' }), { new: true }).populate({
        path: 'user',
        model: 'User',
    });
    if (!updatedOrder) {
        return res.status(400).send({
            error_en: 'cant update order status cause it is not found ',
            error_ar: 'لا يمكن تحديث حالة الطلب لأنه غير موجود',
        });
    }
    const pendingCount = yield order_model_1.default.count({ orderStatus: 'pending' });
    const doneCount = yield order_model_1.default.count({ orderStatus: 'done' });
    res.status(200).send({
        success_en: 'order Status updated successfully ',
        success_ar: 'تم تحديث حالة الطلب بنجاح',
        order: updatedOrder,
        pendingCount,
        doneCount,
    });
}));
// get all Orders
// ROUTE /GET /unStore/api/v1/order/getAll/:params?
exports.getALLOrders = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role === enums_enum_1.Roles.USER) {
        // create function take params based on it return the filtered data
        const getFilteredOrders = () => __awaiter(void 0, void 0, void 0, function* () {
            // create the pagination concept in global
            let count = yield order_model_1.default.find({}).countDocuments();
            let page = req.query.page;
            let limit = 1;
            let skipLimit = (page - 1) * limit;
            let pages = Math.round(count / limit);
            if (!req.query.page) {
                limit = count;
                skipLimit = 0;
                pages = 0;
            }
            const getCashOrCredit = (option) => __awaiter(void 0, void 0, void 0, function* () {
                count = yield order_model_1.default.find({ payInCash: option }).countDocuments();
                const data = yield order_model_1.default.find({ payInCash: option })
                    .skip(skipLimit)
                    .limit(limit);
                if (data) {
                    return { data, count: !pages ? pages : count };
                }
            });
            const getLowestOrHighest = (option) => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield order_model_1.default.find({})
                    .sort(`${option ? 'total' : '-total'}`)
                    .skip(skipLimit)
                    .limit(limit);
                if (data) {
                    return { data, count: pages };
                }
            });
            const getOrdes = () => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const data = yield order_model_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                    .skip(skipLimit)
                    .limit(limit)
                    .populate([
                    { path: 'user', model: 'User' },
                    { path: 'products.product', model: 'Product' },
                ]);
                return { data, count: pages };
                // if(orders[0]){
                //     return orders
                // }
            });
            switch (req.params.params) {
                case 'cash':
                    // call cash
                    return getCashOrCredit(true);
                case 'credit':
                    return getCashOrCredit(false);
                case 'lowest':
                    return getLowestOrHighest(1);
                case 'highest':
                    return getLowestOrHighest(0);
                default:
                    return getOrdes();
            }
        });
        let filteredData = yield getFilteredOrders();
        console.log(filteredData);
        if (!filteredData.data[0]) {
            return res.status(400).send({
                error_en: 'Orders Are Not Found',
                error_ar: 'لم يتم العثور على الطلبات',
            });
        }
        const pendingCount = yield order_model_1.default.count({ orderStatus: 'pending' });
        const doneCount = yield order_model_1.default.count({ orderStatus: 'done' });
        // filter by the aggregate to have multiple matcher
        res.status(200).send({
            success_en: 'Orders Are Fetched Successsfully',
            success_ar: 'تم جلب الطلبات بنجاح',
            count: filteredData.length,
            orders: filteredData,
            pendingCount,
            doneCount,
        });
    }
    else {
        const pendingCount = yield order_model_1.default.count({ orderStatus: 'pending' });
        const doneCount = yield order_model_1.default.count({ orderStatus: 'done' });
        // filter by the aggregate to have multiple matcher
        const filteredData = yield order_model_1.default.find();
        res.status(200).send({
            success_en: 'Orders Are Fetched Successsfully',
            success_ar: 'تم جلب الطلبات بنجاح',
            count: filteredData.length,
            orders: filteredData,
            pendingCount,
            doneCount,
        });
    }
}));
// getOrder ById
//ROUTE /GET /unStore/api/v1/order/getById/:orderId
exports.getOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(req.params.orderId).populate([
        {
            path: 'products.product',
            model: 'Product',
        },
    ]);
    if (!order) {
        return res
            .status(400)
            .send({ error_en: 'Order is Not Found', error_ar: 'الطلب غير موجود' });
    }
    res.status(200).send({
        success_en: 'Order is Fetched Successfully: ',
        success_ar: 'Order is Fetched Successfully',
        order: order,
    });
}));
exports.getOrdersByUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    const orders = yield order_model_1.default.find({ user: foundUser._id }).populate({
        path: 'products.product',
        model: 'Product',
    });
    if (!orders[0]) {
        return res.status(400).send({
            error_en: 'Orders Are Not Found',
            error_ar: 'لم يتم العثور على الطلبات',
        });
    }
    // delete cart before order completed
    res.status(200).send({
        success_en: 'Orders Are Fetched Successfully ',
        success_ar: 'تم جلب الطلبات بنجاح',
        orders,
    });
}));
// delete order
//ROUTE /DELETE /unStore/api/v1/order/delete/:orderId
exports.deleteOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findByIdAndDelete(req.params.orderId);
    if (!order) {
        return res.status(400).send({
            error_en: 'order cant be deleted',
            error_ar: 'لا يمكن حذف الطلب',
        });
    }
    res.status(200).send({
        success_en: 'order deleted successfully ',
        success_ar: 'تم حذف الطلب بنجاح',
    });
}));
// GET HOW MANY ORDERS ARE HAPPENED IN THE DAY
//ROUTE /GET /unStore/api/v1/order/howmanInDay
exports.getHowManyOrdersInOneDay = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // n need to create opject of 12 month start from january to december
    let monthlyDate = {};
    // input object then outpu return object of all the mothes
    let numOfOrderInADay = 0;
    let totalInDay = 0;
    let date = new Date();
    // get each order and compare it to it
    const orders = yield order_model_1.default.find({});
    // need also to get the total of each order
    monthlyDate = getMonthlyDate(monthlyDate);
    // next step create
    orders.map((order) => {
        let newDate = new Date(order.createdAt);
        // here i should return based on the day
        // how many order has been created
        // moment(timeNow.setMonth(index)).format('MMMM')
        // i shoul  get to object to contais
        // i need to set then get in the same place for the date with moment
        if (Object.keys(monthlyDate).includes((0, moment_1.default)(newDate.setMonth(newDate.getMonth())).format('MMMM'))) {
            monthlyDate[`${(0, moment_1.default)(newDate.setMonth(newDate.getMonth())).format('MMMM')}`]++;
        }
        if (!(date.getDay() - newDate.getDay())) {
            // now i should count how many order is been created
            numOfOrderInADay++;
            totalInDay += order.total;
        }
    });
    res.status(200).send({
        success_en: 'Returned No of Order of the day',
        success_ar: 'تم إرجاع رقم طلب اليوم',
        numOfOrderInADay,
        totalInDay,
        monthlyDate,
    });
}));
const getMonthlyDate = (object) => {
    const arr = Array.from(Array(13).keys());
    // input object
    // output {'january'}
    const timeNow = new Date();
    arr.map((_, index) => {
        let month = (0, moment_1.default)(timeNow.setMonth(index)).format('MMMM');
        if (!object[`${month}`]) {
            object[`${month}`] = 0;
        }
    });
    return object;
    // const now = moment(timeNow).format('YYYY / MM / DD')
};
// need to get the dailgy orders
// the question is how many user order from the site each day
// this is analytical question means i need to calculate how many order
// requested each day then get the average but how
// i only have access to the order and the date the order takes place
// he want to know how many orders in the day
// i will compare the time now and get the day the full year and compare it then it will count how many happened that day
