import { AuthenticatedRequest } from "../middleWares/authentication.middleWare";
import { Response } from "express";
import Section from "../model/section.model";
import { asyncHandler } from "../middleWares/asyncHandler";
// add section wither it is slider or banner or what ever
//ROUTE /POST /unStore/api/v1/section/add
//access: private(admin,super admin)
export const addSection = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // adding the section
    const { type, alignment } = req.body;
    let filterationObject = {};
    if (type) {
      filterationObject = { type };
    }
    if (alignment) {
      filterationObject = { ...filterationObject, alignment };
    }
    if (type == "banner" || type == "aboutus" || type == "privacy") {
      // CHECK IF THERE IS SECTION WITH THE SAME TYPE OR NOT
      const sectionExist = await Section.findOne(filterationObject);

      if (sectionExist) {
        //UPDATE WARNING
        const updateSection = await Section.findByIdAndUpdate(
          sectionExist._id,
          { ...req.body },
          { new: true }
        );
        if (!updateSection) {
          return res
            .status(400)
            .send({
              errror_en: `Cant Update Section ${type}`,
              error_ar: `لم يتم العثور على قسم ${type} سبب التحديث غير قادر`,
            });
        }
        res
          .status(200)
          .send({
            success_en: `Section ${type} updated Successfully `,
            success_ar: `${type} تم تحديث القسم بنجاح`,
          });
      } else {
        const section = new Section({ ...req.body });
        section.save();
        res
          .status(200)
          .send({
            success_en: "Section Added Successfully",
            success_ar: "تمت إضافة القسم بنجاح",
            section,
          });
      }
    } else {
      const section = new Section({ ...req.body });
      section.save();
      res
        .status(200)
        .send({
          success_en: "Section Added Successfully",
          success_ar: "تمت إضافة القسم بنجاح",
          section,
        });
    }

    // this endPoint for add and for update at the same time
    // ONLY IN CASE OF BANNER AND ABOUTUS AND PRIVACY ELSE ADD NEW ONE
  }
);

// get all the sections
//ROUTE /GET /unStore/api/v1/section/getAll
//access:private(admin)
export const getAllSections = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const filterationOptions = req.query.type ? { type: req.query.type } : {};
    const sections = await Section.find(filterationOptions);
    if (!sections[0]) {
      return res
        .status(400)
        .send({
          error_en: "Sections Are Not Found",
          error_ar: "لم يتم العثور على الأقسام",
        });
    }
    res
      .status(200)
      .send({
        success_en: "sections are fetched successfully",
        success_ar: "تم جلب الأقسام بنجاح",
        sections,
      });
  }
);

//update the section
// route / put /unstore/api/v1/section/update/:sectionId
//access private(admin)
export const updateSection = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // i'm gonna deal with it if you want to delete it i will just make it's value empty
    const section = await Section.findByIdAndUpdate(
      req.params.sectionId,
      { ...req.body },
      { new: true }
    );
    if (!section) {
      return res
        .status(400)
        .send({
          error_en: "Section Cant Be Updated Cause it's not Found",
          error_ar: "لا يمكن تحديث القسم لأنه غير موجود",
        });
    }
    res
      .status(200)
      .send({
        success_en: "section updated successfully",
        success_ar: "تم تحديث القسم بنجاح",
        section,
      });
  }
);

// delete section
// ROUTE DELETE /unStore/api/v1/section/delete/sectionId
export const deleteSection = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const section = await Section.findByIdAndDelete(req.params.sectionId);
    if (!section) {
      return res
        .status(400)
        .send({
          error_en: "Section Cant Be delete Cause it's not Found",
          error_ar: "لا يمكن حذف القسم لأنه غير موجود",
        });
    }
    res
      .status(200)
      .send({
        success_en: "section delete successfully",
        success_ar: "تم حذف القسم بنجاح",
        section,
      });
  }
);

// get SectionById
//ROUTE /GET/ unStore/api/v1/section/getById/:sectionId
export const getSectionById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res
        .status(400)
        .send({
          error_en: "section not Found",
          error_ar: "لا يمكن حذف القسم لأنه غير موجود",
        });
    }
    res
      .status(200)
      .send({
        success_en: "section delete successfully",
        success_ar: "القسم غير موجود",
        section,
      });
  }
);
