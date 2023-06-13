"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const section_controller_1 = require("../controller/section.controller");
const enums_enum_1 = require("../enum/enums.enum");
const authentication_middleWare_1 = require("../middleWares/authentication.middleWare");
const checkRoles_middleWare_1 = require("../middleWares/checkRoles.middleWare");
const validator_middleWare_1 = require("../middleWares/validator.middleWare");
const section_model_1 = require("../model/section.model");
const router = (0, express_1.Router)();
router
    .route("/add")
    .post(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(section_model_1.sectionValidation, "post"), section_controller_1.addSection);
router.route("/getAll").get(section_controller_1.getAllSections);
router
    .route("/getById/:sectionId")
    .get(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUB_ADMIN, enums_enum_1.Roles.SUPER_ADMIN), section_controller_1.getSectionById);
router
    .route("/update/:sectionId")
    .put(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), (0, validator_middleWare_1.validate)(section_model_1.sectionValidation, "PUT"), section_controller_1.updateSection);
router
    .route("/delete/:sectionId")
    .delete(authentication_middleWare_1.Authentication, (0, checkRoles_middleWare_1.checkRole)(enums_enum_1.Roles.ADMIN, enums_enum_1.Roles.SUPER_ADMIN), section_controller_1.deleteSection);
exports.default = router;
