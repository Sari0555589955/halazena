import { useFormik } from "formik";
import React from "react";
import CategoriesServices from "../httpServices/categories.services";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addSubSection } from "../store/sectionsSlice";

const AddSubCategory = ({ id }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
    },
    validationSchema: yup.object({
      name_ar: yup.string().required(),
      name_en: yup.string().required(),
    }),
    onSubmit: (values) => {
      CategoriesServices.addSection(
        `category/addSub/${id}`,
        values
      ).then((data) => {
        toast.success(i18n.language === 'en' ? data.success_en : data.success_ar);
        dispatch(addSubSection(data?.category))
      }).catch(e => {
        toast.error(i18n.language === 'en' ? e.response.data.error_en : e.response.data.error_ar )
      })
      formik.resetForm( );
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
                  ? `Sub section name arabic`
                  : `إسم القسم الفرعي عربي`}
              </label>
              <input
                name="name_ar"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                value={formik.values.name_ar}
                className="rounded border p-1 my-2 w-100"
              />
              <label>
                {i18n.language === "en"
                  ? `Sub section name english`
                  : `إسم القسم الفرعي إنجليزي`}
              </label>
              <input
                name="name_en"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
                value={formik.values.name_en}
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

export default AddSubCategory;
