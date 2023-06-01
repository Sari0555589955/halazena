"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const savedProduct_controller_1 = require("../controller/savedProduct.controller");
const enums_enum_1 = require("../enum/enums.enum");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const validator_middleWare_1 = require("../middleWares/validator.middleWare");
const savedProduct_1 = require("../model/savedProduct");
const router = (0, express_1.Router)();
router.route('/getAll').get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.SUB_ADMIN), savedProduct_controller_1.getAllSavedProducts);
router.route("/getByUser/:userId").get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.SUB_ADMIN), savedProduct_controller_1.getSavedProductByUser);
router.route("/add").post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(savedProduct_1.savedProductValidation, 'post'), savedProduct_controller_1.addToSavedProduct);
router.route('/delete/:productId').delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), savedProduct_controller_1.deleteProductFromTheSavedProduct);
exports.default = router;