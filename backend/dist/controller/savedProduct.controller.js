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
exports.deleteProductFromTheSavedProduct = exports.getSavedProductByUser = exports.getAllSavedProducts = exports.addToSavedProduct = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const savedProduct_1 = __importDefault(require("../model/savedProduct"));
exports.addToSavedProduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check if cart is not exist create it 
    // check if there is a cart or not 
    // adding new one 
    const isExist = yield savedProduct_1.default.findOne({ product: req.body.product, user: req.user._id }).populate([
        { path: "product", model: "Product" },
        { path: 'user', model: 'User' }
    ]);
    if (isExist) {
        const savedDeleted = yield savedProduct_1.default.findByIdAndDelete(isExist._id);
        if (savedDeleted) {
            return res.status(200).send({ success_en: 'Deleted from the Whishing List Successfully', error_ar: 'تم الحذف من القائمة المحفوظة بنجاح', action: 'deleted' });
        }
    }
    const newSavedProduct = new savedProduct_1.default({ product: req.body.product, user: req.user._id });
    yield newSavedProduct.save();
    const foundSavedProduct = yield savedProduct_1.default.findById(newSavedProduct._id).populate([
        { path: "product", model: "Product" },
        { path: "user", model: "User" }
    ]);
    res.status(200).send({ success_en: "product added to Saved Products", success_ar: 'تمت إضافة المنتج إلى المنتج المحفوظ', newSavedProduct: foundSavedProduct, action: 'added' });
}));
// get all the saved products for specific user 
// ROUTE /GET /unStore/api/v1/savedProduct/getAll
//ACCESS:PRIVATE(SUPERADMIN,ADMIN,SUBADMIN,USER)
exports.getAllSavedProducts = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = req.user;
    // let pages = await SavedProduct.find({ user: foundUser._id }).countDocuments()
    // let items = pages;
    // let page: any = req.query.page
    // let limit = 2;
    // let skipLimit = (page - 1) * limit;
    // let count = Math.round(pages / limit)
    // if (!req.query.page) {
    //     limit = pages;
    //     pages = 0; count = 0;
    //     skipLimit = 0;
    // }
    // now lets get all the savedproducts
    const savedProducts = yield savedProduct_1.default.find({ user: foundUser._id }).populate([
        { path: 'product', model: 'Product' }
    ]);
    if (!savedProducts[0]) {
        return res.status(400).send({ error_en: "Saved Products Are Not Found", error_ar: 'لم يتم العثور على المنتجات المحفوظة' });
    }
    res.status(200).send({ success_en: "SavedProducts Are Fetched Successfully", success_ar: "تم جلب المنتجات المحفوظة بنجاح", products: savedProducts, count: savedProducts.length });
}));
exports.getSavedProductByUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const savedProducts = yield savedProduct_1.default.find({ user: req.body.user }).populate('product');
    if (!savedProducts[0]) {
        return res.status(400).send({ error_en: "Products are not found", error_ar: "لم يتم العثور على المنتجات" });
    }
    res.status(200).send({ success_en: "Products fetched from saved Products ", success_ar: "تم جلب المنتجات من المنتجات المحفوظة", savedProducts });
}));
exports.deleteProductFromTheSavedProduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // make sure to only delete the products for the loged in user 
    const foundUser = req.user;
    // 
    const product = yield savedProduct_1.default.findOneAndDelete({ user: foundUser === null || foundUser === void 0 ? void 0 : foundUser._id, product: req.params.productId });
    if (!product) {
        return res.status(400).send({ error_en: "Product Can't Be Deleted ", error_ar: 'لا يمكن حذف المنتج' });
    }
    // lets delete the product from the saved product 
    res.status(200).send({ success_en: "Product Deleted Successfully from the saved Products", success_ar: 'تم حذف المنتج بنجاح من المنتجات المحفوظة' });
}));
