"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleWare_1 = require("../middleWares/validator.middleWare");
const user_model_1 = require("../model/user.model");
const user_controller_1 = require("./../controller/user.controller");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const enums_enum_1 = require("../enum/enums.enum");
const router = (0, express_1.Router)();
router.post("/register", authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(user_model_1.userValidation, "post"), user_controller_1.createUser);
router.post("/adminCreateUser", authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(user_model_1.userValidation, "post"), user_controller_1.adminCreateUser);
router.post("/login", user_controller_1.loginUser);
router.post("/adminLogin", user_controller_1.adminLogin);
router
    .route("/addUserWithRole")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(user_model_1.userValidation, "post"), user_controller_1.addUserWithRole);
router.get("/getAll/:roleType?", authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUB_ADMIN, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.getAllusers);
router.get("/getById/:userId", authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUB_ADMIN, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.getUserById);
router
    .route("/me")
    .get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.USER, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.getMe);
router
    .route("/update/:userId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN, enums_enum_1.Roles.USER), (0, validator_middleWare_1.validate)(user_model_1.userValidation, "put"), user_controller_1.updateUser);
router
    .route("/delete/:userId")
    .delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.deleteUser);
router
    .route("/delete/admin/:userId")
    .delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.deleteUser);
router
    .route("/addRole/:userId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(user_model_1.userValidation, "put"), user_controller_1.addRole);
router
    .route("/logout")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.USER, enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.userLogout);
router
    .route("/getUserAndGuestInDay")
    .get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), user_controller_1.getUserAndGuestInDay);
exports.default = router;
