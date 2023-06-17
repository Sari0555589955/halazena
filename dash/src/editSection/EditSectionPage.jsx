import React from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import SectionsServices from "../httpServices/Sections.services";
import { useNavigate, useParams } from "react-router";
import { imageURL } from "..";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import Input from "./Input";
import ReactQuill from "react-quill";
import InputQuill from "../addSection/InputQuill";

const EditSectionPage = () => {
  const { sectionId } = useParams();
  const { language } = i18n;
  const sectionTypes = ["slider", "banner", "aboutus", "privacy"];
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
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
      alignment: yup.string().when("type", {
        is: "banner",
        then: yup.string().required(),
      }),
    }),
    onSubmit: () => {
      SectionsServices.updateSection(`section/update`, sectionId, values).then(
        (res) => {
          if (res?.success_ar) navigate("/sections");
        }
      );
    },
  });

  const {
    values,
    errors,
    touched,
    setValues,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;
  useEffect(() => {
    SectionsServices.getSingleSection("section/getById", sectionId).then(
      (res) => {
        if (res?.section) {
          if (res.section.type !== "banner") {
            setValues({
              title_en: res.section.title_en,
              title_ar: res.section.title_ar,
              description_en: res.section.description_en,
              description_ar: res.section.description_ar,
              image: res.section.image,
              type: res.section.type,
            });
          } else {
            setValues({
              type: res.section.type,
              image: res.section.image,
              alignment: res.section.alignment,
            });
          }
        }
      }
    );
  }, []);

  const uploadImage = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SectionsServices.upload("upload", data).then((res) => {
      setFieldValue("image", res.filename);
    });
  };

  const requiredAlignments = ["horizontal", "vertical"];
  const arabicAlignments = {
    horizontal: "افقي",
    vertical: "عمودي",
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  return (
    <div>
      <Layout>
        <div class="p-3">
          <div className="p-4 bg-white">
            <h4 className="border-bottom border-dark py-3">
              {language === "en" ? "Edit Section" : "تعديل القسم"}
            </h4>
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "40px",
              }}
            >
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  {values.type ? (
                    values.type === "banner" ? (
                      <div className=" mt-3">
                        <label style={{ textTransform: "capitalize" }}>
                          {language === "en"
                            ? "banner alignment"
                            : "محاذاة البانر"}
                        </label>
                        <select
                          name="alignment"
                          className={`w-100 mt-2 border ${
                            errors.alignment && touched.alignment
                              ? "border-danger"
                              : ""
                          } `}
                          value={values?.alignment}
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
                        {errors.alignment && touched.alignment && (
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "red",
                            }}
                          >
                            {errors.alignment}
                          </p>
                        )}
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
                        {values.type === "aboutus" ||
                        values.type === "privacy" ? (
                          <>
                            <InputQuill
                              field={"description_en"}
                              value={values.description_en}
                              touched={touched.description_en}
                              error={errors.description_en}
                              setFieldValue={formik.setFieldValue}
                              label={
                                i18n.language === "en"
                                  ? "English description"
                                  : "الوصف بالانجليزية"
                              }
                            />
                            <InputQuill
                              field={"description_ar"}
                              value={values.description_ar}
                              touched={touched.description_ar}
                              error={errors.description_ar}
                              setFieldValue={formik.setFieldValue}
                              label={
                                i18n.language === "en"
                                  ? "Arabic description"
                                  : "الوصف بالعربية"
                              }
                            />
                          </>
                        ) : (
                          <>
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
                        )}
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
                      {language === "en" ? "Edit Section" : "تعديل القسم"}
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
                            <h3>
                              {i18n.language === "en"
                                ? "Click to add photo"
                                : "اضغط لإضافة صورة"}
                            </h3>
                          </div>
                          {errors.image && touched.image && (
                            <p
                              class="text-danger fw-bold"
                              style={{ fontSize: "12px" }}
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

export default EditSectionPage;
