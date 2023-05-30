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
exports.filteration = exports.getTheNewiestProducts = exports.getMostSellingProdcut = exports.changeCount = exports.addRating = exports.toggleLike = exports.toggleCategoryToProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.filterProductsByPrice = exports.allProducts = exports.getAllProduct = exports.addProduct = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const category_model_1 = __importDefault(require("../model/category.model"));
const product_model_1 = __importDefault(require("../model/product.model"));
const rating_helper_1 = require("../helper/rating.helper");
const order_model_1 = __importDefault(require("../model/order.model"));
// add Product
//DESC: adding Product for the Product
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/Product/add
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOne(Object.assign({}, req.body));
    // cant sendit in the body
    if (product) {
        return res.status(400).send({
            error_en: 'Product Already Exist',
            error_ar: 'المنتج موجود بالفعل',
        });
    }
    const newProduct = new product_model_1.default(Object.assign({}, req.body));
    // add category to the product
    if (req.params.category) {
        const isCategoryFound = yield category_model_1.default.findOne({
            name: req.params.category,
        });
        if (isCategoryFound) {
            newProduct.category = isCategoryFound;
        }
        else {
            // create new category and add it
            const newCategory = new category_model_1.default({ name: req.params.category });
            yield newCategory.save();
            newProduct.category = newCategory;
        }
    }
    yield newProduct.save();
    res.status(200).send({
        success_en: 'Product Added Successfully',
        success_ar: 'تمت إضافة الفئة بنجاح',
        product: newProduct,
    });
});
exports.addProduct = addProduct;
// Desc: getAll The Product
//Route : /GET /unStore/api/v1/product/getAll
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
exports.getAllProduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // i need to add the logic of the pagination so that the user can choose what to show
    // the logic we have number of pages and the limit and skip
    // THE PAGINATION LOGIC FOR THE PRODUCTS
    let filterationOption = {
        category: req.params.categoryId,
        sub: req.query.sub,
    };
    !req.query.sub && delete filterationOption.sub;
    !req.params.categoryId && delete filterationOption.category;
    console.log(filterationOption);
    const productLength = yield product_model_1.default.find(filterationOption).countDocuments();
    let page = req.query.page || 1;
    // lets get the number of pages
    let limit = 10;
    let skipLimit = (page - 1) * limit;
    if (!req.query.page) {
        limit = 0;
        page = 0;
    }
    const pages = Math.ceil(productLength / limit);
    // i want to get the pcategory type so that i cant filter by it
    // i need to filter by the category
    const products = yield product_model_1.default.find(filterationOption)
        .populate([{ path: 'category', model: 'Category' }])
        .skip(skipLimit)
        .limit(limit);
    if (!products[0]) {
        return res.status(400).send({
            error_en: 'Products Are Not Found',
            error_ar: 'لم يتم العثور على المنتجات',
        });
    }
    // product.find().skip(limit).limit()
    res.status(200).send({
        success_en: 'Product Fetched  Successfully',
        success_ar: 'تم جلب المنتج بنجاح  ',
        products: { count: products.length, products, pages },
    });
}));
//Desc : GetAllProducts Without Pagination
//Route /GET/ unStore/api/vq/product/allProducts
exports.allProducts = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({}).populate([
        { path: 'category', model: 'Category' },
    ]);
    if (!products[0]) {
        return res.status(200).send({
            error_en: 'Products are not Found',
            error_ar: 'لم يتم العثور على المنتجات',
        });
    }
    res.status(200).send({
        success_en: 'Products Are Fetched Successfully',
        success_ar: 'تم جلب المنتجات بنجاح',
        count: products.length,
        products,
    });
}));
//DESC/ sort product by price accending or decending
//Route GET/unStore/api/v1/product/params:/params
exports.filterProductsByPrice = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // adding the pagination
    const count = yield product_model_1.default.find({}).countDocuments();
    let page = req.query.page;
    let limit = 2;
    let skipLimit = (page - 1) * limit;
    let pages = Math.round(count / limit);
    if (!req.query.page) {
        limit = count;
        skipLimit = 0;
        pages = 0;
    }
    const products = yield product_model_1.default.find({})
        .sort(req.params.params == 'lowest' ? 'price' : '-price')
        .skip(skipLimit)
        .limit(limit);
    if (!products[0]) {
        return res.status(400).send({
            error_en: 'Products Are Not Found',
            error_ar: 'لم يتم العثور على المنتجات',
        });
    }
    res.status(200).send({
        success_en: 'Products Are Fetched Successfully',
        success_ar: 'تم جلب المنتجات بنجاح',
        products,
        count: pages,
    });
}));
// Desc: getAll The Product
//Route : /GET /unStore/api/v1/product/getById/:id
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN,User)
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(req.params.id).populate([
        { path: 'category', model: 'Category' },
        { path: 'sub', model: 'Category' },
        //1 means select=true -1 means remove
        { path: 'likes.user', model: 'User', select: { fullName_en: 1 } },
    ]);
    if (!product) {
        return res.status(400).send({
            error_en: 'product is Not Found',
            error_ar: 'المنتج غير موجود',
        });
    }
    res.status(200).send({
        success_en: 'Product Fetched  Successfully',
        success_ar: 'تم جلب المنتج بنجاح  ',
        product,
    });
});
exports.getProductById = getProductById;
// Desc: update The Product
//Route : /Put /unStore/api/v1/product/update/:id
//access: private (SUPER ADMIN,ADMIN)
exports.updateProduct = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cant update category for the product
    let { category } = req.body;
    let foundCategory;
    if (category) {
        // means need to update category
        foundCategory = yield category_model_1.default.findOne({ name: req.body.category });
    }
    const updateProduct = yield product_model_1.default.findByIdAndUpdate(req.params.productId, Object.assign(Object.assign({}, req.body), { category: foundCategory === null || foundCategory === void 0 ? void 0 : foundCategory._id }), { new: true });
    // i need to update product category id
    if (!updateProduct) {
        return res.status(400).send({
            error_en: 'Product is Not Found',
            error_ar: 'المنتج غير موجود',
        });
    }
    res.status(200).send({
        success_en: 'Product Updated  Successfully',
        success_ar: 'تم تحديث المنتج بنجاح  ',
        updateProduct,
    });
}));
// Desc: delete The Product
//Route : /DELETE /unStore/api/v1/Product/getById/:id
//access: private (SUPER ADMIN,ADMIN)
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield product_model_1.default.findOneAndDelete({ _id: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    if (!product_model_1.default) {
        return res.status(400).send({
            error_en: 'product is Not Found',
            error_ar: 'لم يتم العثور على المنتج',
        });
    }
    // check if that was the only product or not
    res.status(200).send({
        success_en: 'Product Deleted  Successfully',
        success_ar: 'تم حذف المنتج بنجاح ',
        product,
    });
});
exports.deleteProduct = deleteProduct;
//Add Category to Specific Product
//Route: /post /unStore/api/v1/product/addCategory/:productId
//access : Private(super admin,admin)
const toggleCategoryToProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { name } = req.body;
    // if the category exist added directly to the product
    // other wise add to the category then updated
    const toggleProduct = (category) => __awaiter(void 0, void 0, void 0, function* () {
        const toggledProduct = yield product_model_1.default.findByIdAndUpdate(productId, {
            $set: { category: category._id },
        }).populate({
            path: 'category',
            model: 'Category',
        });
        if (!toggledProduct) {
            return res.status(400).send({
                error_en: 'product is not found',
                error_ar: 'لم يتم العثور على المنتج',
            });
        }
        res.status(200).send({
            success_en: 'category is added to the product successfully',
            success_ar: 'تمت إضافة الفئة إلى المنتج بنجاح',
            toggledProduct,
        });
    });
    const isCategoryExist = (name) => __awaiter(void 0, void 0, void 0, function* () {
        const foundCategory = yield category_model_1.default.findOne({ name });
        return foundCategory ? foundCategory : false;
    });
    // start use the condition
    isCategoryExist(name).then((value) => {
        if (value) {
            toggleProduct(value);
        }
        else {
            const newCategory = new category_model_1.default(Object.assign({}, req.body));
            newCategory.save();
            toggleProduct(newCategory);
        }
    });
});
exports.toggleCategoryToProduct = toggleCategoryToProduct;
// toggle like on the product to added in the saved items
// ROUTE : /POST /UNSTORE/API/V1/PRODUCT/TOGGLELIKE/:PRODUCTID
exports.toggleLike = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const foundLike = yield product_model_1.default.findOne({ _id: req.params.productId });
    if (!foundLike) {
        return res.status(400).send({
            error_en: 'Cant Find Product TO Like',
            error_ar: 'لا يمكن العثور على المنتج الذي يعجبك',
        });
    }
    if (foundLike) {
        // means need to be pulled from the array
        const checkLike = yield product_model_1.default.findOne({
            _id: foundLike === null || foundLike === void 0 ? void 0 : foundLike._id,
            'likes.user': (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
        });
        if (checkLike) {
            const like = yield product_model_1.default.findOneAndUpdate({ _id: req.params.productId, 'likes.user': (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id }, {
                $pull: { likes: { user: req.user._id } },
            }, { new: true });
            res.status(200).send({
                success_en: 'Product UnLiked Successfully',
                error_ar: 'تم إلغاء إعجاب المنتج بنجاح',
                like,
                status: 'unlike',
            });
        }
        else {
            // means need to push new like for the product
            const like = yield product_model_1.default.findOneAndUpdate({ _id: req.params.productId }, {
                $push: { likes: { user: req.user._id } },
            }, { new: true });
            res.status(200).send({
                success_en: 'like added Successfully to the product',
                success_ar: 'مثل الإضافة بنجاح إلى المنتج',
                like,
                status: 'like',
            });
        }
    }
}));
//DESC: ADD RATING FOR THE PRODUCT
//ROUTE : /PUT /UNSTORE/API/V1/PRODUCT/ADDRATING/:PRODUCTID
// this add rating should add or update the rating if from the same user
// if from different user it should get pushed to the array of ratings
exports.addRating = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const checkIFProdcutExist = (product: IProduct | null) => {
    //     if (!product) {
    //         return res.status(400).send({ error_en: 'Product is not Found', error_ar: 'لم يتم العثور على المنتج' })
    //     }
    //     res.status(200).send({ success_en: 'product updated successfully ', success_ar: 'تم تحديث المنتج بنجاح  ', product })
    // }
    // check if the there is rating from the same user
    const productRating = yield product_model_1.default.findOneAndUpdate({ _id: req.params.productId, 'ratings.user': req.user._id }, {
        $set: { 'ratings.$.rating': req.body.rating },
    }, { new: true });
    if (productRating) {
        // means i need to update the avgRating and the noOfreviews
        const productReviews = yield product_model_1.default.findByIdAndUpdate(req.params.productId, {
            $set: {
                avgRating: (0, rating_helper_1.ratingHelper)([
                    ...productRating.ratings.map((ele) => ele.rating),
                ]),
            },
        }, { new: true });
        if (!productReviews) {
            return res.status(400).send({
                error_en: 'Cant Update Rating of Product',
                error_ar: 'غير قادر على تحديث تصنيف المنتج',
            });
        }
        res.status(200).send({
            success_en: 'rating updated Successfully ',
            success_ar: 'تم تحديث التصنيف بنجاح',
            product: productReviews,
        });
    }
    else {
        // means this is new Rating and we need to push it
        const newProductRating = yield product_model_1.default.findById(req.params.productId);
        const ratings = newProductRating === null || newProductRating === void 0 ? void 0 : newProductRating.ratings;
        const reviews = newProductRating === null || newProductRating === void 0 ? void 0 : newProductRating.reviews;
        const addRating = yield product_model_1.default.findByIdAndUpdate(req.params.productId, {
            $push: { ratings: { user: req.user._id, rating: req.body.rating } },
            $set: {
                reviews: reviews + 1,
                avgRating: (0, rating_helper_1.ratingHelper)([
                    ...ratings.map((ele) => ele.rating),
                    req.body.rating,
                ]),
            },
        }, { new: true });
        res.status(200).send({
            success_en: 'rating is been added successfully',
            success_ar: 'تمت إضافة التصنيف بنجاح',
            product: addRating,
        });
    }
}));
// UPDATE THE NUMBER OF PRODUCTS FOR EACH PRODUCT
// ROUTE: PUT/UNSTORE/API/V1/PRODUCT/COUNT/:PRODUCTID
//ACCESS: PUBLIC FOR THE USER AND ANY ONE ELSE
exports.changeCount = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProductCount = yield product_model_1.default.findByIdAndUpdate(req.params.productId, {
        $set: { count: req.body.count },
    });
}));
// get the most selling products
// ROUTE /GET /UNSTORE/API/V1/PRODUCT/MOSTSELLING/PRODUCTID
// ACCESS : PUBLIC
// done
const getMostSellingProdcut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // we can get the most selling product by getting from the cart and then sort it
    // I NEED TO GET THE MOST SELLING PRODUCT BY THE PURCHASED nestedArr
    // FIRST I NEED TO GET ALL THE ORDERS THEN GET ALL THE PRODUCTS OUT OF IT THEN I NEED TO SOR IT BASED ON THE HOW MANY QUANTTIY
    //
    const orders = yield order_model_1.default.find({}).populate([
        {
            path: 'products.product',
            model: 'Product',
            populate: [{ path: 'category', model: 'Category' }],
        },
        { path: 'products.user', model: 'User' },
    ]);
    // then lets get array of all the products
    let products = getProductsArray(orders);
    // now i have the array of products i need to get homany total number of pecic of each product
    products = sortArrayByKey(products, 'Quantity');
    if (!products[0]) {
        return res.status(400).send({
            error_en: 'Products Are Not Found ',
            error_ar: 'لم يتم العثور على المنتجات',
        });
    }
    res.status(200).send({
        success_en: 'Products Fetched Successfully',
        success_ar: 'تم جلب المنتجات بنجاح',
        products,
    });
    // all i have to do is to sort them based on Quantity
    // THE NEXT STEP IS TO SORT THE DATA BASED ON THE QUANTITY
    // LETS SORT
});
exports.getMostSellingProdcut = getMostSellingProdcut;
//HELPER
//INPUT ARRAY OF NESTED ARRAY OF PRODUCTS
// OUTPUT ARRAY OF PRODUCTS
const getProductsArray = (nestedArr) => {
    let products = [];
    nestedArr.map((arr) => {
        // should get Array of Only New Products
        products = [...products, ...arr.products];
    });
    return products;
};
// SORT BYKEY
const sortArrayByKey = (arr, key) => {
    return arr.sort(function (a, b) {
        let x = a[key], y = b[key];
        return x > y ? -1 : x < y ? 1 : 0;
    });
};
// get the newies products
// ROUTE /GET /UNSTORE/API/V1/PRODUCT/NEWIEST/PRODUCTID
// ACCESS : PUBLIC
//done
const getTheNewiestProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({})
        .sort('-createdAt')
        .populate([{ path: 'category', model: 'Category' }]);
    if (!products[0]) {
        return res.status(400).send({
            error_en: 'Products Are Not Found',
            error_ar: 'لم يتم العثور على المنتجات',
        });
    }
    res.status(200).send({
        success_en: 'newiest Products Are Fetched Successfully',
        success_ar: 'أحدث المنتجات التي تم جلبها بنجاح',
        count: products.length,
        products,
    });
});
exports.getTheNewiestProducts = getTheNewiestProducts;
// the only that left is the filteration and the pagination
// i dont know how to make this filteration dynamic
const filteration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // specific only for price
    let price = {};
    if (req.body.price) {
        price['price'] = req.body.price;
        delete body['price'];
    }
    const query = req.query;
    const keysArr = Object.keys(query);
    const valuesArr = Object.values(query);
    let attributes = {};
    keysArr.map((key, index) => {
        // specific only for array keys
        //so that we have the following
        // match { size_en: 'large', color_en: 'red' }
        //to {"attributes.size_en":large,"attributes.color_en:red"}
        attributes[`attributes.${key}`] = valuesArr[index];
    });
    // now to check for the filteration if it's gonna work or not
    //price match if exist
    const products = yield product_model_1.default.aggregate([
        { $match: {} },
        { $match: Object.assign({}, price) },
        { $match: Object.assign({}, body) },
        { $match: Object.assign({}, attributes) },
    ]);
});
exports.filteration = filteration;
