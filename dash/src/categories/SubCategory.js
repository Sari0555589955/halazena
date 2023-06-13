import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CategoriesServices from "../httpServices/categories.services";
import { deletSubSection } from "../store/sectionsSlice";
import i18n from "../Translation/i18n";
import styles from "../Users/Users.module.css";

const SubSection = ({ id, sub }) => {
  const dispatch = useDispatch();
  const deleteSub = (id) => {
    CategoriesServices.deleteSection(`category/delete/${id}`)
      .then((res) => {
        toast.success(
          i18n.language === "en" ? res?.success_en : res?.success_ar
        );
        dispatch(deletSubSection(id));
      })
      .catch((e) => {
        toast.error(
          i18n.language === "en"
            ? e.response?.data?.error_en
            : e.response?.data?.error_ar
        );
      });
  };
  return (
    <div
      class="modal fade"
      id={"Sub" + id}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id={"Sub" + id}>
              {i18n.language === "en" ? "Sub sections" : "الأقسام الفرعية"}
            </h1>
          </div>
          <div class="modal-body">
            {sub.length > 0 ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                      {i18n.language === "en" ? "Sub section" : "القسم الفرعي"}
                    </th>
                    <th scope="col">
                      {i18n.language === "en" ? "Products" : "المنتجات"}
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {sub &&
                    sub.map((s, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{s[`name_${i18n.language}`]}</td>
                        <td>{!s?.count ? "0" : s?.count}</td>
                        <td>
                          <RiDeleteBinLine
                            className={styles.Delete}
                            onClick={() => deleteSub(s._id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <h5 className="text-danger">
                {i18n.language === "en"
                  ? "There are no sub sections"
                  : "لا يوجد أقسام فرعيه"}
              </h5>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSection;
