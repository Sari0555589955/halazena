"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectionById = exports.deleteSection = exports.updateSection = exports.getAllSections = exports.addSection = void 0;
const section_model_1 = __importDefault(require("../model/section.model"));
const asyncHandler_1 = require("../middleWares/asyncHandler");
// add section wither it is slider or banner or what ever
//ROUTE /POST /unStore/api/v1/section/add
//access: private(admin,super admin)
exports.addSection = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // adding the section
    const { type, alignment } = req.body;
    let filterationObject = {};
    if (type) {
        filterationObject = { type };
    }
    if (alignment) {
        filterationObject = Object.assign(Object.assign({}, filterationObject), { alignment });
    }
    if (type == "banner" || type == "aboutus" || type == "privacy") {
        // CHECK IF THERE IS SECTION WITH THE SAME TYPE OR NOT
        const sectionExist = yield section_model_1.default.findOne(filterationObject);
        if (sectionExist) {
            //UPDATE WARNING
            const updateSection = yield section_model_1.default.findByIdAndUpdate(sectionExist._id, Object.assign({}, req.body), { new: true });
            if (!updateSection) {
                return res.status(400).send({
                    errror_en: `Cant Update Section ${type}`,
                    error_ar: `لم يتم العثور على قسم ${type} سبب التحديث غير قادر`,
                });
            }
            res.status(200).send({
                success_en: `Section ${type} updated Successfully `,
                success_ar: `${type} تم تحديث القسم بنجاح`,
            });
        }
        else {
            const section = new section_model_1.default(Object.assign({}, req.body));
            section.save();
            res.status(200).send({
                success_en: "Section Added Successfully",
                success_ar: "تمت إضافة القسم بنجاح",
                section,
            });
        }
    }
    else {
        const section = new section_model_1.default(Object.assign({}, req.body));
        section.save();
        res.status(200).send({
            success_en: "Section Added Successfully",
            success_ar: "تمت إضافة القسم بنجاح",
            section,
        });
    }
    // this endPoint for add and for update at the same time
    // ONLY IN CASE OF BANNER AND ABOUTUS AND PRIVACY ELSE ADD NEW ONE
}));
// get all the sections
//ROUTE /GET /unStore/api/v1/section/getAll
//access:private(admin)
exports.getAllSections = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterationOptions = req.query.type ? { type: req.query.type } : {};
    const sections = yield section_model_1.default.find(filterationOptions);
    if (!sections[0]) {
        return res.status(400).send({
            error_en: "Sections are not found",
            error_ar: "لم يتم العثور على الأقسام",
        });
    }
    res.status(200).send({
        success_en: "sections are fetched successfully",
        success_ar: "تم جلب الأقسام بنجاح",
        sections,
    });
}));
//update the section
// route / put /unstore/api/v1/section/update/:sectionId
//access private(admin)
exports.updateSection = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // i'm gonna deal with it if you want to delete it i will just make it's value empty
    const section = yield section_model_1.default.findByIdAndUpdate(req.params.sectionId, Object.assign({}, req.body), { new: true });
    if (!section) {
        return res.status(400).send({
            error_en: "Section Cant Be Updated Cause it's not Found",
            error_ar: "لا يمكن تحديث القسم لأنه غير موجود",
        });
    }
    res.status(200).send({
        success_en: "section updated successfully",
        success_ar: "تم تحديث القسم بنجاح",
        section,
    });
}));
// delete section
// ROUTE DELETE /unStore/api/v1/section/delete/sectionId
exports.deleteSection = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const section = await Section.findByIdAndDelete(req.params.sectionId);
    const section = yield section_model_1.default.findById(req.params.sectionId);
    if (!section) {
        return res.status(400).send({
            error_en: "Section Cant Be delete Cause it's not Found",
            error_ar: "لا يمكن حذف القسم لأنه غير موجود",
        });
    }
    yield section_model_1.default.findByIdAndDelete(section._id);
    res.status(200).send({
        success_en: "section delete successfully",
        success_ar: "تم حذف القسم بنجاح",
        section,
    });
}));
// get SectionById
//ROUTE /GET/ unStore/api/v1/section/getById/:sectionId
exports.getSectionById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const section = yield section_model_1.default.findById(req.params.sectionId);
    if (!section) {
        return res.status(400).send({
            error_en: "section not Found",
            error_ar: "",
        });
    }
    res.status(200).send({
        success_en: "section is not existed or delete successfully",
        success_ar: "القسم غير موجود أو تم حذفه",
        section,
    });
}));
