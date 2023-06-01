import { Request, Response } from 'express'
import { asyncHandler } from '../middleWares/asyncHandler';
import { AuthenticatedRequest } from '../middleWares/authentication.middleWare'
import Product from '../model/product.model';
import SavedProduct from '../model/savedProduct';
import User from '../model/user.model';


export const addToSavedProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    // check if cart is not exist create it 

    // check if there is a cart or not 






    // adding new one 
    const isExist = await SavedProduct.findOne({ product: req.body.product, user: req.user._id }).populate([
        { path: "product", model: "Product" },
        { path: 'user', model: 'User' }
    ])
    if (isExist) {
        const savedDeleted = await SavedProduct.findByIdAndDelete(isExist._id)
        if (savedDeleted) {
            return res.status(200).send({ success_en: 'Deleted from the Whishing List Successfully', error_ar: 'تم الحذف من القائمة المحفوظة بنجاح', action: 'deleted' })
        }

    }
    const newSavedProduct = new SavedProduct({ product: req.body.product, user: req.user._id })
    await newSavedProduct.save()
    const foundSavedProduct = await SavedProduct.findById(newSavedProduct._id).populate([
        { path: "product", model: "Product" },
        { path: "user", model: "User" }
    ])

    res.status(200).send({ success_en: "product added to Saved Products", success_ar: 'تمت إضافة المنتج إلى المنتج المحفوظ', newSavedProduct: foundSavedProduct, action: 'added' })








})


// get all the saved products for specific user 
// ROUTE /GET /unStore/api/v1/savedProduct/getAll
//ACCESS:PRIVATE(SUPERADMIN,ADMIN,SUBADMIN,USER)
export const getAllSavedProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const foundUser: any = req.user
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
    const savedProducts = await SavedProduct.find({ user: foundUser._id }).populate([
        { path: 'product', model: 'Product' }
    ])
    if (!savedProducts[0]) {
        return res.status(400).send({ error_en: "Saved Products Are Not Found", error_ar: 'لم يتم العثور على المنتجات المحفوظة' })
    }
    res.status(200).send({ success_en: "Saved Products Are Fetched Successfully", success_ar: "تم جلب المنتجات المحفوظة بنجاح", products: savedProducts, count: savedProducts.length })
})

export const getSavedProductByUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const savedProducts = await SavedProduct.find({ user: req.body.user }).populate('product')
    if (!savedProducts[0]) {
        return res.status(400).send({ error_en: "Products are not found", error_ar: "لم يتم العثور على المنتجات" })
    }
    res.status(200).send({ success_en: "Products fetched from saved Products ", success_ar: "تم جلب المنتجات من المنتجات المحفوظة", savedProducts })

})
export const deleteProductFromTheSavedProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    // make sure to only delete the products for the loged in user 
    const foundUser = req.user

    // 
    const product = await SavedProduct.findOneAndDelete({ user: foundUser?._id, product: req.params.productId })
    if (!product) {
        return res.status(400).send({ error_en: "Product Can't Be Deleted ", error_ar: 'لا يمكن حذف المنتج' })
    }
    // lets delete the product from the saved product 


    res.status(200).send({ success_en: "Product Deleted Successfully from the saved Products", success_ar: 'تم حذف المنتج بنجاح من المنتجات المحفوظة' })
})


