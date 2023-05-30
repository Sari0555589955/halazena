import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import SiteAttachmentsServices from "../httpServices/siteAttachment.services";
import i18n from "../Translation/i18n";
import * as yup from 'yup'
import ReactQuill from "react-quill";

const Privacy = () => {
    const formik = useFormik({
        initialValues:{
            title:'',
            description:'',
            type:'privacy'
        }, validationSchema: yup.object({
          title: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`),
          description: yup.string().required(i18n.language === 'en' ? `*Required` : `*مطلوب`)
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

         {/* start of privacy and policy */}
         <div className="bg-white rounded p-3 my-3">
            <h4>{i18n.language === 'en' ? `Privacy and policy` : `سياسة الخصوصية`}</h4>
          <div className="row m-3 ">
          <label className="form-label">{i18n.language === "en" ? `Title` : `العنوان`}</label>
            <input value={formik.values.title} onChange={formik.handleChange} name='title' type="text" className="form-control " />
            {formik.errors.title && formik.touched.title &&
              <p className="text-danger">{formik.errors.title}</p>
            }
          </div>
          <div className="row m-3 ">
          <label className="form-label">{i18n.language === "en" ? `Description` : `الوصف`}</label>
            {/* <textarea value={formik.values.description} onChange={formik.handleChange} name='description' rows={3} type="text" className="form-control " /> */}
            <ReactQuill
                    // className="border form-control rounded"
                    theme="snow"
                    formats={formats}
                    modules={modules}
                    
                    style={{ direction: "ltr", height:'100%' }}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    
                    onChange={(e)=>formik.setFieldValue('description', e)}
                  />
            {formik.errors.description && formik.touched.description &&
              <p className="text-danger">{formik.errors.description}</p>
            }
          </div>
          <button type="submit" className="btn btn-warning text-white mx-4">
            save
          </button>
          </div>
          {/* end of privacy and policy */}
          </form>
    </div>
  )
}

export default Privacy