import { NextFunction } from "express";
import { Request, Response } from "express";
import { asyncHandler } from "../middleWares/asyncHandler";
import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import Category from "../model/category.model";
import Order from "../model/order.model";
import Product from "../model/product.model";

// add Category
//DESC: adding category for the Category
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/category/add

export const addCategory = async (req: AuthenticatedRequest, res: Response) => {
  const category_en = await Category.findOne({ name_en: req.body.name_en });
  if (category_en) {
    return res.status(400).send({
      error_en: "Category Already Exist",
      error_ar: "الفئة موجودة بالفعل",
    });
  }
  const category_ar = await Category.findOne({ name_ar: req.body.name_ar });
  if (category_ar) {
    return res.status(400).send({
      error_en: "Category Already Exist",
      error_ar: "الفئة موجودة بالفعل",
    });
  }
  const newCategory = new Category({ ...req.body });
  await newCategory.save();

  res.status(200).send({
    success_en: "Category Added Successfully",
    success_ar: "تمت إضافة الفئة بنجاح",
    category: newCategory,
  });
};
// add sub Category
//DESC: adding category for the Category
//access: private(superAdmin,admin)
//Route: post /UnStore/api/v1/category/addSub/:id
export const addSubCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const subcategory = await Category.findOne({
    name: req.body.name,
    sub: req.params.id,
  });
  if (subcategory) {
    return res.status(400).send({
      error_en: "Sub category Already Exist",
      error_ar: "الفئة الفرعيه موجودة بالفعل",
    });
  }
  const newSubCategory = new Category({ ...req.body, sub: req.params.id });
  await newSubCategory.save();

  res.status(200).send({
    success_en: "Sub category Added Successfully",
    success_ar: "تمت إضافة الفئة الفرعيه بنجاح",
    category: newSubCategory,
  });
};

// Desc: getAll The Category
//Route : /GET /unStore/api/v1/category/getAll
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
export const getAllCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // create pagination concept
    // get the total numb of docs
    // FIRST LETS CREATE ARRAY OF OBJECTS
    // ARRAY[{'WOMEN':0,TOTAL:0}]
    // GET ALL CATEGOR

    let cats: any = await Category.find({ sub: undefined });
    if (cats[0]) {
      // i should check if there is a product or not having
    }
    let stats: any = {};
    type catI = {
      name_en: string;
      name_ar: string;
    };
    cats.map((cat: catI) => {
      if (!stats[cat.name_en]) {
        stats[cat.name_en] = [0, 0];
      }
      if (!stats[cat.name_ar]) {
        stats[cat.name_ar] = [0, 0];
      }
    });
    // 2 COUNT HOW MANY PRODUCT FROM THAT CATEGORY
    const products: any = await Product.find({}).populate({
      path: "category",
      model: "Category",
    });
    products.forEach((product: any) => {
      if (product) {
        if (stats[product.category?.name]) {
          stats[product.category.name][0]++;
        }
      }
    });
    // second step is to get the total of all category
    // steps:
    // GET ALL ORDERS THEN POPULATE PRODUCT THEN POPULATE ORDERS THEN CALCULATE THE TOTAL FOR EACH PRODUCT IS BEEN SAILED
    const orders = await Order.find({}).populate([
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

    const count = await Category.find({ sub: undefined }).countDocuments();
    let page: any = req.query.page;
    let limit = 2;
    let skipLimit = (page - 1) * limit;
    let pages = Math.round(count / limit);
    if (!req.query.page) {
      limit = count;
      pages = 0;
      skipLimit = 0;
    }

    const category = await Category.find({ sub: undefined })
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
  }
);
// Desc: getAll The Category
//Route : /GET /unStore/api/v1/category/getAllSub/:id
//access: private (SUPER ADMIN,SUB ADMIN,ADMIN)
export const getAllSubCategories = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log("mohamed salah hassan", id);
    const subCategories = await Category.find({ sub: id });
    for (let index = 0; index < subCategories.length; index++) {
      const cate: any = subCategories[index];
      const count = await Product.find({ sub: cate._id });
      cate.count = count.length;
    }
    res.status(200).send({
      success_en: "Categories Fetched  Successfully",
      success_ar: "تم جلب الفئات بنجاح   ",
      subCategories,
    });
  }
);

// get the categories totalsum
const getCategoryTotalSum = (obj: any, products: any[]) => {
  products.forEach((product: any) => {
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
export const getCategoryById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const category = await Category.findById(req.params.id);
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
};

// Desc: update The Category
//Route : /Put /unStore/api/v1/category/update/:id
//access: private (SUPER ADMIN,ADMIN)

export const updateCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
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
};
// Desc: delete The Category
//Route : /DELETE /unStore/api/v1/category/getById/:id
//access: private (SUPER ADMIN,ADMIN)

export const deleteCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  // before Deleting the category you should delete all the products related to it
  const findCategoryPRoducts: any = await Product.find({
    category: req.params.id,
  }).populate({ path: "category", model: "Category" });
  const findSubRoducts: any = await Product.find({
    sub: req.params.id,
  }).populate({ path: "sub", model: "Category" });
  if (findCategoryPRoducts[0]) {
    return res.status(400).send({
      error_en: `You Cant Delete Category ${findCategoryPRoducts[0].category?.name} Untill You Remove All Products Related To It`,
      error_ar: `لا يمكنك حذف الفئة ${findCategoryPRoducts[0].category?.name} حتى تقوم بإزالة جميع المنتجات المتعلقة بها`,
    });
  } else if (findSubRoducts[0])
    return res.status(400).send({
      error_en: `You Cant Delete sub Category ${findSubRoducts[0].category?.name} Untill You Remove All Products Related To It`,
      error_ar: `لا يمكنك حذف الفئة الفرعيه${findSubRoducts[0].category?.name} حتى تقوم بإزالة جميع المنتجات المتعلقة بها`,
    });
  const category = await Category.findByIdAndDelete(req.params.id);
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
};

// get the total numbe of product that gets selled from that product
//ROUTE /unStore/api/v1/category/totalSales
export const categoryTotalAmount_TotalSum = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // all this work with the order
    // after the the order is been created then i need to get the category from that product

    const orders = await Order.find({}).populate([
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
  }
);

// getProducts
const getProductsArr = (orders: any[]) => {
  let products: any[] = [];
  // through each order and extract array of products
  // if the array if the array is empty then add them if not then concat or spread
  orders.map((order) => {
    products = [...products, ...order.products];
  });

  return products;
};
// get the totalsum for each cateogyr
const getTotlaSumAndTotalCountForEachCategory = (products: any) => {
  // calculate total count of each category
  let totalSum: any = {};
  let totalCount: any = {};
  products.forEach((product: any) => {
    if (totalSum[`${product.product.category.name}`]) {
      // means its been repeated then i need to inc the total price for that category
      totalSum[`${product.product.category.name}`] += product.price;
    } else {
      totalSum[`${product.product.category.name}`] = product.price;
    }
    if (totalCount[`${product.product.category.name}`]) {
      totalCount[`${product.product.category.name}`]++;
    } else {
      totalCount[`${product.product.category.name}`] = 1;
    }
  });
  return { totalSum, totalCount };
};

// helper method
