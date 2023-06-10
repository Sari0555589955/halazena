import { Router } from "express";
import {
  addProduct,
  addRating,
  allProducts,
  deleteProduct,
  filteration,
  filterProductsByPrice,
  getAllProduct,
  getMostSellingProdcut,
  getProductById,
  getTheNewiestProducts,
  toggleCategoryToProduct,
  toggleLike,
  updateProduct,
} from "../controller/product.controller";
import { Roles } from "../enum/enums.enum";
import { Authentication } from "../middleWares/authentication.middleWare";
import { checkRole } from "../middleWares/checkRoles.middleWare";
import { validate } from "../middleWares/validator.middleWare";
import { productValidation } from "./../model/product.model";

const router: Router = Router();

router
  .route("/add/:category")
  .post(
    Authentication,
    checkRole(Roles.ADMIN, Roles.SUPER_ADMIN),
    validate(productValidation, "post"),
    addProduct
  );
router.route("/getAll/:categoryId?").get(getAllProduct);
// this one : allProducts without pagination

router.route("/allProducts").get(allProducts);
router.route("/getById/:id").get(getProductById);
router.route("/filterByPrice/:params").get(filterProductsByPrice);
router
  .route("/update/:productId")
  .put(
    Authentication,
    checkRole(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateProduct
  );
router
  .route("/delete/:id")
  .delete(
    Authentication,
    checkRole(Roles.ADMIN, Roles.SUPER_ADMIN),
    deleteProduct
  );
router
  .route("/addCategory/:productId")
  .post(
    Authentication,
    checkRole(Roles.ADMIN, Roles.SUPER_ADMIN),
    toggleCategoryToProduct
  );
router
  .route("/toggleLike/:productId")
  .put(Authentication, checkRole(Roles.USER, Roles.ADMIN), toggleLike);
router.route("/getMostSelling").get(getMostSellingProdcut);
router.route("/getNewiest").get(getTheNewiestProducts);
router
  .route("/addRating/:productId")
  .put(
    Authentication,
    checkRole(Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN),
    addRating
  );
router.route("/filter").put(filteration);
export default router;
