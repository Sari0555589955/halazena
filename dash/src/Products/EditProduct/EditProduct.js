import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "../..";
import Layout from "../../Layout/Layout";
import "../AddProduct/AddProduct.css";
import ProductServices from "../../httpServices/product.sevices";
import CategoriesServices from "../../httpServices/categories.services";
import { getSections, getSubSections } from "../../store/sectionsSlice";
import i18n from "../../Translation/i18n";
import { useNavigate, useParams } from "react-router";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";
import { TiDelete } from "react-icons/ti";

const AddProduct = () => {
  const { sections } = useSelector((state) => state.sections);
  const { products } = useSelector((state) => state.products);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const [value_ar, setValue_ar] = useState();
  const [value_en, setValue_en] = useState();

  useEffect(() => {
    if (sections?.length === 0) {
      CategoriesServices.allSections(`category/getAll`).then((res) => {
        dispatch(getSections(res.categories));
      });
    }
    if (products === 0) {
      setProduct(products.filter((pro) => param.id === pro._id));
    } else {
      ProductServices.getAll(`product/getById/${param.id}`).then((res) => {
        setProduct(res.product);
      });
    }
  }, [dispatch, sections?.length, param.id, products]);

  const formik = useFormik({
    initialValues: {
      title_ar: "",
      title_en: "",
      category: "",
      sub: "",
      // description: "",
      smallDesc_ar: "",
      smallDesc_en: "",
      price: "",
      images: [],
      payInCash: "",
    },
    validationSchema: yup.object({
      title_ar: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      title_en: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      category: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      sub: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      // description: yup
      //   .string()
      //   .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      price: yup
        .number()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      images: yup
        .array()
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      smallDesc_ar: yup
        .string()
        // .min(
        //   10,
        //   i18n.language === "en"
        //     ? `*The breef should be at least 10 characters`
        //     : "*الوصف المختصر يجب أن يكون 10 حروف على الأقل"
        // )
        // .max(
        //   150,
        //   i18n.language === "en"
        //     ? `*The breef should be 150 characters max`
        //     : "*الوصف المختصر يجب أن لا يزيد عن 150 حرف"
        // )
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
      smallDesc_en: yup
        .string()
        // .min(
        //   10,
        //   i18n.language === "en"
        //     ? `*The breef should be at least 10 characters`
        //     : "*الوصف المختصر يجب أن يكون 10 حروف على الأقل"
        // )
        // .max(
        //   150,
        //   i18n.language === "en"
        //     ? `*The breef should be 150 characters max`
        //     : "*الوصف المختصر يجب أن لا يزيد عن 150 حرف"
        // )
        .required(i18n.language === "en" ? `*Required` : "*مطلوب"),
    }),
    onSubmit: (values) => {
      values = {
        ...values,
        description_ar: value_ar,
        description_en: value_en,
        attributes: attrs,
      };
      ProductServices.updateProduct(`product/update/${param.id}`, values).then(
        (_) => {
          navigate(-1);
        }
      );
    },
  });
  const handlePayingCash = (boolean) => {
    formik.setValues({
      ...formik.values,
      payInCash: boolean,
    });
  };
  const [pickedAttr, setPickedAttr] = useState();

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
  console.log("attrs", attrs);
  console.log("customs", customs);
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

  useEffect(() => {
    formik.setFieldValue("title_ar", product?.title_ar);
    formik.setFieldValue("title_en", product?.title_en);
    formik.setFieldValue("category", product?.category?._id);
    formik.setFieldValue("sub", product?.sub?._id);
    formik.setFieldValue("smallDesc_ar", product?.smallDesc_ar);
    formik.setFieldValue("smallDesc_en", product?.smallDesc_en);
    formik.setFieldValue("price", product?.price);
    formik.setFieldValue("images", product.images);
    formik.setFieldValue("payInCash", product?.payInCash);
    formik.setFieldValue("attributes", product?.attributes);
    setValue_ar(product?.description_ar);
    setValue_en(product?.description_en);

    // formik.setFieldValue("description", value);
    // product?.attributes &&
    //   product?.attributes[0]?.values &&
    //   (colors.values = product?.attributes[0]?.values);
    // product?.attributes &&
    //   product?.attributes[1]?.values &&
    //   (sizes.values = product?.attributes[1]?.values);
    // product?.attributes &&
    //   product?.attributes[2]?.key &&
    //   setCustomName(product?.attributes[2]?.key);
    // product?.attributes &&
    //   product?.attributes[2]?.values &&
    //   (customs.values = product?.attributes[2]?.values);
    setSizes({
      ...sizes,
      values: product?.attributes?.find((att) => att?.key_en === "size").values,
    });
    setWeights({
      ...weights,
      values: product?.attributes?.find((att) => att?.key_en === "weight")
        .values,
    });
    const customItem = product?.attributes?.find(
      (att) => att?.key_en !== "size" && att?.key_en !== "weight"
    );
    setCustoms(customItem);
    setCustomField({
      ...customField,
      key_en: customItem?.key_en,
      key_ar: customItem?.key_ar,
    });
  }, [product]);
  const uploadImage = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    ProductServices.upload("upload", data).then((res) => {
      setProduct({ ...product, images: [...product.images, res.filename] });
    });
  };
  const deletePic = (i) => {
    const newProduct = { ...product };
    let newImage = newProduct.images.filter((img) => img !== i);

    setProduct({ ...product, images: newImage });
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
  console.log("customField", customField);
  const { subSections } = useSelector((state) => state.sections);

  const category = sections.find((cat) => cat._id === formik.values.category);

  useEffect(() => {
    CategoriesServices.allSections(`category/getAllSub/${category?._id}`).then(
      (res) => {
        dispatch(getSubSections(res.subCategories));
      }
    );
  }, [dispatch, category]);

  return (
    <div>
      <Layout>
        <div className="m-3 bg-white p-5 rounded">
          <form className="d-flex flex-column " onSubmit={formik.handleSubmit}>
            <h3>{i18n.language === "en" ? `Edit product` : `تعديل المنتج`}</h3>
            <hr />
            <div className="row">
              <div className="col-lg-6 col-12 my-2">
                <div className="my-2 w-100">
                  <label htmlFor="text" className="d-block">
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
                  <label htmlFor="text" className="d-block">
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
                  <label htmlFor="smallDesc" className="d-block">
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
                    {i18n.language === "en" ? `category` : `القسم`}
                  </label>
                  <select
                    name="category"
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border rounded w-100 form-select"
                  >
                    <option defaultValue={true} hidden>
                      {i18n.language === "en" ? `Choose a section` : `إختر قسم`}
                    </option>
                    {sections?.map((section) => (
                      <option key={section._id} value={section._id}>
                        {i18n.language === "en"
                          ? section.name_en
                          : section.name_ar}
                      </option>
                    ))}
                  </select>
                  {formik.errors.category && formik.touched.category && (
                    <p className="text-danger">{formik.errors.category}</p>
                  )}
                </div>

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
                        ? `Choose a sub category`
                        : `إختر فئة فرعية`}
                    </option>
                    {subSections?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {i18n.language === "en" ? sub.name_en : sub.name_ar}
                      </option>
                    ))}
                  </select>
                  {formik.errors.sub && formik.touched.sub && (
                    <p className="text-danger">{formik.errors.sub}</p>
                  )}
                </div>

                {/* Sub end */}

                <div className=" my-2 w-100">
                  <h5>
                    {i18n.language === "en" ? "Size attribute" : "صفة الحجم"}
                  </h5>
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
                <div className=" my-2 w-100">
                  <h5>
                    {i18n.language === "en" ? "Weight attribute" : "صفة الوزن"}
                  </h5>
                  <div className="d-flex gap-3 mt-3">
                    <input
                      type="text"
                      name="en"
                      value={weightFiled.en}
                      onBlur={formik.handleBlur}
                      onChange={(event) => handleChangeInputs(event, "weight")}
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
                      onChange={(event) => handleChangeInputs(event, "weight")}
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
                <h4>
                  {i18n.language === "en" ? "extra attribute" : "صفة اضافية"}
                </h4>

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
                      value={customField?.key_ar}
                      onBlur={formik.handleBlur}
                      onChange={(event) =>
                        !customs?.key_ar && handleChangeInputs(event, "custom")
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
                      onChange={(event) => handleChangeInputs(event, "custom")}
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
                      onChange={(event) => handleChangeInputs(event, "custom")}
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
                  {customs?.key_en && customs?.key_ar && (
                    <div className="border radius p-2 mt-2">
                      <div className="d-flex justify-content-end">
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
                        <h6>{customs?.key_ar}</h6>
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

                {/* END */}
                <div className="my-2  w-100">
                  <label htmlFor="description" className="d-block">
                    {i18n.language === "en"
                      ? `Description arabic`
                      : `تفاصيل المنتج عربي`}
                  </label>
                  <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    id="description"
                    formats={formats}
                    modules={modules}
                    style={{ direction: "ltr" }}
                    value={value_ar}
                    onBlur={formik.handleBlur}
                    onChange={setValue_ar}
                  />
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
                    id="description"
                    formats={formats}
                    modules={modules}
                    style={{ direction: "ltr" }}
                    value={value_en}
                    onBlur={formik.handleBlur}
                    onChange={setValue_en}
                  />
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
                      className="form-check-input"
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
                      className="form-check-input"
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
                </div>
              </div>
              <div className="col-6 my-2 ContainerForEditPro">
                <div className="wrapper imgForAll d-block">
                  <div>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${imageURL}/${product?.images[0]}`}
                        alt="product"
                        className="imgForAll"
                      />
                    ) : (
                      <>
                        <div className="d-flex justify-content-center align-items-center">
                          <h3>
                            {i18n.language === "en"
                              ? "Click to add photos"
                              : "اضغط لإضافة صور"}
                          </h3>
                        </div>
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
                {product.images && (
                  <div className="  d-flex flex-wrap">
                    {product?.images?.map((img) => (
                      <div style={{ position: "relative" }} className="m-2">
                        <AiFillDelete
                          onClick={() => deletePic(img)}
                          className="rounded-circle bg-white fs-6 text-danger"
                          style={{ position: "absolute", cursor: "pointer" }}
                        />

                        <img
                          className="border rounded "
                          src={`${imageURL}/${img}`}
                          width="50px"
                          alt="img"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-warning text-white my-5 align-self-center p-3"
            >
              {i18n.language === "en" ? `Update product` : `تحديث المنتج`}
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default AddProduct;
