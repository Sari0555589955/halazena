"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const enums_enum_1 = require("../enum/enums.enum");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const validator_middleWare_1 = require("../middleWares/validator.middleWare");
const product_model_1 = require("./../model/product.model");
const router = (0, express_1.Router)();
router
    .route("/add/:category")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(product_model_1.productValidation, "post"), product_controller_1.addProduct);
router.route("/getAll/:categoryId?").get(product_controller_1.getAllProduct);
// this one : allProducts without pagination
router.route("/allProducts").get(product_controller_1.allProducts);
router.route("/getById/:id").get(product_controller_1.getProductById);
router.route("/filterByPrice/:params").get(product_controller_1.filterProductsByPrice);
router
    .route("/update/:productId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), product_controller_1.updateProduct);
router
    .route("/delete/:id")
    .delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), product_controller_1.deleteProduct);
router
    .route("/addCategory/:productId")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), product_controller_1.toggleCategoryToProduct);
router
    .route("/toggleLike/:productId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN), product_controller_1.toggleLike);
router.route("/getMostSelling").get(product_controller_1.getMostSellingProdcut);
router.route("/getNewiest").get(product_controller_1.getTheNewiestProducts);
router
    .route("/addRating/:productId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), product_controller_1.addRating);
router.route("/filter").put(product_controller_1.filteration);
exports.default = router;
