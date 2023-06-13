import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import i18n from "../Translation/i18n";
import * as yup from 'yup'
import ReactQuill from "react-quill";

const AboutUs = () => {
    const formik = useFormik({
        initialValues:{
            title_ar:'',
            title_en:'',
            description_ar:'',
            description_en:'',
            type:'aboutus'
        },
        validationSchema: yup.object({
          title_ar: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`),
          title_en: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`),
          description_ar: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`),
          description_en: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`)
        }),
        onSubmit: (values) => {
            SiteAttachmentsServices.addSection(`section/add`, values).then((res) => {
        toast.success(i18n.language === 'en' ? res.success_en : res.success_ar);

              });
        }
    })
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
  return (
    <div>

        <form onSubmit={formik.handleSubmit}>
         {/* start of about us */}
         <div className="bg-white rounded p-3 my-3">
            <h4>{i18n.language === 'en' ? `About us` : `من نحن`}</h4>
          <div className="row m-3 ">
          <label className="form-label">{i18n.language === "en" ? `Title arabic` : `العنوان عربي`}</label>
            <input value={formik.values.title_ar} onChange={formik.handleChange} name='title_ar' type="text" className="form-control " />
            {formik.errors.title_ar && formik.touched.title_ar &&
              <p className="text-danger">{formik.errors.title_ar}</p>
            }
          </div>
          <div className="row m-3 ">
          <label className="form-label">{i18n.language === "en" ? `Title english` : `العنوان إنجليزي`}</label>
            <input value={formik.values.title_en} onChange={formik.handleChange} name='title_en' type="text" className="form-control " />
            {formik.errors.title_en && formik.touched.title_en &&
              <p className="text-danger">{formik.errors.title_en}</p>
            }
          </div>
          <div className="row m-3">
          <label className="form-label">{i18n.language === "en" ? `Description arabic` : `الوصف عربي`}</label>
            {/* <textarea rows={3} value={formik.values.description} onChange={formik.handleChange} name='description' type="text" className="form-control " /> */}
            <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    formats={formats}
                    modules={modules}

                    style={{ direction: "ltr", height:'100%' }}
                    value={formik.values.description_ar}
                    onBlur={formik.handleBlur}
                    
                    onChange={(e)=>formik.setFieldValue('description_ar', e)}
                  />
            {formik.errors.description_ar && formik.touched.description_ar &&
              <p className="text-danger">{formik.errors.description_ar}</p>
            }
          </div>
          <div className="row m-3">
          <label className="form-label">{i18n.language === "en" ? `Description english` : `الوصف إنجليزي`}</label>
            {/* <textarea rows={3} value={formik.values.description} onChange={formik.handleChange} name='description' type="text" className="form-control " /> */}
            <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    formats={formats}
                    modules={modules}

                    style={{ direction: "ltr", height:'100%' }}
                    value={formik.values.description_en}
                    onBlur={formik.handleBlur}
                    
                    onChange={(e)=>formik.setFieldValue('description_en', e)}
                  />
            {formik.errors.description_en && formik.touched.description_en &&
              <p className="text-danger">{formik.errors.description_en}</p>
            }
          </div>
          <button type="submit" className="btn btn-warning text-white  mx-4">
          {i18n.language === 'en' ? 'Save' : 'حفظ'}

          </button>
          </div>
          {/* end of about us */}
          </form>
    </div>
  )
}

export default AboutUs