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
exports.deleteContact = exports.updateContact = exports.getContactById = exports.getAllContact = exports.createContact = void 0;
const asyncHandler_1 = require("../middleWares/asyncHandler");
const contact_model_1 = __importDefault(require("../model/contact.model"));
exports.createContact = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundContact = yield contact_model_1.default.findOne(Object.assign({}, req.body));
    if (foundContact) {
        return res.status(400).send({
            error_en: "Contact Already Exist ",
            error_ar: "الشكوى موجودة بالفعل",
        });
    }
    const contact = new contact_model_1.default(Object.assign({}, req.body));
    yield contact.save();
    res
        .status(200)
        .send({
        success_en: "The Complaints Saved Successfully",
        success_ar: "تم حفظ الشكاوى بنجاح",
        contact,
    });
}));
//DESC: get all or filter by the contact type
//Route:GET/unstore/api/v1/contact/getAll/:params
//access: private(admin,superAdmin)
exports.getAllContact = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //FILTERATION OPTION
    const filterationOpation = req.params.contactType
        ? { contactType: req.params.contactType }
        : {};
    //PAGINATION
    let page = req.query.page;
    let limit = 2;
    let pages = yield contact_model_1.default.find(filterationOpation).countDocuments();
    let skipLimit = (page - 1) * limit;
    let count = Math.round(pages / limit);
    if (!req.query.page) {
        skipLimit = 0;
        limit = pages;
        count = pages = 0;
    }
    const contacts = yield contact_model_1.default.find(filterationOpation)
        .skip(skipLimit)
        .limit(limit);
    if (!contacts[0]) {
        return res
            .status(400)
            .send({
            error_en: "cant find Complaints ",
            error_ar: "لم يتم العثور على الشكاوى",
        });
    }
    res
        .status(200)
        .send({
        success_en: "Complaints Are Fetched Successfully ",
        success_ar: "تم جلب الشكاوى بنجاح",
        contacts,
        count,
    });
}));
exports.getContactById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.default.findByIdAndUpdate(req.params.contactId, {
        $set: { isOpened: true },
    });
    if (!contact) {
        return res
            .status(400)
            .send({
            error_en: "cant find the complaints",
            error_ar: "غير قادر على العثور على الشكاوى",
        });
    }
    res
        .status(200)
        .send({
        success_en: "Compalint fetched Successfully",
        success_ar: "تم جلب الشكوى بنجاح",
        contact,
    });
}));
exports.updateContact = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.default.findByIdAndUpdate(req.params.contactId, Object.assign({}, req.body), { new: true });
    if (!contact) {
        return res
            .status(400)
            .send({
            error_en: "Cant Update The complaints",
            error_ar: "غير قادر على تحديث الشكاوى",
        });
    }
    res
        .status(200)
        .send({
        success_en: "The Complaint Updated Successfully",
        success_ar: "تم تحديث الشكوى بنجاح",
        contact,
    });
}));
exports.deleteContact = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.default.findByIdAndDelete(req.params.complaintId);
    if (!contact) {
        return res
            .status(400)
            .send({
            error_en: "Cant delete The complaints",
            error_ar: "لا يمكن حذف الشكوى",
        });
    }
    res
        .status(200)
        .send({
        success_en: "The Complaint delete Successfully",
        success_ar: "تم حذف الشكوى بنجاح",
        contact,
    });
}));
