import { asyncHandler } from "../middleWares/asyncHandler";
import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import Cart from "../model/cart.model";
import User from "../model/user.model";
import { Response, NextFunction } from "express";

export const addToCart = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundUser = req.user;
    // after finding the user lets use it to check for the cart items
    if (foundUser && foundUser._id) {
      // check if product already in cart
      const isProductInCart = await Cart.findOne({
        user: foundUser._id,
        product: req.body.product,
      });
      if (isProductInCart) {
        const productExistinCart = await Cart.findByIdAndDelete(
          isProductInCart._id
        );
        if (productExistinCart)
          return res.status(200).send({
            success_en: "product Removed From Cart Successfully",
            success_ar: "تمت إزالة المنتج من سلة التسوق بنجاح",
            cartItem: productExistinCart,
          });
      }
      const saveToCart: any = new Cart({ ...req.body, user: foundUser._id });
      await saveToCart.save();
      const cartProduct = await Cart.findById(saveToCart._id).populate({
        path: "product",
        model: "Product",
      });
      res.status(200).send({
        success_en: "Product Saved To Cart Successfully",
        success_ar: "تم حفظ المنتج في عربة التسوق بنجاح",
        cartItem: cartProduct,
        status: "added",
      });
      // lets updated it again
    }
  }
);
export const updateQuantityInCart = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundUser = req.user;
    let updateQuantity: any;
    if (foundUser) {
      if (req.body.Quantity) {
        console.log("userQuantity: ", foundUser?._id);
        console.log("productQuantity: ", req.body.product);
        updateQuantity = await Cart.findOneAndUpdate(
          { user: foundUser._id, product: req.body.product },
          {
            $set: { Quantity: req.body.Quantity },
          },
          { new: true }
        ).populate({ path: "product", model: "Product" });
        console.log("updateQuantity: ", updateQuantity);
      } else {
        return res.status(400).send({
          error_en: "Quantity Required To Update the product Quantity",
          error_ar: "الكمية مطلوبة لتحديث كمية المنتج",
        });
      }
      // update the price manualy
      if (updateQuantity) {
        updateQuantity.price =
          updateQuantity.product.price * updateQuantity.Quantity;
      } else {
        return res.status(400).send({
          error_en: "Cant Update Product in Cart Cause Product Not Found",
          error_ar: "تعذر تحديث المنتج في سلة التسوق سبب عدم العثور على المنتج",
        });
      }
      res.status(200).send({
        success_en: "Product Quantity updated Successfully in Cart",
        success_ar: "تم تحديث كمية المنتج بنجاح في سلة التسوق",
        cartItem: updateQuantity,
      });
    } else {
      return res.status(400).send({
        error_en: "Cant Updated The product In Cart Without Quantity",
        error_ar: "لا يمكن تحديث المنتج في سلة التسوق بدون الكمية",
      });
    }
  }
);
export const deleteFromCart = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundUser = req.user;
    if (foundUser && foundUser._id) {
      const cart = await Cart.findOneAndDelete({
        user: foundUser,
        product: req.params.productId,
      });
      if (!cart) {
        return res.status(400).send({
          error_en: "Cant Delete BeCause Product its not in the cart",
          error_ar: "لا يمكن الحذف لأن المنتج ليس في سلة التسوق",
        });
      }
      res.status(200).send({
        success_en: "Deleted From Cart Successfully",
        success_ar: "تم الحذف من العربة بنجاح",
      });
    }
  }
);
// get all the product in the cart for specific user \
// ROUTE /GET /unStore/api/v1/cart/getAllByUser
//access public
export const getCartWithUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const foundUser = req.user;
    const carts = await Cart.find({});
    if (foundUser && carts[0]) {
      const productsInCart = await Cart.find({ user: foundUser._id }).populate(
        "product"
      );
      if (!productsInCart[0]) {
        return res.status(400).send({
          error_en: "Cant find Product in Cart",
          error_ar: "غير قادر على العثور على المنتجات في سلة التسوق",
        });
      }
      // get all the products then get all the summ of the categories

      res.status(200).send({
        success_en: "The remaining products in cart ",
        success_ar: "المنتجات المتبقية في عربة التسوق",
        cart: productsInCart,
      });
    } else {
      return res
        .status(400)
        .send({ error_en: "Cart Is Empty: ", error_ar: "السلة فارغة" });
    }
  }
);
export const deleteCartByUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundUser: any = await User.findById(req.user._id);

    const cart = await Cart.deleteMany({ user: foundUser._id });
    if (!cart) {
      res.status(400).send({
        error_en: "Cart Is Already Empty",
        error_ar: "عربة التسوق فارغة بالفعل",
      });
    }
    res.status(200).send({
      success_en: "Cart is deleted Successfully ",
      success_ar: "تم حذف سلة التسوق بنجاح",
    });
  }
);
