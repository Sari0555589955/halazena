import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { imageURL } from "..";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import styles from "./SiteAttachments.module.css";
import i18n from "../Translation/i18n";
import { toast } from "react-toastify";

const EditSlider = ({ singleSlider }) => {
  const [slider, setSlider] = useState();
  let formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      SiteAttachmentsServices.updateSection(`section/update/${singleSlider._id}`,values).then(res => {
        toast.success(i18n.language === 'en' ? res.success_en : res.success_ar)
      })
    },
  });
  useEffect(() => {
    formik.setValues({title:singleSlider?.title,description:singleSlider?.description,image:singleSlider?.image})
    setSlider(singleSlider?.image);
  }, [singleSlider]);
  const uploadSlider = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SiteAttachmentsServices.upload("upload", data).then((res) => {
      setSlider(res.filename);
      formik.setFieldValue("image", res.filename);
    });
  };
  
  return (
    <div>
        {/* <!-- Modal --> */}
      <form onSubmit={formik.handleSubmit}>

        <div
          className="modal fade"
          id={+singleSlider._id}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {singleSlider.title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column">

                <div
                  className={`${styles.Wrapper} ${styles.ImgForAll} d-block my-3`}
                >
                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="p-3"
                  >
                    {
                      <img
                        src={`${imageURL}/${slider}`}
                        className={styles.Slider}
                        alt="slider"
                      />
                    }
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className={`${styles.ImgForAll} ${styles.Input}`}
                    onChange={(e) => uploadSlider(e)}
                  />
                </div>
                <label className="form-label mt-4">
                  {i18n.language === "en" ? `Title` : `العنوان`}
                </label>
                <input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  type="text"
                  className="form-control"
                />
                <label className="form-label mt-4">
                  {i18n.language === "en" ? `Description` : `الوصف`}
                </label>
                <textarea
                  rows={3}
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="form-control"
                />

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* end of modal */}
    </div>
  );
};

export default EditSlider;
