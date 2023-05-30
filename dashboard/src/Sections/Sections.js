import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import SectionsServices from "../httpServices/sections.services";
import Layout from "../Layout/Layout";
import styles from "../Users/Users.module.css";
import {
  getSections,
  deletSection,
  addSection,
  getSubSections,
} from "../store/sectionsSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import i18n from "../Translation/i18n";
import { toast } from "react-toastify";
import { IoMdAddCircle } from "react-icons/io";
import { VscTypeHierarchySub } from "react-icons/vsc";
import SubSection from "./SubSection";
import AddSubSection from "./AddSubSection";

const Sections = () => {
  const [state, setState] = useState("");
  const [copy, setCopy] = useState([]);
  const dispatch = useDispatch();
  const { sections, stats } = useSelector((state) => state.sections);
  const { subSections } = useSelector((state) => state.sections);

  const formik = useFormik({
    initialValues: {
      sectionName: "",
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      SectionsServices.addSection(`category/add`, values.sectionName).then(
        (data) => {
          dispatch(addSection(data?.category));
        }
      );
      formik.resetForm({ values: { sectionName: "" } });
    },
  });
  useEffect(() => {
    if (sections.length === 0) {
      SectionsServices.allSections(`category/getAll`).then((res) => {
        dispatch(getSections(res.categories));
      });
    }
  }, [dispatch, sections, stats]);
  const getSubs = (id) => {
    SectionsServices.allSections(`category/getAllSub/${id}`).then((res) => {
      dispatch(getSubSections(res.subCategories))
    });
  };
  const deleteHandler = (section) => {
    SectionsServices.deleteSection(`category/delete/${section._id}`)
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
      section.name?.includes(e.target.value)
    );
    setCopy(filteredData);
  };

  return (
    <div>
      <Layout>
        <div className="m-3">
          <h4 className="mx-4">
            {i18n.language === "en" ? "Sections" : "الأقسام"}
          </h4>
          <div className={styles.Container}>
            <div className="d-flex flex-lg-row flex-column   justify-content-between">
              <button
                type="button"
                className="btn btn-warning text-white"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {i18n.language === "en" ? `Add section` : `إضافة قسم`}
              </button>

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
                        <div className="row mx-5">
                          <label>
                            {i18n.language === "en"
                              ? `Add section`
                              : `إضافة قسم`}
                          </label>
                          <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.sectionName}
                            name="sectionName"
                            type="text"
                            className="rounded border p-1 my-2 w-100"
                          />
                          {formik.errors.sectionName &&
                          formik.touched.sectionName ? (
                            <p className="text-danger">
                              {formik.errors.sectionName}
                            </p>
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
                          {i18n.language === "en"
                            ? "Save changes"
                            : "حفظ التعديلات"}
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
              {/* end of modal */}
              <div className={`${styles.SearchContainer}  mt-3 mt-lg-0`}>
                <span>
                  <AiOutlineSearch className="d-none d-lg-inline" />
                </span>
                <input
                  className={styles.Search}
                  type="search"
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
                      {i18n.language === "en" ? "Section" : "القسم"}
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
                          <td>{section?.name}</td>
                          <td>
                            {stats[section?.name] ? stats[section?.name][0] : 0}
                          </td>
                          <td>
                            {stats[section?.name] ? stats[section?.name][1] : 0}
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
                          <td>{section?.name}</td>
                          <td>
                            {stats[section?.name] ? stats[section?.name][0] : 0}
                          </td>
                          <td>
                            {stats[section?.name] ? stats[section?.name][1] : 0}
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

                            <RiDeleteBinLine
                              className={styles.Delete}
                              onClick={() => deleteHandler(section)}
                            />
                          </td>
                          <SubSection id={section._id} sub={subSections}/>
                          <AddSubSection id={section._id} />
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

export default Sections;
