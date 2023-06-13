"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = require("./../controller/category.controller");
const express_1 = require("express");
const category_controller_2 = require("../controller/category.controller");
const enums_enum_1 = require("../enum/enums.enum");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const validator_middleWare_1 = require("../middleWares/validator.middleWare");
const category_model_1 = require("../model/category.model");
const router = (0, express_1.Router)();
router
    .route("/add")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(category_model_1.categoryValidation, "post"), category_controller_2.addCategory);
router
    .route("/addSub/:id")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(category_model_1.categoryValidation, "post"), category_controller_2.addSubCategory);
router.route("/getAll").get(category_controller_2.getAllCategory);
router.route("/getAllSub/:id").get(category_controller_1.getAllSubCategories);
router
    .route("/getById/:id")
    .get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.SUB_ADMIN), category_controller_2.getCategoryById);
router
    .route("/update/:id")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), category_controller_2.updateCategory);
router
    .route("/delete/:id")
    .delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), category_controller_2.deleteCategory);
router
    .route("/totalAmount_TotalSum")
    .get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), category_controller_2.categoryTotalAmount_TotalSum);
exports.default = router;
