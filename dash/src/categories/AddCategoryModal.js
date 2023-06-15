import React from "react";
import { imageURL } from "..";
import SectionsServices from "../httpServices/Sections.services";

const AddCategoryModal = ({ formik, i18n }) => {
  const uploadImage = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SectionsServices.upload("upload", data).then((res) => {
      formik.setFieldValue("image", res.filename);
    });
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
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
                    ? `Add section arabic`
                    : `إضافة قسم عربي`}
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
                    ? `Add section english`
                    : `إضافة قسم إنجليزي`}
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

export default AddCategoryModal;
