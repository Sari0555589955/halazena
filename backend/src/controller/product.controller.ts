import { json, Request, Response } from "express";
import { asyncHandler } from "../middleWares/asyncHandler";
import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import Category, { ICategory } from "../model/category.model";
import Product, { IProduct } from "../model/product.model";
import { ratingHelper } from "../helper/rating.helper";
import Order from "../model/order.model";

// add Product
//DESC: adding Product for the Product
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/Product/add

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
  const product = await Product.findOne({ ...req.body });
  // cant sendit in the body
  if (product) {
    return res.status(400).send({
      error_en: "Product Already Exist",
      error_ar: "المنتج موجود بالفعل",
    });
  }
  const newProduct = new Product({ ...req.body });
  // add category to the product
  if (req.params.category) {
    const isCategoryFound: any = await Category.findOne({
      name: req.params.category,
    });
    if (isCategoryFound) {
      newProduct.category = isCategoryFound;
    } else {
      // create new category and add it
      const newCategory: any = new Category({ name_en: req.params.category });
      await newCategory.save();
      newProduct.category = newCategory;
    }
  }
  await newProduct.save();
  res.status(200).send({
    success_en: "Product Added Successfully",
    success_ar: "تمت إضافة المنتج بنجاح",
    product: newProduct,
  });
};
// Desc: getAll The Product
//Route : /GET /unStore/api/v1/product/getAll
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
export const getAllProduct = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // i need to add the logic of the pagination so that the user can choose what to show
    // the logic we have number of pages and the limit and skip
    // THE PAGINATION LOGIC FOR THE PRODUCTS
    let filterationOption: any = {
      category: req.params.categoryId,
      sub: req.query.sub,
    };

    !req.query.sub && delete filterationOption.sub;
    !req.params.categoryId && delete filterationOption.category;
    console.log(filterationOption);

    const productLength = await Product.find(
      filterationOption
    ).countDocuments();
    let page: number | any = req.query.page || 1;
    // lets get the number of pages
    let limit: number = 10;
    let skipLimit = (page - 1) * limit;
    if (!req.query.page) {
      limit = 0;
      page = 0;
    }
    const pages = Math.ceil(productLength / limit);

    // i want to get the pcategory type so that i cant filter by it

    // i need to filter by the category

    const products = await Product.find(filterationOption)
      .populate([{ path: "category", model: "Category" }])
      .skip(skipLimit)
      .limit(limit);

    if (!products[0]) {
      return res.status(400).send({
        error_en: "Products Are Not Found",
        error_ar: "لم يتم العثور على المنتجات",
      });
    }

    // product.find().skip(limit).limit()

    res.status(200).send({
      success_en: "Product Fetched  Successfully",
      success_ar: "تم جلب المنتج بنجاح  ",
      products: { count: products.length, products, pages },
    });
  }
);

//Desc : GetAllProducts Without Pagination
//Route /GET/ unStore/api/vq/product/allProducts
export const allProducts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const products = await Product.find({}).populate([
      { path: "category", model: "Category" },
    ]);

    if (!products[0]) {
      return res.status(200).send({
        error_en: "Products are not Found",
        error_ar: "لم يتم العثور على المنتجات",
      });
    }
    res.status(200).send({
      success_en: "Products Are Fetched Successfully",
      success_ar: "تم جلب المنتجات بنجاح",
      count: products.length,
      products,
    });
  }
);

//DESC/ sort product by price accending or decending
//Route GET/unStore/api/v1/product/params:/params
export const filterProductsByPrice = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // adding the pagination
    const count = await Product.find({}).countDocuments();
    let page: any = req.query.page;
    let limit = 2;
    let skipLimit = (page - 1) * limit;
    let pages: any = Math.round(count / limit);
    if (!req.query.page) {
      limit = count;
      skipLimit = 0;
      pages = 0;
    }

    const products = await Product.find({})
      .sort(req.params.params == "lowest" ? "price" : "-price")
      .skip(skipLimit)
      .limit(limit);
    if (!products[0]) {
      return res.status(400).send({
        error_en: "Products Are Not Found",
        error_ar: "لم يتم العثور على المنتجات",
      });
    }
    res.status(200).send({
      success_en: "Products Are Fetched Successfully",
      success_ar: "تم جلب المنتجات بنجاح",
      products,
      count: pages,
    });
  }
);
// Desc: getAll The Product
//Route : /GET /unStore/api/v1/product/getById/:id
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN,User)
export const getProductById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const product = await Product.findById(req.params.id).populate([
    { path: "category", model: "Category" },
    { path: "sub", model: "Category" },
    //1 means select=true -1 means remove
    { path: "likes.user", model: "User", select: { fullName_en: 1 } },
  ]);
  if (!product) {
    return res.status(400).send({
      error_en: "product is Not Found",
      error_ar: "المنتج غير موجود",
    });
  }

  res.status(200).send({
    success_en: "Product Fetched  Successfully",
    success_ar: "تم جلب المنتج بنجاح  ",
    product,
  });
};

// Desc: update The Product
//Route : /Put /unStore/api/v1/product/update/:id
//access: private (SUPER ADMIN,ADMIN)

export const updateProduct = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // cant update category for the product
    let { category } = req.body;
    let foundCategory;
    if (category) {
      // means need to update category
      foundCategory = await Category.findOne({ name_ar: req.body.category });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { ...req.body, category: foundCategory?._id },
      { new: true }
    );

    // i need to update product category id

    if (!updateProduct) {
      return res.status(400).send({
        error_en: "Product is Not Found",
        error_ar: "المنتج غير موجود",
      });
    }

    res.status(200).send({
      success_en: "Product Updated  Successfully",
      success_ar: "تم تحديث المنتج بنجاح  ",
      updateProduct,
    });
  }
);
// Desc: delete The Product
//Route : /DELETE /unStore/api/v1/Product/getById/:id
//access: private (SUPER ADMIN,ADMIN)

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const product = await Product.findOneAndDelete({ _id: req.params?.id });
  if (!Product) {
    return res.status(400).send({
      error_en: "product is Not Found",
      error_ar: "لم يتم العثور على المنتج",
    });
  }
  // check if that was the only product or not

  res.status(200).send({
    success_en: "Product Deleted  Successfully",
    success_ar: "تم حذف المنتج بنجاح ",
    product,
  });
};

//Add Category to Specific Product
//Route: /post /unStore/api/v1/product/addCategory/:productId
//access : Private(super admin,admin)

export const toggleCategoryToProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId } = req.params;
  const { name } = req.body;
  // if the category exist added directly to the product
  // other wise add to the category then updated
  const toggleProduct = async (category: ICategory) => {
    const toggledProduct = await Product.findByIdAndUpdate(productId, {
      $set: { category: category._id },
    }).populate({
      path: "category",
      model: "Category",
    });
    if (!toggledProduct) {
      return res.status(400).send({
        error_en: "product is not found",
        error_ar: "لم يتم العثور على المنتج",
      });
    }
    res.status(200).send({
      success_en: "category is added to the product successfully",
      success_ar: "تمت إضافة الفئة إلى المنتج بنجاح",
      toggledProduct,
    });
  };
  const isCategoryExist = async (name: string) => {
    const foundCategory = await Category.findOne({ name });
    return foundCategory ? foundCategory : false;
  };
  // start use the condition
  isCategoryExist(name).then((value) => {
    if (value) {
      toggleProduct(value);
    } else {
      const newCategory = new Category({ ...req.body });
      newCategory.save();
      toggleProduct(newCategory);
    }
  });
};

// toggle like on the product to added in the saved items
// ROUTE : /POST /UNSTORE/API/V1/PRODUCT/TOGGLELIKE/:PRODUCTID
export const toggleLike = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundLike = await Product.findOne({ _id: req.params.productId });
    if (!foundLike) {
      return res.status(400).send({
        error_en: "Cant Find Product TO Like",
        error_ar: "لا يمكن العثور على المنتج الذي يعجبك",
      });
    }
    if (foundLike) {
      // means need to be pulled from the array
      const checkLike = await Product.findOne({
        _id: foundLike?._id,
        "likes.user": req?.user?._id,
      });
      if (checkLike) {
        const like = await Product.findOneAndUpdate(
          { _id: req.params.productId, "likes.user": req?.user?._id },
          {
            $pull: { likes: { user: req.user._id } },
          },
          { new: true }
        );
        res.status(200).send({
          success_en: "Product UnLiked Successfully",
          error_ar: "تم إلغاء إعجاب المنتج بنجاح",
          like,
          status: "unlike",
        });
      } else {
        // means need to push new like for the product
        const like: any = await Product.findOneAndUpdate(
          { _id: req.params.productId },
          {
            $push: { likes: { user: req.user._id } },
          },
          { new: true }
        );
        res.status(200).send({
          success_en: "like added Successfully to the product",
          success_ar: "مثل الإضافة بنجاح إلى المنتج",
          like,
          status: "like",
        });
      }
    }
  }
);

//DESC: ADD RATING FOR THE PRODUCT
//ROUTE : /PUT /UNSTORE/API/V1/PRODUCT/ADDRATING/:PRODUCTID
// this add rating should add or update the rating if from the same user
// if from different user it should get pushed to the array of ratings
export const addRating = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // const checkIFProdcutExist = (product: IProduct | null) => {
    //     if (!product) {

    //         return res.status(400).send({ error_en: 'Product is not Found', error_ar: 'لم يتم العثور على المنتج' })
    //     }

    //     res.status(200).send({ success_en: 'product updated successfully ', success_ar: 'تم تحديث المنتج بنجاح  ', product })

    // }
    // check if the there is rating from the same user
    const productRating = await Product.findOneAndUpdate(
      { _id: req.params.productId, "ratings.user": req.user._id },
      {
        $set: { "ratings.$.rating": req.body.rating },
      },
      { new: true }
    );

    if (productRating) {
      // means i need to update the avgRating and the noOfreviews
      const productReviews = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          $set: {
            avgRating: ratingHelper([
              ...productRating.ratings.map((ele: any) => ele.rating),
            ]),
          },
        },
        { new: true }
      );
      if (!productReviews) {
        return res.status(400).send({
          error_en: "Cant Update Rating of Product",
          error_ar: "غير قادر على تحديث تصنيف المنتج",
        });
      }
      res.status(200).send({
        success_en: "rating updated Successfully ",
        success_ar: "تم تحديث التصنيف بنجاح",
        product: productReviews,
      });
    } else {
      // means this is new Rating and we need to push it
      const newProductRating = await Product.findById(req.params.productId);
      const ratings: any = newProductRating?.ratings;
      const reviews: any = newProductRating?.reviews;
      const addRating = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          $push: { ratings: { user: req.user._id, rating: req.body.rating } },
          $set: {
            reviews: reviews + 1,
            avgRating: ratingHelper([
              ...ratings.map((ele: any) => ele.rating),
              req.body.rating,
            ]),
          },
        },
        { new: true }
      );
      res.status(200).send({
        success_en: "rating is been added successfully",
        success_ar: "تمت إضافة التصنيف بنجاح",
        product: addRating,
      });
    }
  }
);

// UPDATE THE NUMBER OF PRODUCTS FOR EACH PRODUCT
// ROUTE: PUT/UNSTORE/API/V1/PRODUCT/COUNT/:PRODUCTID
//ACCESS: PUBLIC FOR THE USER AND ANY ONE ELSE
export const changeCount = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const updatedProductCount = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: { count: req.body.count },
      }
    );
  }
);
// get the most selling products
// ROUTE /GET /UNSTORE/API/V1/PRODUCT/MOSTSELLING/PRODUCTID
// ACCESS : PUBLIC
// done
export const getMostSellingProdcut = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  // we can get the most selling product by getting from the cart and then sort it
  // I NEED TO GET THE MOST SELLING PRODUCT BY THE PURCHASED nestedArr
  // FIRST I NEED TO GET ALL THE ORDERS THEN GET ALL THE PRODUCTS OUT OF IT THEN I NEED TO SOR IT BASED ON THE HOW MANY QUANTTIY
  //
  const orders = await Order.find({}).populate([
    {
      path: "products.product",
      model: "Product",
      populate: [{ path: "category", model: "Category" }],
    },
    { path: "products.user", model: "User" },
  ]);
  // then lets get array of all the products
  let products = getProductsArray(orders);

  // now i have the array of products i need to get homany total number of pecic of each product
  products = sortArrayByKey(products, "Quantity");
  if (!products[0]) {
    return res.status(400).send({
      error_en: "Products Are Not Found ",
      error_ar: "لم يتم العثور على المنتجات",
    });
  }
  res.status(200).send({
    success_en: "Products Fetched Successfully",
    success_ar: "تم جلب المنتجات بنجاح",
    products,
  });

  // all i have to do is to sort them based on Quantity
  // THE NEXT STEP IS TO SORT THE DATA BASED ON THE QUANTITY
  // LETS SORT
};

//HELPER
//INPUT ARRAY OF NESTED ARRAY OF PRODUCTS
// OUTPUT ARRAY OF PRODUCTS
const getProductsArray = (nestedArr: any) => {
  let products: any = [];
  nestedArr.map((arr: any) => {
    // should get Array of Only New Products
    products = [...products, ...arr.products];
  });
  return products;
};

// SORT BYKEY
const sortArrayByKey = (arr: any[], key: any) => {
  return arr.sort(function (a: any, b: any) {
    let x = a[key],
      y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
};
// get the newies products
// ROUTE /GET /UNSTORE/API/V1/PRODUCT/NEWIEST/PRODUCTID
// ACCESS : PUBLIC
//done
export const getTheNewiestProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const products = await Product.find({})
    .sort("-createdAt")
    .populate([{ path: "category", model: "Category" }]);
  if (!products[0]) {
    return res.status(400).send({
      error_en: "Products Are Not Found",
      error_ar: "لم يتم العثور على المنتجات",
    });
  }

  res.status(200).send({
    success_en: "newiest Products Are Fetched Successfully",
    success_ar: "أحدث المنتجات التي تم جلبها بنجاح",
    count: products.length,
    products,
  });
};

// the only that left is the filteration and the pagination
// i dont know how to make this filteration dynamic

export const filteration = async (req: AuthenticatedRequest, res: Response) => {
  const body = req.body;
  // specific only for price
  let price: any = {};

  if (req.body.price) {
    price["price"] = req.body.price;
    delete body["price"];
  }
  const query = req.query;
  const keysArr = Object.keys(query);
  const valuesArr = Object.values(query);
  let attributes: any = {};
  keysArr.map((key, index) => {
    // specific only for array keys
    //so that we have the following
    // match { size_en: 'large', color_en: 'red' }
    //to {"attributes.size_en":large,"attributes.color_en:red"}
    attributes[`attributes.${key}`] = valuesArr[index];
  });

  // now to check for the filteration if it's gonna work or not

  //price match if exist
  const products = await Product.aggregate([
    { $match: {} },
    { $match: { ...price } },
    { $match: { ...body } },
    { $match: { ...attributes } },
  ]);
};
