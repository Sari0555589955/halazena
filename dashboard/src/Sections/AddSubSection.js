import { useFormik } from "formik";
import React from "react";
import SectionsServices from "../httpServices/sections.services";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addSubSection } from "../store/sectionsSlice";

const AddSubSection = ({ id }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      subSectionName: "",
    },
    validationSchema: yup.object({
      subSectionName: yup.string().required()
    }),
    onSubmit: (values) => {
      SectionsServices.addSection(
        `category/addSub/${id}`,
        values.subSectionName
      ).then((data) => {
        toast.success(i18n.language === 'en' ? data.success_en : data.success_ar);
        dispatch(addSubSection(data?.category))
      }).catch(e => {
        toast.error(i18n.language === 'en' ? e.response.data.error_en : e.response.data.error_ar )
      })
      formik.resetForm({ values: {subSectionName:''} });
    },
  });
  return (
    <div
      className="modal fade "
      id={"Add" + id}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={"Add" + id}>
              {i18n.language === "en" ? "Add sub section" : "إضافة قسم فرعي"}
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              <label>
                {i18n.language === "en"
                  ? `Sub section name`
                  : `إسم القسم الفرعي`}
              </label>
              <input
                name="subSectionName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                value={formik.values.subSectionName}
                className="rounded border p-1 my-2 w-100"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {i18n.language === "en" ? "Cancel" : "إلغاء"}
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {i18n.language === "en" ? "Save" : "حفظ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubSection;
