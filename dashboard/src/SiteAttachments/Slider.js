import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "..";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import { addSlider, deleteSlider, getSliders } from "../store/SiteAttachments";
import EditSlider from "./EditSlider";
import styles from "./SiteAttachments.module.css";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { toast } from "react-toastify";

const Slider = () => {
  const [slider, setSlider] = useState("");
  const [singleSlider, setSingleSlider] = useState({});
  const { sliders } = useSelector((state) => state.siteAttachments);
  const dispatch = useDispatch();

  useEffect(() => {
    SiteAttachmentsServices.getAll(`section/getAll`).then((res) => {
      dispatch(
        getSliders(res.sections.filter((section) => section.type === "slider"))
      );
    });
  }, [dispatch]);
  const uploadSlider = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SiteAttachmentsServices.upload("upload", data).then((res) => {
      setSlider(res.filename);
      formik.setFieldValue("image", res.filename);
    });
  };

  const clickOnPic = (slider) => {
    setSingleSlider(slider);
  };

  const formik = useFormik({
    initialValues: {
      image: slider,
      type: "slider",
      title: "",
      description: "",
    },
    validationSchema: yup.object({
      image: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `*مطلوب`),
    }),
    onSubmit: (values, { resetForm }) => {
      SiteAttachmentsServices.addSection(`section/add`, values).then((res) => {
        dispatch(addSlider(res.section));
        toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
      });
      resetForm();
      setSlider("");
    },
  });

  const deleteImg = (img) => {
    dispatch(deleteSlider(img._id));
    SiteAttachmentsServices.deleteSection(`section/delete/${img._id}`).then(
      (res) => {
        toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
      }
    );
  };

  return (
    <div>
      {singleSlider && <EditSlider singleSlider={singleSlider} />}
    

      {/* start of slider pics section */}
      <div className="bg-white rounded p-3 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="row mx-4">
            <h4>{i18n.language === "en" ? `Add slider` : `إضافة سلايدر`}</h4>
            <div
              className={`${styles.Wrapper} ${styles.ImgForAll} d-block my-3`}
            >
              <div className="h-100 w-100">
                {formik.errors.image && formik.touched.image && (
                  <p className="text-danger">{formik.errors.image}</p>
                )}
                {!slider ? (
                  <div className={`${styles.PlaceHolder} ${styles.ImgForAll}`}>
                    Please choose an Image
                  </div>
                ) : (
                  <img
                    src={`${imageURL}/${slider}`}
                    className={styles.Slider}
                    alt="slider"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className={`${styles.ImgForAll} ${styles.Input}`}
                onChange={(e) => uploadSlider(e)}
              />
            </div>
            <div className={`${styles.PicsContainer} my-2 row`}>
              {sliders &&
                sliders.map((img) => (
                  <div key={img._id} className=" col-2">
                    <AiFillDelete
                      className="rounded-circle fs-5 text-danger"
                      onClick={() => deleteImg(img)}
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
                      src={`${imageURL}/${img.image}`}
                      className="rounded p-1 m-3"
                      alt="Slider"
                      data-bs-toggle="modal"
                      data-bs-target={`#${+img?._id}`}
                      onClick={() => clickOnPic(img)}
                      style={{ cursor: "pointer", width: "100%" }}
                    />
                  </div>
                ))}
              
            </div>

            {/* end of modal */}
          </div>
          {/* end of slider pics section */}

          {/* start of slider title */}
          <div className=" p-3 my-3">
            <div className="row m-3 ">
              <label className="form-label">
                {i18n.language === "en" ? `Slider title` : `عنوان السلايدر`}
              </label>

              <input
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                type="text"
                className="form-control "
              />
            </div>
          </div>
          {/* end of slider title */}

          {/* start of slider desc */}
          <div className=" p-3 my-3">
            <div className="row m-3 ">
              <label className="form-label">
                {i18n.language === "en" ? `Slider description` : `وصف السلايدر`}
              </label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={3}
                type="text"
                className="form-control "
              />
            </div>
          </div>
          <button type="submit" className="btn btn-warning text-white mx-4">
            save
          </button>
        </form>
      </div>
      {/* end of slider desc */}
    </div>
  );
};

export default Slider;
