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
exports.deleteCartByUser = exports.getCartWithUser = exports.deleteFromCart = exports.updateQuantityInCart = exports.addToCart = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const cart_model_1 = __importDefault(require("../model/cart.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
exports.addToCart = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    // after finding the user lets use it to check for the cart items
    if (foundUser && foundUser._id) {
        // check if product already in cart
        const isProductInCart = yield cart_model_1.default.findOne({ user: foundUser._id, product: req.body.product });
        if (isProductInCart) {
            const productExistinCart = yield cart_model_1.default.findByIdAndDelete(isProductInCart._id);
            if (productExistinCart)
                return res.status(200).send({ success_en: "product Removed From Cart Successfully", success_ar: 'تمت إزالة المنتج من سلة التسوق بنجاح', cartItem: productExistinCart });
        }
        // add new product to the cart 
        const saveToCart = new cart_model_1.default(Object.assign(Object.assign({}, req.body), { user: foundUser._id }));
        yield saveToCart.save();
        const cartProduct = yield cart_model_1.default.findById(saveToCart._id).populate({
            path: 'product', model: "Product"
        });
        res.status(200).send({
            success_en: "Product Saved To Cart Successfully", success_ar: "تم حفظ المنتج في عربة التسوق بنجاح",
            cartItem: cartProduct,
            status: 'added'
        });
        // lets updated it again 
    }
}));
exports.updateQuantityInCart = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    let updateQuantity;
    if (foundUser) {
        if (req.body.Quantity) {
            console.log('userQuantity: ', foundUser === null || foundUser === void 0 ? void 0 : foundUser._id);
            console.log('productQuantity: ', req.body.product);
            updateQuantity = yield cart_model_1.default.findOneAndUpdate({ user: foundUser._id, product: req.body.product }, {
                $set: { Quantity: req.body.Quantity }
            }, { new: true }).populate({ path: "product", model: "Product" });
            console.log('updateQuantity: ', updateQuantity);
        }
        else {
            return res.status(400).send({ error_en: "Quantity Required To Update the product Quantity", error_ar: "الكمية مطلوبة لتحديث كمية المنتج" });
        }
        // update the price manualy 
        if (updateQuantity) {
            updateQuantity.price = updateQuantity.product.price * updateQuantity.Quantity;
        }
        else {
            return res.status(400).send({
                error_en: "Cant Update Product in Cart Cause Product Not Found", error_ar: "تعذر تحديث المنتج في سلة التسوق سبب عدم العثور على المنتج"
            });
        }
        res.status(200).send({ success_en: "Product Quantity updated Successfully in Cart", success_ar: "تم تحديث كمية المنتج بنجاح في سلة التسوق", cartItem: updateQuantity });
    }
    else {
        return res.status(400).send({ error_en: "Cant Updated The product In Cart Without Quantity", error_ar: "لا يمكن تحديث المنتج في سلة التسوق بدون الكمية" });
    }
}));
exports.deleteFromCart = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    if (foundUser && foundUser._id) {
        const cart = yield cart_model_1.default.findOneAndDelete({ user: foundUser, product: req.params.productId });
        if (!cart) {
            return res.status(400).send({ error_en: "Cant Delete BeCause Product its not in the cart", error_ar: "لا يمكن الحذف لأن المنتج ليس في سلة التسوق" });
        }
        res.status(200).send({
            success_en: "Deleted From Cart Successfully", success_ar: "تم الحذف من العربة بنجاح"
        });
    }
}));
// get all the product in the cart for specific user \
// ROUTE /GET /unStore/api/v1/cart/getAllByUser
//access public
exports.getCartWithUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    const carts = yield cart_model_1.default.find({});
    if (foundUser && carts[0]) {
        const productsInCart = yield cart_model_1.default.find({ user: foundUser._id }).populate('product');
        if (!productsInCart[0]) {
            return res.status(400).send({ error_en: "Cant find Product in Cart", error_ar: 'غير قادر على العثور على المنتجات في سلة التسوق' });
        }
        // get all the products then get all the summ of the categories 
        res.status(200).send({
            success_en: "The remaining products in cart ",
            success_ar: "المنتجات المتبقية في عربة التسوق", cart: productsInCart
        });
    }
    else {
        return res.status(400).send({ error_en: "Cart Is Empty: ", error_ar: "السلة فارغة" });
    }
}));
exports.deleteCartByUser = ((0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_model_1.default.findById(req.user._id);
    const cart = yield cart_model_1.default.findOneAndDelete({ user: foundUser._id });
    if (!cart) {
        res.status(400).send({ error_en: "Cart Is Already Empty", error_ar: "عربة التسوق فارغة بالفعل" });
    }
    res.status(200).send({
        success_en: "Cart Deleted Successfully ", success_ar: "تم حذف سلة التسوق بنجاح"
    });
})));
