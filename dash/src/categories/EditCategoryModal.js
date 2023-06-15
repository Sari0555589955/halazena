import React, { useEffect } from "react";
import { imageURL } from "..";
import SectionsServices from "../httpServices/Sections.services";
import { useFormik } from "formik";
import * as yup from "yup";
import CategoriesServices from "../httpServices/categories.services";
import i18n from "../Translation/i18n";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateSection } from "../store/sectionsSlice";

const EditCategoryModal = ({ category }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image: "",
      name_ar: "",
      name_en: "",
    },
    validationSchema: yup.object({
      name_ar: yup.string().required("مطلوب"),
      name_en: yup.string().required("مطلوب"),
      image: yup.string().required("مطلوبئ"),
    }),
    onSubmit: () => {
      CategoriesServices.updateCategory(category._id, formik.values).then(
        (res) => {
          if (res?.category) {
            dispatch(updateSection(res?.category));
          }
        }
      );
    },
  });

  const uploadImage = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SectionsServices.upload("upload", data).then((res) => {
      formik.setFieldValue("image", res.filename);
    });
  };
  useEffect(() => {
    formik.setValues({
      ...formik.values,
      name_en: category.name_en,
      name_ar: category.name_ar,
      image: category.image,
    });
  }, [category]);
  return (
    <div
      className="modal fade"
      id="editCategory"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-content p-3">
            <div className="modal-body justify-content-center align-items-center">
              <div
                style={{
                  height: "300px",
                }}
              >
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                    margin: "0 auto",
                  }}
                >
                  {formik.values.image ? (
                    <img
                      src={`${imageURL}/${formik.values.image}`}
                      alt="product"
                      className="imgForAll"
                      style={{
                        height: "200px",
                      }}
                    />
                  ) : (
                    <>
                      <div className="d-flex justify-content-center align-items-center">
                        <h4>
                          {i18n.language === "en"
                            ? "Click to add photo"
                            : "اضغط لإضافة صورة"}
                        </h4>
                      </div>
                      {formik.errors.image && formik.touched.image && (
                        <p
                          className="text-danger text-center"
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          {formik.errors.image}
                        </p>
                      )}
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="imgForAll input"
                  onChange={(e) => uploadImage(e)}
                  style={{
                    height: "200px",
                    width: "100%",
                    margin: "0 auto",
                    display: "block",
                  }}
                />
              </div>
              <div className="row mx-5">
                <label>
                  {i18n.language === "en"
                    ? `Change arabic category name`
                    : `تغيير اسم الفئة عربي`}
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name_ar}
                  name="name_ar"
                  type="text"
                  className="rounded border p-1 my-2 w-100"
                />
                {formik.errors.name_ar && formik.touched.name_ar ? (
                  <p className="text-danger">{formik.errors.name_ar}</p>
                ) : null}
              </div>
              <div className="row mx-5">
                <label>
                  {i18n.language === "en"
                    ? `Change english category name`
                    : `تغيير اسم الفئة إنجليزي`}
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name_en}
                  name="name_en"
                  type="text"
                  className="rounded border p-1 my-2 w-100"
                />
                {formik.errors.name_en && formik.touched.name_en ? (
                  <p className="text-danger">{formik.errors.name_en}</p>
                ) : null}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-warning text-white"
                data-bs-dismiss="modal"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {i18n.language === "en" ? "Save changes" : "حفظ التعديلات"}
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-white"
              >
                {i18n.language === "en" ? "Cancel" : "إلغاء"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
