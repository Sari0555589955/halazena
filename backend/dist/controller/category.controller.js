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
exports.categoryTotalAmount_TotalSum = exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllSubCategories = exports.getAllCategory = exports.addSubCategory = exports.addCategory = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const category_model_1 = __importDefault(require("../model/category.model"));
const order_model_1 = __importDefault(require("../model/order.model"));
const product_model_1 = __importDefault(require("../model/product.model"));
// add Category
//DESC: adding category for the Category
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/category/add
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category_en = yield category_model_1.default.findOne({ name_en: req.body.name_en });
    if (category_en) {
        return res.status(400).send({
            error_en: "Category Already Exist",
            error_ar: "الفئة موجودة بالفعل",
        });
    }
    const category_ar = yield category_model_1.default.findOne({ name_ar: req.body.name_ar });
    if (category_ar) {
        return res.status(400).send({
            error_en: "Category Already Exist",
            error_ar: "الفئة موجودة بالفعل",
        });
    }
    const newCategory = new category_model_1.default(Object.assign({}, req.body));
    yield newCategory.save();
    res.status(200).send({
        success_en: "Category Added Successfully",
        success_ar: "تمت إضافة الفئة بنجاح",
        category: newCategory,
    });
});
exports.addCategory = addCategory;
// add sub Category
//DESC: adding category for the Category
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/category/addSub/:id
const addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subcategory = yield category_model_1.default.findOne({
        name: req.body.name,
        sub: req.params.id,
    });
    if (subcategory) {
        return res.status(400).send({
            error_en: "Sub category Already Exist",
            error_ar: "الفئة الفرعيه موجودة بالفعل",
        });
    }
    const newSubCategory = new category_model_1.default(Object.assign(Object.assign({}, req.body), { sub: req.params.id }));
    yield newSubCategory.save();
    res.status(200).send({
        success_en: "Sub category Added Successfully",
        success_ar: "تمت إضافة الفئة الفرعيه بنجاح",
        category: newSubCategory,
    });
});
exports.addSubCategory = addSubCategory;
// Desc: getAll The Category
//Route : /GET /unStore/api/v1/category/getAll
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
exports.getAllCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // create pagination concept
    // get the total numb of docs
    // FIRST LETS CREATE ARRAY OF OBJECTS
    // ARRAY[{'WOMEN':0,TOTAL:0}]
    // GET ALL CATEGOR
    let cats = yield category_model_1.default.find({ sub: undefined });
    if (cats[0]) {
        // i should check if there is a product or not having
    }
    let stats = {};
    cats.map((cat) => {
        if (!stats[cat.name_en]) {
            stats[cat.name_en] = [0, 0];
        }
        if (!stats[cat.name_ar]) {
            stats[cat.name_ar] = [0, 0];
        }
    });
    // 2 COUNT HOW MANY PRODUCT FROM THAT CATEGORY
    const products = yield product_model_1.default.find({}).populate({
        path: "category",
        model: "Category",
    });
    products.forEach((product) => {
        var _a;
        if (product) {
            if (stats[(_a = product.category) === null || _a === void 0 ? void 0 : _a.name]) {
                stats[product.category.name][0]++;
            }
        }
    });
    // second step is to get the total of all category
    // steps:
    // GET ALL ORDERS THEN POPULATE PRODUCT THEN POPULATE ORDERS THEN CALCULATE THE TOTAL FOR EACH PRODUCT IS BEEN SAILED
    const orders = yield order_model_1.default.find({}).populate([
        {
            path: "products.product",
            model: "Product",
            populate: {
                path: "category",
                model: "Category",
            },
        },
    ]);
    let newProducts;
    if (orders[0]) {
        newProducts = getProductsArr(orders);
        stats = getCategoryTotalSum(stats, newProducts);
    }
    const count = yield category_model_1.default.find({ sub: undefined }).countDocuments();
    let page = req.query.page;
    let limit = 2;
    let skipLimit = (page - 1) * limit;
    let pages = Math.round(count / limit);
    if (!req.query.page) {
        limit = count;
        pages = 0;
        skipLimit = 0;
    }
    const category = yield category_model_1.default.find({ sub: undefined })
        .skip(skipLimit)
        .limit(limit);
    if (!category[0]) {
        return res.status(400).send({
            error_en: "Categories Are Not Found",
            error_ar: "لم يتم العثور على الفئات ",
        });
    }
    res.status(200).send({
        success_en: "Category Fetched  Successfully",
        success_ar: "تم جلب الفئة بنجاح   ",
        categories: { count: pages, category, stats },
    });
}));
// Desc: getAll The Category
//Route : /GET /unStore/api/v1/category/getAllSub/:id
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
exports.getAllSubCategories = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("mohamed salah hassan", id);
    const subCategories = yield category_model_1.default.find({ sub: id });
    for (let index = 0; index < subCategories.length; index++) {
        const cate = subCategories[index];
        const count = yield product_model_1.default.find({ sub: cate._id });
        cate.count = count.length;
    }
    res.status(200).send({
        success_en: "Categories Fetched  Successfully",
        success_ar: "تم جلب الفئات بنجاح   ",
        subCategories,
    });
}));
// get the categories totalsum
const getCategoryTotalSum = (obj, products) => {
    products.forEach((product) => {
        if (product) {
            if (obj[product.product.category.name]) {
                obj[product.product.category.name][1] += product.product.price;
            }
        }
    });
    return obj;
};
// Desc: getAll The Category
//Route : /GET /unStore/api/v1/category/getById/:id
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findById(req.params.id);
    if (!category) {
        return res.status(400).send({
            error_en: "Categorie is Not Found",
            error_ar: "لم يتم العثور على الفئة",
        });
    }
    res.status(200).send({
        success_en: "Category Fetched  Successfully",
        success_ar: "تم جلب الفئة بنجاح   ",
        category,
    });
});
exports.getCategoryById = getCategoryById;
// Desc: update The Category
//Route : /Put /unStore/api/v1/category/update/:id
//access: private (SUPER ADMIN,ADMIN)
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), { new: true });
    if (!category) {
        return res.status(400).send({
            error_en: "Categorie is Not Found",
            error_ar: "لم يتم العثور على الفئة",
        });
    }
    res.status(200).send({
        success_en: "Category Updated  Successfully",
        success_ar: "تم تحديث الفئة بنجاح  ",
        category,
    });
});
exports.updateCategory = updateCategory;
// Desc: delete The Category
//Route : /DELETE /unStore/api/v1/category/getById/:id
//access: private (SUPER ADMIN,ADMIN)
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // before Deleting the category you should delete all the products related to it
    const findCategoryPRoducts = yield product_model_1.default.find({
        category: req.params.id,
    }).populate({ path: "category", model: "Category" });
    const findSubRoducts = yield product_model_1.default.find({
        sub: req.params.id,
    }).populate({ path: "sub", model: "Category" });
    if (findCategoryPRoducts[0]) {
        return res.status(400).send({
            error_en: `You Cant Delete Category ${(_a = findCategoryPRoducts[0].category) === null || _a === void 0 ? void 0 : _a.name} Untill You Remove All Products Related To It`,
            error_ar: `لا يمكنك حذف الفئة ${(_b = findCategoryPRoducts[0].category) === null || _b === void 0 ? void 0 : _b.name} حتى تقوم بإزالة جميع المنتجات المتعلقة بها`,
        });
    }
    else if (findSubRoducts[0])
        return res.status(400).send({
            error_en: `You Cant Delete sub Category ${(_c = findSubRoducts[0].category) === null || _c === void 0 ? void 0 : _c.name} Untill You Remove All Products Related To It`,
            error_ar: `لا يمكنك حذف الفئة الفرعيه${(_d = findSubRoducts[0].category) === null || _d === void 0 ? void 0 : _d.name} حتى تقوم بإزالة جميع المنتجات المتعلقة بها`,
        });
    const category = yield category_model_1.default.findByIdAndDelete(req.params.id);
    if (!category) {
        return res.status(400).send({
            error_en: "Categorie is Not Found",
            error_ar: "لم يتم العثور على الفئة",
        });
    }
    res.status(200).send({
        success_en: "Category Deleted  Successfully",
        success_ar: "تم حذف الفئة بنجاح ",
        category,
    });
});
exports.deleteCategory = deleteCategory;
// get the total numbe of product that gets selled from that product
//ROUTE /unStore/api/v1/category/totalSales
exports.categoryTotalAmount_TotalSum = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // all this work with the order
    // after the the order is been created then i need to get the category from that product
    const orders = yield order_model_1.default.find({}).populate([
        {
            path: "products.product",
            model: "Product",
            populate: {
                path: "category",
                model: "Category",
            },
        },
    ]);
    const products = getProductsArr(orders);
    const total = getTotlaSumAndTotalCountForEachCategory(products);
    res
        .status(200)
        .send({ totalCount: total.totalCount, totalSum: total.totalSum });
    // FIRST GET ARRAY OF THE ORDERS
    // THE OUTPUT SHOULD BE ARRAY OF ALL THE PRODUCTS ONLY
    // iwant to get array of the products
    // ineed to get the array of the products by one map not two
    // what i want to do is to get the totall selling for each category
    // i need some how to create function to do it manually
    // ineed to create function that return array of all the product
    // const products = getProducts(orders);
    // after that i need to get the category total selling
    // let totalSum = getTotalSumForEachCategory(products)
    // i need to map through the products and if the product cateogyr repeated increase the price
    // if not then i need to add it as new key
}));
// getProducts
const getProductsArr = (orders) => {
    let products = [];
    // through each order and extract array of products
    // if the array if the array is empty then add them if not then concat or spread
    orders.map((order) => {
        products = [...products, ...order.products];
    });
    return products;
};
// get the totalsum for each cateogyr
const getTotlaSumAndTotalCountForEachCategory = (products) => {
    // calculate total count of each category
    let totalSum = {};
    let totalCount = {};
    products.forEach((product) => {
        if (totalSum[`${product.product.category.name}`]) {
            // means its been repeated then i need to inc the total price for that category
            totalSum[`${product.product.category.name}`] += product.price;
        }
        else {
            totalSum[`${product.product.category.name}`] = product.price;
        }
        if (totalCount[`${product.product.category.name}`]) {
            totalCount[`${product.product.category.name}`]++;
        }
        else {
            totalCount[`${product.product.category.name}`] = 1;
        }
    });
    return { totalSum, totalCount };
};
// helper method
