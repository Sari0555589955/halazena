"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const enums_enum_1 = require("../enum/enums.enum");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const router = (0, express_1.Router)();
router.route('/add').post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN), cart_controller_1.addToCart);
// router.route('/deleteItem').delete(deleteProductFromTheCart)
router.route('/getAllByUser').get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER), cart_controller_1.getCartWithUser);
router.route('/delete/:productId').delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER), cart_controller_1.deleteFromCart);
router.route("/updateQuantity/").put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER), cart_controller_1.updateQuantityInCart);
router.route('/deleteAllByUser').delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER), cart_controller_1.deleteCartByUser);
exports.default = router;
