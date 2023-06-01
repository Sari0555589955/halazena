import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import { Response } from "express";
import { asyncHandler } from "../middleWares/asyncHandler";
import Contact from "../model/contact.model";

export const createContact = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundContact = await Contact.findOne({ ...req.body });
    if (foundContact) {
      return res.status(400).send({
        error_en: "Contact Already Exist ",
        error_ar: "الشكوى موجودة بالفعل",
      });
    }
    const contact = new Contact({ ...req.body });
    await contact.save();
    res
      .status(200)
      .send({
        success_en: "The Complaints Saved Successfully",
        success_ar: "تم حفظ الشكاوى بنجاح",
        contact,
      });
  }
);

//DESC: get all or filter by the contact type
//Route:GET/unstore/api/v1/contact/getAll/:params
//access: private(admin,superAdmin)

export const getAllContact = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    //FILTERATION OPTION
    const filterationOpation = req.params.contactType
      ? { contactType: req.params.contactType }
      : {};
    //PAGINATION
    let page: any = req.query.page;
    let limit = 2;
    let pages: any = await Contact.find(filterationOpation).countDocuments();
    let skipLimit = (page - 1) * limit;
    let count = Math.round(pages / limit);
    if (!req.query.page) {
      skipLimit = 0;
      limit = pages;
      count = pages = 0;
    }

    const contacts = await Contact.find(filterationOpation)
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
  }
);

export const getContactById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, {
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
  }
);

export const updateContact = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      {
        ...req.body,
      },
      { new: true }
    );
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
  }
);
export const deleteContact = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const contact = await Contact.findByIdAndDelete(req.params.complaintId);
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
  }
);
