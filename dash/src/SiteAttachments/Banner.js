import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { imageURL } from "..";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import styles from "./SiteAttachments.module.css";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanners } from "../store/SiteAttachments";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.siteAttachments);
  useEffect(() => {
    SiteAttachmentsServices.getAll(`section/getAll`).then((res) => {
      dispatch(
        getBanners(res.sections.filter((section) => section.type === "banner"))
      );
    });
  }, [dispatch]);
  console.log(banners);
  const uploadBanner = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SiteAttachmentsServices.upload("upload", data).then((res) => {
      // setBanner([...banner, res.filename]);
      formik.setFieldValue("image", res.filename);
    });
  };
  const deleteImg = (id) => {
    dispatch(deleteBanner(id));
    SiteAttachmentsServices.deleteSection(`section/delete/${id}`).then(
      (res) => {
        toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
      }
    );
  };
  const formik = useFormik({
    initialValues: {
      type: "banner",
      alignment: "",
      image: "",
    },
    validationSchema: yup.object({
      image: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `* مطلوب`),
      alignment: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `* مطلوب`),
    }),

    onSubmit: (values) => {
      SiteAttachmentsServices.addSection(`section/add`, values).then((res) => {
        toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* start of banner pics section */}
        <div className="bg-white rounded p-3 my-3">
          <div className="row ">
            <h4>{i18n.language === "en" ? `Add banner` : `إضافة بانر`}</h4>
            <div className="dropdown d-flex m-3 justify-content-end flex-column w-auto">
              <select
                className="btn dropdown-toggle w-auto"
                style={{ backgroundColor: "#FFFAED", color: "#F8B407" }}
                data-bs-toggle="dropdown"
                value={formik.values.alignment}
                name="alignment"
                onChange={formik.handleChange}
                aria-expanded="false"
              >
                <option defaultValue={true} hidden>
                  {i18n.language === "en" ? `Choose` : `إختر`}
                </option>
                <option value="horizontal">
                  {i18n.language === "en" ? `horizontal` : `أفقي`}
                </option>
                <option value="vertical">
                  {i18n.language === "en" ? `vertical` : `عمودي`}
                </option>
              </select>
              {formik.errors.alignment && formik.touched.alignment && (
                <p className="text-danger">{formik.errors.alignment}</p>
              )}
            </div>
          </div>
          <div
            className={`${styles.Wrapper} ${styles.ImgForAll} d-block h-100`}
          >
            <div>
              <div className={`${styles.PlaceHolder} ${styles.ImgForAll}`}>
                Please choose an Image
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className={`${styles.ImgForAll} ${styles.Input}`}
              onChange={(e) => uploadBanner(e)}
            />
            {formik.errors.image && formik.touched.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>
          <div className="d-flex justify-content-start align-items-center">
            {banners.map(
              (banner) =>
                banner && (
                  <div className="dis">
                    <p>
                      {banner.alignment === "vertical"
                        ? i18n.language === "en"
                          ? "Vertical"
                          : "عمودي"
                        : i18n.language === "en"
                        ? "Horizontal"
                        : "أفقي"}
                    </p>
                    <div key={banner._id} className=" col-2">
                      <AiFillDelete
                        className="rounded-circle fs-5 text-danger"
                        onClick={() => deleteImg(banner._id)}
                        style={{
                          position: "absolute",
                          top: "15",
                          left: "15",
                          cursor: "pointer",
                          backgroundColor: "#e1e9fc",
                          padding: "1px",
                        }}
                      />
                      <img
                        src={`${imageURL}/${banner?.image}`}
                        className="rounded p-1 mx-3"
                        alt="banner"
                        style={{ cursor: "pointer", width: "100%" }}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
          <button type="submit" className="btn btn-warning text-white my-3">
            {i18n.language === "en" ? "Save" : "حفظ"}
          </button>
        </div>
        {/* end of banner pics section */}
      </form>
    </div>
  );
};

export default Banner;
