import { useFormik } from "formik";
import { useState } from "react";
import { imageURL } from "..";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import styles from "./SiteAttachments.module.css";
import i18n from "../Translation/i18n";
import * as yup from 'yup'
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const Banner = () => {
  const [banner, setBanner] = useState('');
  const uploadBanner = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    SiteAttachmentsServices.upload("upload", data).then((res) => {
      // setBanner([...banner, res.filename]);
      formik.setFieldValue("image", res.filename);
    });
  };
  const delPic = (img) => {
    formik.setFieldValue("image",'')
  }
  const formik = useFormik({
    initialValues: {
      type: "banner",
      alignment: "",
      image: "",
    },
    validationSchema: yup.object({
      image: yup.string().required(i18n.language === 'en' ? `*Required` : `* مطلوب`),
      alignment: yup.string().required(i18n.language === 'en' ? `*Required` : `* مطلوب`)
    }),
    
    onSubmit: (values) => {
      SiteAttachmentsServices.addSection(`section/add`, values).then((res) => {
        toast.success(i18n.language === 'en' ? res.success_en : res.success_ar);
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
                <option value='horizontal'>{i18n.language === 'en' ? `horizontal` : `أفقي`}</option>
                <option value='vertical'>{i18n.language === 'en' ? `vertical` : `عمودي`}</option>
              </select>
              {
                formik.errors.alignment && formik.touched.alignment &&
                <p className="text-danger">{formik.errors.alignment}</p>
              }
            </div>
           
          </div>
          <div className={`${styles.Wrapper} ${styles.ImgForAll} d-block h-100`}>
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
              {
                formik.errors.image && formik.touched.image &&
                <p className="text-danger">{formik.errors.image}</p>
              }
          </div>
          {formik.values.image && (
            <div
              className={`${styles.PicsContainer} my-5 p-3 flex-wrap d-flex justify-content-start align-items-center`}
            >
                <div className="d-flex flex-column h-100">
                  <AiFillDelete
                        onClick={() => delPic(formik.values.image)}
                        className="rounded-circle bg-white fs-6 text-danger"
                        style={{ position: "absolute", cursor: "pointer" }}
                      />
                  <img
                    src={`${imageURL}/${formik.values.image}`}
                    className="border rounded p-1 "
                    alt="Slider"
                    style={{width:'100%', height:'100%'}}
                  />
                </div>
            </div>
          )}
          <button type="submit" className="btn btn-warning text-white my-3">
          {i18n.language === 'en' ? 'Save' : 'حفظ'}

          </button>
        </div>
        {/* end of banner pics section */}
      </form>
    </div>
  );
};

export default Banner;
