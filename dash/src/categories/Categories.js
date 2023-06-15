import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import CategoriesServices from "../httpServices/categories.services";
import Layout from "../Layout/Layout";
import styles from "../Users/Users.module.css";
import {
  getSections,
  deletSection,
  addSection,
  getSubSections,
} from "../store/sectionsSlice";
import { AiTwotoneEdit } from "react-icons/ai";
import * as yup from "yup";
import { useFormik } from "formik";
import i18n from "../Translation/i18n";
import { toast } from "react-toastify";
import { IoMdAddCircle } from "react-icons/io";
import { VscTypeHierarchySub } from "react-icons/vsc";
import SubCategory from "./SubCategory";
import AddSubCategory from "./AddSubCategory";
import AddCategoryModal from "./AddCategoryModal";
import { useNavigate } from "react-router";
import { imageURL } from "..";
import EditCategoryModal from "./EditCategoryModal";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const [state, setState] = useState("");
  const [copy, setCopy] = useState([]);
  const dispatch = useDispatch();
  const { sections, stats } = useSelector((state) => state.sections);
  const { subSections } = useSelector((state) => state.sections);
  const [editedCategory, setEditedCategory] = useState({});

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
      CategoriesServices.addSection(`category/add`, formik.values).then(
        (data) => {
          dispatch(addSection(data?.category));
        }
      );
      formik.resetForm();
    },
  });
  useEffect(() => {
    if (sections.length === 0) {
      CategoriesServices.allSections(`category/getAll`).then((res) => {
        dispatch(getSections(res.categories));
      });
    }
  }, [dispatch, sections, stats]);
  const getSubs = (id) => {
    CategoriesServices.allSections(`category/getAllSub/${id}`).then((res) => {
      dispatch(getSubSections(res.subCategories));
    });
  };
  const deleteHandler = (section) => {
    CategoriesServices.deleteSection(`category/delete/${section._id}`)
      .then((_) => {
        dispatch(deletSection(section._id));
      })
      .catch((e) => {
        toast.error(
          i18n.language === "en"
            ? e?.response?.data?.error_en
            : e?.response?.data?.error_ar,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "err",
          }
        );
      });
  };
  const handleInputChange = (e) => {
    setState(e.target.value);

    let filteredData = sections.filter((section) =>
      section[`name_${i18n.language}`].includes(e.target.value)
    );
    setCopy(filteredData);
  };

  return (
    <div>
      <Layout>
        <div className="m-3">
          <h4 className="mx-4">
            {i18n.language === "en" ? "Categories" : "الفئات"}
          </h4>
          <div className={styles.Container}>
            {editedCategory && <EditCategoryModal category={editedCategory} />}
            <div className="d-flex flex-lg-row flex-column   justify-content-between">
              <button
                type="button"
                className="btn btn-warning text-white"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {i18n.language === "en" ? `Add Category` : `إضافة فئة`}
              </button>

              <AddCategoryModal formik={formik} i18n={i18n} />
              {/* end of modal */}
              <div className={`${styles.SearchContainer}  mt-3 mt-lg-0`}>
                <span>
                  <AiOutlineSearch className="d-none d-lg-inline" />
                </span>
                <input
                  className={styles.Search}
                  type="search"
                  value={state}
                  onChange={handleInputChange}
                  placeholder={i18n.language === "en" ? "Search..." : "بحث ..."}
                />
              </div>
            </div>
            <div className={styles.Table}>
              <table className="table mt-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">{i18n.language === "en" ? "Name" : "الإسم"}</th> */}
                    <th scope="col">
                      {i18n.language === "en" ? "Icon" : "أيقونة"}
                    </th>
                    <th scope="col">
                      {i18n.language === "en" ? "Category" : "الفئة"}
                    </th>
                    <th scope="col">
                      {i18n.language === "en" ? "Products" : "المنتجات"}
                    </th>
                    {/* <th scope="col">{i18n.language === "en" ? "status" : "الحالة"}</th> */}
                    <th scope="col">
                      {i18n.language === "en"
                        ? "Total sales"
                        : "إجمالي المبيعات"}
                    </th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {state !== ""
                    ? copy?.length > 0 &&
                      copy?.map((section, index) => (
                        <tr key={section?._id}>
                          <th scope="row">{index + 1}</th>
                          <th>
                            <img
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              src={imageURL + section?.image}
                            />
                          </th>
                          <td>{section[`name_${i18n.language}`]} </td>
                          <td>
                            {stats[section?.name_en]
                              ? stats[section?.name_en][0]
                              : 0}
                          </td>
                          <td>
                            {stats[section?.name_en]
                              ? stats[section?.name_en][1]
                              : 0}
                            $
                          </td>

                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <IoMdAddCircle
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              className={styles.Add}
                            />
                            <VscTypeHierarchySub
                              className={styles.Sub}
                              data-bs-toggle="modal"
                              data-bs-target={"#Sub" + section._id}
                              type="button"
                              onClick={() => getSubs(section?._id)}
                            />
                            <AiTwotoneEdit
                              data-bs-toggle="modal"
                              data-bs-target="#editCategory"
                              className={styles.Sub}
                              style={{ fontSize: "1.5em", cursor: "pointer" }}
                              color="white"
                              onClick={() => {
                                setEditedCategory(section);
                                setState("");
                              }}
                            />
                            <RiDeleteBinLine
                              id="liveAlertBtn"
                              className={styles.Delete}
                              onClick={() => deleteHandler(section)}
                            />
                          </td>
                        </tr>
                      ))
                    : sections?.map((section, index) => (
                        <tr key={section._id}>
                          <th scope="row">{index + 1}</th>
                          <th>
                            <img
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              src={imageURL + section?.image}
                            />
                          </th>
                          <td>{section[`name_${i18n.language}`]}</td>
                          <td>
                            {stats[section?.name_en]
                              ? stats[section?.name_en][0]
                              : 0}
                          </td>
                          <td>
                            {stats[section?.name_en]
                              ? stats[section?.name_en][1]
                              : 0}
                            $
                          </td>

                          <td className="d-flex gap-3 justify-content-center align-items-center">
                            <IoMdAddCircle
                              data-bs-toggle="modal"
                              data-bs-target={"#Add" + section._id}
                              className={styles.Add}
                              onClick={() => getSubs(section?._id)}
                            />
                            <VscTypeHierarchySub
                              className={styles.Sub}
                              data-bs-toggle="modal"
                              data-bs-target={"#Sub" + section._id}
                              type="button"
                              onClick={() => getSubs(section?._id)}
                            />

                            <AiTwotoneEdit
                              data-bs-toggle="modal"
                              data-bs-target="#editCategory"
                              className={styles.Sub}
                              style={{ fontSize: "1.5em", cursor: "pointer" }}
                              color="white"
                              onClick={() => {
                                setEditedCategory(section);
                                setState("");
                              }}
                            />

                            <RiDeleteBinLine
                              className={styles.Delete}
                              onClick={() => deleteHandler(section)}
                            />
                          </td>
                          <SubCategory id={section._id} sub={subSections} />
                          <AddSubCategory id={section._id} />
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Categories;
