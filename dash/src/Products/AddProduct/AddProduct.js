import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "../..";
import Layout from "../../Layout/Layout";
import "./AddProduct.css";
import ProductServices from "../../httpServices/product.sevices";
import CategoriesServices from "../../httpServices/categories.services";
import { getSections } from "../../store/sectionsSlice";
import i18n from "../../Translation/i18n";
import { useNavigate } from "react-router";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TiDelete } from "react-icons/ti";
import { getSubSections } from "../../store/sectionsSlice";

const AddProduct = () => {
  const { sections } = useSelector((state) => state.sections);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sections?.length === 0) {
      CategoriesServices.allSections(`category/getAll`).then((res) => {
        dispatch(getSections(res.categories));
      });
    }
  }, [dispatch, sections?.length]);
  const delPic = (img) => {
    setFiles(files.filter((f) => f !== img));
  };
  const formik = useFormik({
    initialValues: {
      title_ar: "",
      title_en: "",
      category: "",
      sub: "",
      description_ar: "",
      description_en: "",
      smallDesc_ar: "",
      smallDesc_en: "",
      price: "",
      images: [],
      payInCash: yup.boolean,
    },
    validationSchema: yup.object({
      title_ar: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      title_en: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      description_ar: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      description_en: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),

      category: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      // category_en: yup
      // .string()
      // .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      sub: yup.string().when("category", {
        is: (value) => value,
        then: yup
          .string()
          .required(i18n.language === "en" ? `*Sub category is required` : "*الفئة الفرعية مطلوبة"),
        otherwise: yup.string().notRequired(),
      }),
      price: yup
        .number()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      images: yup
        .string()
        .typeError(i18n.language === "en" ? `*Required` : "*مطلوب")
        .required(),
      payInCash: yup
        .bool()
        .required()
        .typeError(i18n.language === "en" ? `*Required` : "*مطلوب"),
      smallDesc_ar: yup
        .string()
        .min(
          10,
          i18n.language === "en"
            ? `*The breef should be at least 10 characters`
            : "*الوصف المختصر يجب أن يكون 10 حروف على الأقل"
        )
        .max(
          150,
          i18n.language === "en"
            ? `*The breef should be 150 characters max`
            : "*الوصف المختصر يجب أن لا يزيد عن 150 حرف"
        )

        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      smallDesc_en: yup
        .string()
        .min(
          10,
          i18n.language === "en"
            ? `*The breef should be at least 10 characters`
            : "*الوصف المختصر يجب أن يكون 10 حروف على الأقل"
        )
        .max(
          150,
          i18n.language === "en"
            ? `*The breef should be 150 characters max`
            : "*الوصف المختصر يجب أن لا يزيد عن 150 حرف"
        )

        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
    }),
    onSubmit: (values) => {
      ProductServices.addProduct(`Product/add/${values.category}`, {
        ...values,
        images: files,
        category: undefined,
        attributes: attrs,
      }).then((_) => {
        navigate(-1);
      });
    },
  });
  const uploadImage = (e) => {
    const data = new FormData();
    if (e.target.files[0]) {
      data.append("image", e.target.files[0]);
      ProductServices.upload("upload", data).then((res) => {
        setFiles([...files, res.filename]);
        formik.setFieldValue("images", formik.values.images.push(files));
      });
    }
  };
  const handlePayingCash = (boolean) => {
    formik.setValues({
      ...formik.values,
      payInCash: boolean,
    });
  };

  const [pickedAttr, setPickedAttr] = useState();
  console.log("errors", formik.errors);
  const [weights, setWeights] = useState({
    key_en: "weight",
    key_ar: "الوزن",
    values: [],
  });
  const [sizes, setSizes] = useState({
    key_en: "size",
    key_ar: "الحجم",
    values: [],
  });
  const [sizeField, setSizeField] = useState({
    en: "",
    ar: "",
  });
  const [weightFiled, setWeightField] = useState({
    en: "",
    ar: "",
  });
  const [customs, setCustoms] = useState({
    key_en: "",
    key_ar: "",
    values: [],
  });
  const [customField, setCustomField] = useState({
    key_en: "",
    key_ar: "",
    value_en: "",
    value_ar: "",
  });
  const handleChangeInputs = (event, wantChange) => {
    const { name, value } = event.target;
    switch (wantChange) {
      case "size":
        return setSizeField({
          ...sizeField,
          [name]: value,
        });
      case "weight":
        return setWeightField({
          ...weightFiled,
          [name]: value,
        });
      case "custom":
        return setCustomField({
          ...customField,
          [name]: value,
        });
      default:
        return wantChange;
    }
  };
  const addNewSizeOrWeightOrCustom = (wantAddTo) => {
    if (wantAddTo === "size") {
      const checkValue = Object.values(sizeField).every((el) => el !== "");
      if (checkValue) {
        setSizes({
          ...sizes,
          values: [...sizes.values, sizeField],
        });
        setSizeField({
          en: "",
          ar: "",
        });
      }
    }
    if (wantAddTo === "weight") {
      const checkValue = Object.values(weightFiled).every((el) => el !== "");
      if (checkValue) {
        setWeights({
          ...weights,
          values: [...weights.values, weightFiled],
        });
        setWeightField({
          en: "",
          ar: "",
        });
      }
    }
    if (wantAddTo === "custom") {
      const checkValue = Object.values(customField).every((el) => el !== "");
      if (checkValue) {
        setCustoms({
          ...customs,
          key_en: customField?.key_en,
          key_ar: customField?.key_ar,
          values: [
            ...customs.values,
            { en: customField.value_en, ar: customField.value_ar },
          ],
        });
        setCustomField({
          ...customField,
          value_en: "",
          value_ar: "",
        });
      }
    }
  };
  const [attrs, setAttrs] = useState([]);

  useEffect(() => {
    setAttrs([sizes, weights, customs]);
  }, [sizes, weights, customs]);

  const deleteSize = (clicked) => {
    const updatedSizes = sizes.values.filter((size) => size !== clicked);
    setSizes({ ...sizes, values: updatedSizes });
  };
  const deleteWight = (clicked) => {
    const updatedWeights = weights.values.filter((item) => item !== clicked);
    setWeights({ ...weights, values: updatedWeights });
  };
  const deleteCustomAttribute = () => {
    setCustoms({
      key_en: "",
      key_ar: "",
      values: [],
    });
    setCustomField({
      key_en: "",
      key_ar: "",
      value_en: "",
      value_ar: "",
    });
  };
  const deleteCustomAttributeValue = (clicked) => {
    setCustoms({
      ...customs,
      values: customs.values.filter((value) => value !== clicked),
    });
  };
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
  // Start of getting category ID & handling sub categories
  const category = sections.find((cat) => cat._id === formik.values.category);

  useEffect(() => {
    CategoriesServices.allSections(`category/getAllSub/${category?._id}`).then(
      (res) => {
        dispatch(getSubSections(res.subCategories));
      }
    );
  }, [dispatch, category]);
  const { subSections } = useSelector((state) => state.sections);
  return (
    <div>
      <Layout>
        <div className="m-3 bg-white p-5 rounded">
          <form className="d-flex flex-column  " onSubmit={formik.handleSubmit}>
            <h3>{i18n.language === "en" ? `Add product` : `إضافة منتج`}</h3>
            <hr />
            <div className="row">
              <div className="col-lg-6 col-12 my-2">
                <div className="my-2 w-100">
                  <label htmlFor="title_ar" className="d-block">
                    {i18n.language === "en"
                      ? `Product name arabic`
                      : `إسم المنتج عربي`}
                  </label>
                  <input
                    type="text"
                    name="title_ar"
                    value={formik.values.title_ar}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded w-100"
                  />
                  {formik.errors.title_ar && formik.touched.title_ar && (
                    <p className="text-danger">{formik.errors.title_ar}</p>
                  )}
                </div>
                <div className="my-2 w-100">
                  <label htmlFor="title_en" className="d-block">
                    {i18n.language === "en"
                      ? `Product name english`
                      : `إسم المنتج إنجليزي`}
                  </label>
                  <input
                    type="text"
                    name="title_en"
                    value={formik.values.title_en}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded w-100"
                  />
                  {formik.errors.title_en && formik.touched.title_en && (
                    <p className="text-danger">{formik.errors.title_en}</p>
                  )}
                </div>
                <div className="my-2  w-100">
                  <label htmlFor="smallDesc_ar" className="d-block">
                    {i18n.language === "en" ? `Breef arabic` : `وصف مختصر عربي`}
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    name="smallDesc_ar"
                    value={formik.values.smallDesc_ar}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded"
                  />
                  {formik.errors.smallDesc_ar &&
                    formik.touched.smallDesc_ar && (
                      <p className="text-danger">
                        {formik.errors.smallDesc_ar}
                      </p>
                    )}
                </div>
                <div className="my-2  w-100">
                  <label htmlFor="smallDesc_en" className="d-block">
                    {i18n.language === "en"
                      ? `Breef english`
                      : `وصف مختصر إنجليزي`}
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    name="smallDesc_en"
                    value={formik.values.smallDesc_en}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded"
                  />
                  {formik.errors.smallDesc_en &&
                    formik.touched.smallDesc_en && (
                      <p className="text-danger">
                        {formik.errors.smallDesc_en}
                      </p>
                    )}
                </div>
                <div className="my-2 w-100">
                  <label htmlFor="category" className="d-block">
                    {i18n.language === "en" ? `category` : `الفئة`}
                  </label>
                  <select
                    name="category"
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border rounded w-100 form-select"
                  >
                    <option defaultValue={true} hidden>
                      {i18n.language === "en"
                        ? `Choose a category`
                        : `إختر فئة`}
                    </option>
                    {sections?.map((section) => (
                      <option key={section._id} value={section._id}>
                        {section[`name_${i18n.language}`]}
                      </option>
                    ))}
                  </select>
                  {formik.errors.category && formik.touched.category && (
                    <p className="text-danger">{formik.errors.category}</p>
                  )}
                </div>
                {formik.values.category && (
                  <div className="my-2 w-100">
                    <label htmlFor="subCategory" className="d-block">
                      {i18n.language === "en" ? `Sub category` : `القسم الفرعي`}
                    </label>
                    <select
                      name="sub"
                      value={formik.values.sub}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="border rounded w-100 form-select"
                    >
                      <option defaultValue={true} hidden>
                        {i18n.language === "en"
                          ? `Choose a sub section`
                          : `إختر قسم فرعي`}
                      </option>

                      {subSections &&
                        subSections?.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub[`name_${i18n.language}`]}
                          </option>
                        ))}
                    </select>
                    {formik.errors.sub && formik.touched.sub && (
                      <p className="text-danger">{formik.errors.sub}</p>
                    )}
                  </div>
                )}
                {/* Sub end */}
                <div className="my-2 w-100">
                  <select
                    className="border rounded w-100 form-select"
                    onChange={(e) => {
                      setPickedAttr(e.target.value);
                    }}
                    name="attributes"
                    value={pickedAttr}
                  >
                    <option selected hidden>
                      {i18n.language === "en" ? "Add Attribute" : "إضافة معيار"}
                    </option>

                    <option value="size">
                      {i18n.language === "en" ? "Sizes" : "المقاسات"}
                    </option>

                    <option value="weight">
                      {i18n.language === "en" ? "Weight" : "الأوزان"}
                    </option>

                    <option value="custom">
                      {i18n.language === "en"
                        ? "Custom Attribute"
                        : "معيار مخصص"}
                    </option>
                  </select>
                </div>
                {/* Size Option */}
                {pickedAttr === "size" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex gap-3 mt-3">
                      <input
                        type="text"
                        name="en"
                        value={sizeField.en}
                        onBlur={formik.handleBlur}
                        onChange={(event) => handleChangeInputs(event, "size")}
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "English value"
                            : "القيمة الانجليزية"
                        }
                      />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                      <input
                        type="text"
                        name="ar"
                        value={sizeField.ar}
                        onBlur={formik.handleBlur}
                        onChange={(event) => handleChangeInputs(event, "size")}
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "Arabic value"
                            : "القيمة العربية"
                        }
                      />
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      type="button"
                      onClick={() => addNewSizeOrWeightOrCustom("size")}
                    >
                      {i18n.language === "en" ? "Add" : "إضافة"}
                    </button>
                    <div className="d-flex gap-2 p-3 flex-wrap">
                      {sizes.values &&
                        sizes.values.map((sizeValue) => (
                          <div
                            style={{ width: "auto", wordBreak: "break-word" }}
                            className="border rounded px-2 pb-2"
                          >
                            <div className="d-flex justify-content-end">
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteSize(sizeValue)}
                              >
                                <TiDelete />
                              </span>
                            </div>
                            <p class="m-0 text-center">{sizeValue.en}</p>
                            <p class="m-0 text-center">{sizeValue.ar}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {/* Weight Option */}
                {pickedAttr === "weight" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex gap-3 mt-3">
                      <input
                        type="text"
                        name="en"
                        value={weightFiled.en}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          handleChangeInputs(event, "weight")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "English value"
                            : "القيمة الانجليزية"
                        }
                      />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                      <input
                        type="text"
                        name="ar"
                        value={weightFiled.ar}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          handleChangeInputs(event, "weight")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "Arabic value"
                            : "القيمة العربية"
                        }
                      />
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      type="button"
                      onClick={() => addNewSizeOrWeightOrCustom("weight")}
                    >
                      {i18n.language === "en" ? "Add" : "إضافة"}
                    </button>
                    <div className="d-flex gap-2 p-3 flex-wrap">
                      {weights.values &&
                        weights.values.map((weightValue) => (
                          <div
                            style={{ width: "auto", wordBreak: "break-word" }}
                            className="border rounded px-2 pb-2"
                          >
                            <div className="d-flex justify-content-end">
                              <span
                                style={{
                                  color: "red",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteWight(weightValue)}
                              >
                                <TiDelete />
                              </span>
                            </div>
                            <p class="m-0 text-center">{weightValue.en}</p>
                            <p class="m-0 text-center">{weightValue.ar}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {/* Custom Option */}
                {pickedAttr === "custom" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex gap-3 mt-3">
                      <input
                        type="text"
                        name="key_en"
                        value={customField?.key_en}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          !customs?.key_en && handleChangeInputs(event, "custom")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "English attribute name"
                            : "اسم المعيار بالانجليزية"
                        }
                      />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                      <input
                        type="text"
                        name="key_ar"
                        value={customField.key_ar}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          !customs.key_ar && handleChangeInputs(event, "custom")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "Arabic attribute name"
                            : "اسم المعيار بالعربية"
                        }
                      />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                      <input
                        type="text"
                        name="value_en"
                        value={customField.value_en}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          handleChangeInputs(event, "custom")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "English attribute value"
                            : "قيمة الصفة الانجليزية"
                        }
                      />
                    </div>
                    <div className="d-flex gap-3 mt-2">
                      <input
                        type="text"
                        name="value_ar"
                        value={customField.value_ar}
                        onBlur={formik.handleBlur}
                        onChange={(event) =>
                          handleChangeInputs(event, "custom")
                        }
                        className="border form-control rounded w-100"
                        placeholder={
                          i18n.language === "en"
                            ? "Arabic attribute value"
                            : "قيمة الصفة العربية"
                        }
                      />
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      type="button"
                      onClick={() => addNewSizeOrWeightOrCustom("custom")}
                    >
                      {i18n.language === "en" ? "Add" : "إضافة"}
                    </button>
                    {customs?.key_en && customs.key_ar && (
                      <div className="border radius p-2 mt-2">
                        <div className="d-flex justify-content-end ">
                          <span
                            style={{
                              color: "red",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteCustomAttribute()}
                          >
                            <TiDelete />
                          </span>
                        </div>
                        <div>
                          <h6>{customs?.key_en}</h6>
                          <h6>{customs.key_ar}</h6>
                        </div>
                        <div className="d-flex gap-3 flex-wrap">
                          {customs.values.map((customValue) => (
                            <div
                              style={{ width: "auto", wordBreak: "break-word" }}
                              className="border rounded px-2 pb-2"
                            >
                              <div className="d-flex justify-content-end">
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteCustomAttributeValue(customValue)
                                  }
                                >
                                  <TiDelete />
                                </span>
                              </div>
                              <p class="m-0 text-center">{customValue.en}</p>
                              <p class="m-0 text-center">{customValue.ar}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="my-2  w-100">
                  <label htmlFor="description" className="d-block">
                    {i18n.language === "en"
                      ? `Description arabic`
                      : `تفاصيل المنتج عربي`}
                  </label>
                  <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    id="description_ar"
                    formats={formats}
                    modules={modules}
                    style={{ direction: "ltr" }}
                    value={formik.values.description_ar}
                    onBlur={formik.handleBlur}
                    onChange={(v) => formik.setFieldValue("description_ar", v)}
                  />
                  {formik.errors.description_ar &&
                    formik.touched.description_ar && (
                      <p className="text-danger">
                        {formik.errors.description_ar}
                      </p>
                    )}
                </div>
                <div className="my-2  w-100">
                  <label htmlFor="description" className="d-block">
                    {i18n.language === "en"
                      ? `Description english`
                      : `تفاصيل المنتج إنجليزي`}
                  </label>
                  <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    id="description_en"
                    formats={formats}
                    modules={modules}
                    style={{ direction: "ltr" }}
                    value={formik.values.description_en}
                    onBlur={formik.handleBlur}
                    onChange={(v) => formik.setFieldValue("description_en", v)}
                  />
                  {formik.errors.description_en &&
                    formik.touched.description_en && (
                      <p className="text-danger">
                        {formik.errors.description_en}
                      </p>
                    )}
                </div>
                <div className="my-2  w-100">
                  <label htmlFor="price" className="d-block">
                    {i18n.language === "en" ? `Price` : `السعر`}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded"
                  />
                  {formik.errors.price && formik.touched.price && (
                    <p className="text-danger">{formik.errors.price}</p>
                  )}
                </div>
                <div className="d-flex w-100 justify-content-around">
                  <div className="form-check">
                    <input
                      className="form-check-input mx-2"
                      type="radio"
                      name="payInCash"
                      checked={formik.values.payInCash}
                      onChange={() => handlePayingCash(true)}
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      {i18n.language === "en"
                        ? `Pay on delivery`
                        : "الدفع عند الإستلام"}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input mx-2"
                      type="radio"
                      name="payInCash"
                      checked={!formik.values.payInCash}
                      onChange={() => handlePayingCash(false)}
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      {i18n.language === "en" ? `Pay online` : "الدفع اونلاين"}
                    </label>
                  </div>
                  {formik.errors.payInCash && formik.touched.payInCash && (
                    <p className="text-danger">{formik.errors.payInCash}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6 my-2">
                <div className="wrapper imgForAll d-block ">
                  <div>
                    {!files[0] ? (
                      <div className="placeHolder">Please choose an Image</div>
                    ) : (
                      <img
                        src={`${imageURL}/${files[0]}`}
                        alt="profile"
                        width="150px"
                        className="imgForAll"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="imgForAll input"
                    onChange={(e) => uploadImage(e)}
                  />
                </div>
                {files && (
                  <div className=" m-2 p-3 w-auto d-flex">
                    {files.map((img) => (
                      <div className="m-2">
                        <AiFillDelete
                          onClick={() => delPic(img)}
                          className="rounded-circle bg-white fs-6 text-danger"
                          style={{ position: "absolute", cursor: "pointer" }}
                        />
                        <img
                          className="border rounded"
                          src={`${imageURL}/${img}`}
                          width="70px"
                          height="70px"
                          alt="img"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {formik.errors.images && formik.touched.images && (
                  <p className="text-danger">{formik.errors.images}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-warning text-white my-5 align-self-center p-3"
            >
              {i18n.language === "en" ? `Add product` : `إضافة المنتج`}
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default AddProduct;
