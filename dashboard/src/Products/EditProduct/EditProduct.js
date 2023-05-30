import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "../..";
import Layout from "../../Layout/Layout";
import "../AddProduct/AddProduct.css";
import ProductServices from "../../httpServices/product.sevices";
import SectionsServices from "../../httpServices/sections.services";
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
  const [value, setValue] = useState();

  // const parser = new DOMParser()
  // const description = parser.parseFromString(
  //   product?.description,
  //   'text/html',
  //   )
  //   const chaild = description.lastChild.lastChild

  useEffect(() => {
    if (sections?.length === 0) {
      SectionsServices.allSections(`category/getAll`).then((res) => {
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
      title: "",
      category: "",
      sub: "",
      // description: "",
      smallDesc: "",
      price: "",
      images: [],
      payInCash: "",
    },
    validationSchema: yup.object({
      title: yup
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
      smallDesc: yup
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
      values = { ...values, description: value, attributes: attrs };
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
  const [colors, setColors] = useState({ key: "color", values: [] });
  const [sizes, setSizes] = useState({ key: "size", values: [] });
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [customName, setCustomName] = useState("");
  const [custom, setCustom] = useState("");
  const [customs, setCustoms] = useState({ key: customName, values: [] });
  const [pickedAttr, setPickedAttr] = useState();

  const addColor = () => {
    // setColors({...colors, value:colors.value.push(color)});
    color.length !== 0 && colors.values.push(color);
    setColor("");
  };
  const deleteColor = (clr) => {
    const updatedColors = colors.values.filter((color) => color !== clr);
    setColors({ ...colors, values: updatedColors });
  };
  const addSize = () => {
    size.length !== 0 && sizes.values.push(size);
    setSize("");
  };
  const deleteSize = (siz) => {
    const updatedSizes = sizes.values.filter((size) => size !== siz);
    setSizes({ ...sizes, values: updatedSizes });
  };
  const addCustom = () => {
    custom.length !== 0 &&
      customName.length !== 0 &&
      customs.values.push(custom);
    customs.key = customName;
    setCustom("");
  };
  const deleteCustom = (cust) => {
    const updatedCustoms = customs.values.filter((custom) => custom !== cust);
    setCustoms({ ...customs, values: updatedCustoms });
  };
  const [attrs, setAttrs] = useState([]);
  useEffect(() => {
    setAttrs([colors, sizes, customs]);
  }, [colors, sizes, customs]);

  useEffect(() => {
    formik.setFieldValue("title", product?.title);
    formik.setFieldValue("category", product?.category?.name);
    formik.setFieldValue("sub", product?.sub?._id);
    formik.setFieldValue("smallDesc", product?.smallDesc);
    formik.setFieldValue("price", product?.price);
    formik.setFieldValue("images", product.images);
    formik.setFieldValue("payInCash", product?.payInCash);
    setValue(product?.description);
    // formik.setFieldValue("description", value);
    product?.attributes &&
      product?.attributes[0]?.values &&
      (colors.values = product?.attributes[0]?.values);
    product?.attributes &&
      product?.attributes[1]?.values &&
      (sizes.values = product?.attributes[1]?.values);
    product?.attributes &&
      product?.attributes[2]?.key &&
      setCustomName(product?.attributes[2]?.key);
    product?.attributes &&
      product?.attributes[2]?.values &&
      (customs.values = product?.attributes[2]?.values);
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

  const { subSections } = useSelector((state) => state.sections);
  
  const category = sections.find((cat) => cat.name === formik.values.category);
  
  useEffect(() => {
  
    SectionsServices.allSections(`category/getAllSub/${category?._id}`).then(
      (res) => {
        dispatch(getSubSections(res.subCategories));
      }
    );
    
  }, [dispatch, category]);
  return (
    <div>
      <Layout>
        <div className="m-3 bg-white p-5 rounded">
        <form
                className="d-flex flex-column "
                onSubmit={formik.handleSubmit}
              >
          <h3>{i18n.language === "en" ? `Edit product` : `تعديل المنتج`}</h3>
          <hr />
          <div className="row">
            <div className="col-lg-6 col-12 my-2">
             
                <div className="my-2 w-100">
                  <label htmlFor="text" className="d-block">
                    {i18n.language === "en" ? `Product name` : `إسم المنتج`}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded w-100"
                  />
                  {formik.errors.title && formik.touched.title && (
                    <p className="text-danger">{formik.errors.title}</p>
                  )}
                </div>
                <div className="my-2  w-100">
                  <label htmlFor="smallDesc" className="d-block">
                    {i18n.language === "en" ? `Breef` : `وصف مختصر`}
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    name="smallDesc"
                    value={formik.values.smallDesc}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border form-control rounded"
                  />
                  {formik.errors.smallDesc && formik.touched.smallDesc && (
                    <p className="text-danger">{formik.errors.smallDesc}</p>
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
                      <option key={section._id}>{section.name}</option>
                    ))}
                  </select>
                  {formik.errors.category && formik.touched.category && (
                    <p className="text-danger">{formik.errors.category}</p>
                  )}
                </div>

                {/* Sub Start */}

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
                    {subSections?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.sub && formik.touched.sub && (
                    <p className="text-danger">{formik.errors.sub}</p>
                  )}
                </div>

                {/* Sub end */}

                {/* ATTR */}
                <div className="my-2 w-100">
                  <select
                    className="border rounded w-100 form-select"
                    onChange={(e) => setPickedAttr(e.target.value)}
                    name="attributes"
                    value={pickedAttr}
                  >
                    <option selected hidden>
                      {i18n.language === "en" ? "Add Attribute" : "إضافة معيار"}
                    </option>
                    <option value="color">
                      {i18n.language === "en" ? "Color" : "لون"}
                    </option>
                    <option value="size">
                      {i18n.language === "en" ? "Size" : "مقاس"}
                    </option>
                    <option value="custom">
                      {i18n.language === "en"
                        ? "Custom Attribute"
                        : "معيار مخصص"}
                    </option>
                  </select>
                </div>
                {pickedAttr === "color" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex gap-3">
                      <input
                        type="text"
                        // name="attributes"
                        value={color}
                        // onBlur={formik.handleBlur}
                        onChange={(e) => setColor(e.target.value)}
                        className="border form-control rounded w-100"
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={addColor}
                      >
                        {i18n.language === "en" ? "Add" : "إضافة"}
                      </button>
                    </div>
                    <div className="d-flex gap-2 p-3 flex-wrap">
                      {colors.values &&
                        colors.values.map((color) => (
                          <div
                            style={{ width: "auto", wordBreak: "break-word" }}
                            className="border rounded p-2 d-flex align-items-center justify-content-between"
                          >
                            <span>{color}</span>
                            <span
                              style={{
                                color: "red",
                                fontSize: "20px",
                                alignSelf: "start",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteColor(color)}
                            >
                              <TiDelete />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {pickedAttr === "size" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex gap-3">
                      <input
                        type="text"
                        // name="attributes"
                        value={size}
                        // onBlur={formik.handleBlur}
                        onChange={(e) => setSize(e.target.value)}
                        className="border form-control rounded w-100"
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={addSize}
                      >
                        {i18n.language === "en" ? "Add" : "إضافة"}
                      </button>
                    </div>
                    <div className="d-flex gap-2 p-3 flex-wrap">
                      {sizes.values &&
                        sizes.values.map((size) => (
                          <div
                            style={{ width: "auto", wordBreak: "break-word" }}
                            className="border rounded p-2 d-flex align-items-center justify-content-between"
                          >
                            <span>{size}</span>
                            <span
                              style={{
                                color: "red",
                                fontSize: "20px",
                                alignSelf: "start",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteSize(size)}
                            >
                              <TiDelete />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {pickedAttr === "custom" && (
                  <div className=" my-2 w-100">
                    <div className="d-flex flex-column gap-3">
                      <input
                        type="text"
                        value={customName}
                        placeholder={
                          i18n.language === "en"
                            ? "Attribute name"
                            : "إسم المعيار"
                        }
                        onChange={(e) => setCustomName(e.target.value)}
                        className="border form-control rounded w-100"
                      />
                      <input
                        type="text"
                        value={custom}
                        placeholder={
                          i18n.language === "en" ? "Attribute" : "المعيار"
                        }
                        onChange={(e) => setCustom(e.target.value)}
                        className="border form-control rounded w-100"
                      />
                      <button
                        className="btn btn-primary "
                        type="button"
                        onClick={addCustom}
                      >
                        {i18n.language === "en" ? "Add" : "إضافة"}
                      </button>
                    </div>
                    <div className="d-flex gap-2 p-3 flex-wrap">
                      {customs.values &&
                        customs?.values?.map((custom) => (
                          <div className="border rounded p-2 d-flex align-items-center justify-content-between">
                            <span>{custom}</span>
                            <span
                              style={{
                                color: "red",
                                fontSize: "20px",
                                alignSelf: "start",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteCustom(custom)}
                            >
                              <TiDelete />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {/* END */}
                <div className="my-2  w-100">
                  <label htmlFor="description" className="d-block">
                    {i18n.language === "en" ? `Description` : `تفاصيل المنتج`}
                  </label>
                  <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    id="description"
                    formats={formats}
                    modules={modules}
                    style={{ direction: "ltr" }}
                    value={value}
                    onBlur={formik.handleBlur}
                    onChange={setValue}
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
                    <div className="d-flex justify-content-center align-items-center">
                      <h3>Click to add photos</h3>
                    </div>
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
