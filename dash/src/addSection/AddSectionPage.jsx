import React, { useState } from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import SectionsServices from "../httpServices/Sections.services";
import { useNavigate, useParams } from "react-router";
import { imageURL } from "..";
import Input from "../editSection/Input";
const AddSectionPage = () => {
  const { language } = i18n;
  const sectionTypes = ["slider", "banner", "aboutus", "privacy"];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      image: "",
      type: "",
    },
    validationSchema: yup.object({
      type: yup.string().required(language === "en" ? `*Required` : "*مطلوب"),
      title_ar: yup.string().when("type", {
        is: "banner",
        then: yup.string().notRequired(),
        otherwise: yup.string().required(),
      }),
      title_en: yup.string().when("type", {
        is: "banner",
        then: yup.string().notRequired(),
        otherwise: yup.string().required(),
      }),
      description_en: yup.string().when("type", {
        is: "banner",
        then: yup.string().notRequired(),
        otherwise: yup.string().required(),
      }),
      description_ar: yup.string().when("type", {
        is: "banner",
        then: yup.string().notRequired(),
        otherwise: yup.string().required(),
      }),
      image: yup.string().required(language === "en" ? `*Required` : "*مطلوب"),
    }),
    onSubmit: () => {
      SectionsServices.addSection(
        `section/add`,
        values.type === "banner"
          ? { ...values, alignment: alignmentField }
          : values
      ).then((res) => {
        if (res?.success_ar) navigate("/sections");
      });
    },
  });
  const {
    values,
    setValues,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;

  const uploadImage = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SectionsServices.upload("upload", data).then((res) => {
      setFieldValue("image", res.filename);
    });
  };
  const [alignmentField, setAlignmentField] = useState("");
  const arabibTypes = {
    slider: "المنزلق",
    banner: "بانر",
    aboutus: "معلومات عننا",
    privacy: "سياسة الخصوصية",
  };
  const requiredAlignments = ["horizontal", "vertical"];
  const arabicAlignments = {
    horizontal: "افقي",
    vertical: "عمودي",
  };

  return (
    <div>
      <Layout>
        <div class="p-3">
          <div className="p-4 bg-white">
            <h4 className="border-bottom border-dark py-3">
              {language === "en" ? "Add Section" : "إضافة قسم"}
            </h4>
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "40px",
              }}
            >
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className=" mt-3">
                    <label style={{ textTransform: "capitalize" }}>
                      {language === "en" ? "section type" : "نوع القسم"}
                    </label>
                    <select
                      className={`w-100 mt-2 border ${
                        errors.type && touched.type ? "border-danger" : ""
                      } `}
                      value={values.type}
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        outline: 0,
                        fontSize: "17px",
                        padding: "5px",
                      }}
                    >
                      <option selected hidden>
                        {i18n.language === "en"
                          ? "Select section type"
                          : "أختار نوع القسم"}
                      </option>
                      {sectionTypes.map((secType) => (
                        <option value={secType} key={secType}>
                          {i18n.language === "en"
                            ? secType
                            : arabibTypes[secType]}
                        </option>
                      ))}
                    </select>
                    {errors.type && touched.type ? (
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.type}
                      </p>
                    ) : undefined}
                  </div>
                  {values.type ? (
                    values.type === "banner" ? (
                      <div className=" mt-3">
                        <label style={{ textTransform: "capitalize" }}>
                          {language === "en"
                            ? "banner alignment"
                            : "محاذاة البانر"}
                        </label>
                        <select
                          className={`w-100 mt-2 border `}
                          value={alignmentField}
                          onChange={(e) => setAlignmentField(e.target.value)}
                          style={{
                            outline: 0,
                            fontSize: "17px",
                            padding: "5px",
                          }}
                        >
                          <option selected hidden>
                            {i18n.language === "en"
                              ? "Select alignment"
                              : "اختار تنسيق"}
                          </option>
                          {requiredAlignments.map((reqAlignment) => (
                            <option value={reqAlignment} key={reqAlignment}>
                              {i18n.language === "en"
                                ? reqAlignment
                                : arabicAlignments[reqAlignment]}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <>
                        <Input
                          value={values.title_en}
                          error={errors.title_en}
                          touched={touched.title_en}
                          name="title_en"
                          label={
                            language === "en"
                              ? "English Title"
                              : "العنوان الانجليزي"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Input
                          value={values.title_ar}
                          error={errors.title_ar}
                          touched={touched.title_ar}
                          name="title_ar"
                          label={
                            language === "en"
                              ? "Arabic Title"
                              : "العنوان العربي"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Input
                          value={values.description_en}
                          error={errors.description_en}
                          touched={touched.description_en}
                          name="description_en"
                          label={
                            language === "en"
                              ? "English Description"
                              : "الوصف الانجليزي"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Input
                          value={values.description_ar}
                          error={errors.description_ar}
                          touched={touched.description_ar}
                          name="description_ar"
                          label={
                            language === "en"
                              ? "Arabic Description"
                              : "الوصف العربي"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </>
                    )
                  ) : undefined}

                  <div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#F8B407",
                        color: "#fff",
                        outline: 0,
                        border: 0,
                        fontSize: "18px",
                        padding: "7px",
                        marginTop: "30px",
                      }}
                    >
                      {language === "en" ? "Add Section" : "إضافة القسم"}
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="wrapper imgForAll d-block">
                    <div>
                      {values.image ? (
                        <img
                          src={`${imageURL}/${values.image}`}
                          alt="product"
                          className="imgForAll"
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
                          {errors.image && touched.image && (
                            <p
                              className="text-danger text-center"
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                            >
                              {errors.image}
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
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AddSectionPage;
