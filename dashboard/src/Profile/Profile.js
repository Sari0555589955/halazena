import { useFormik } from "formik";
import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import UserService from "../httpServices/user.services";


const Profile = () => {
  const navigate = useNavigate();
  const { me } = useSelector((state) => state.getMe);
  useEffect(() => {
    formik.setFieldValue('firstName', me?.firstName)
    formik.setFieldValue('lastName', me?.lastName)
    formik.setFieldValue('userName_en', me?.userName_en)
    formik.setFieldValue('phone', me?.phone)
    formik.setFieldValue('email', me?.email)
  }, [me])

  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName_en: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string(),
      lastName: yup.string(),
      userName_en: yup.string(),
      phone: yup
        .number()
        .typeError(
          i18n.language === "en"
            ? `Phone number must contain numbers only`
            : "رقم الجوال يجب أن يحتوي على أرقام فقط"
        ),
      email: yup
        .string()
        .email(
          i18n.language === "en"
            ? `Should be valid email`
            : `يجب أن يكون بريد إلكتروني صحيح`
        ),
      password: yup
        .string()
        .min(
          6,
          i18n.language === "en"
            ? `Password is too short`
            : `كلمة المرور قصيرة جدًا`
        ),
    }),
    onSubmit: (values) => {
      if (!values.password) {
        delete values[`password`]
      }
      UserService.updateUser(`user/update/${me._id}`, values).then(res => {
      })
    },
  });
  return (
    <div>
      <Layout>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="m-3 p-5 bg-white row  d-flex justify-content-center align-items-center">
            <div className="col-lg-6 my-3 col-12 ">
            <label className="form-label" htmlFor="firstName">
                {i18n.language === "en" ? "First name" : `الإسم الأول`}
              </label>
              <input
                type="text"
                id="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="form-control p-3"
              />
             
            </div>
            <div className="col-lg-6 my-3 col-12 ">
            <label className="form-label" htmlFor="lastName">
                {i18n.language === "en" ? "Last name" : `الإسم الأخير`}
              </label>
              <input
                type="text"
                id="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="form-control p-3"
                />
             
            </div>
            <div className="col-lg-6 my-3 col-12 ">
             
              <label className="form-label" htmlFor="userName_en">
                {i18n.language === "en" ? "User name" : `إسم المستخدم`}
              </label>
              <input
                type="text"
                id="userName_en"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName_en}
                className="form-control p-3"

              />
            </div>
            <div className="col-lg-6 my-3 col-12 ">
             
              <label className="form-label" htmlFor="phone">
                {i18n.language === "en" ? "Phone number" : `رقم الجوال`}
              </label>
              <input
                type="text"
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="form-control p-3"

              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-danger">{formik.errors.phone}</p>
              )}
            </div>
            <div className="col-lg-6 my-3 col-12 ">
              
              <label className="form-label" htmlFor="email">
                {i18n.language === "en" ? "Email" : `البريد الإلكتروني`}
              </label>
              <input
                type="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="form-control p-3"
                
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-danger">{formik.errors.email}</p>
              )}
            </div>
            <div className="col-lg-6 my-3 col-12 ">
             
              <label className="form-label" htmlFor="password">
                {i18n.language === "en" ? "Password" : `كلمة المرور`}
              </label>
              <input
                type="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="form-control p-3"

              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-danger">{formik.errors.password}</p>
              )}
            </div>
            <div className="d-flex flex-lg-row flex-column  m-5 justify-content-end">
              <button type="submit" className="btn btn-warning text-white m-2" onClick={()=>navigate(-1)}>
                {i18n.language === "en" ? `Save changes` : `حفظ التغييرات`}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-danger m-2"
              >
                {i18n.language === "en" ? `Cancel` : `إلغاء`}
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Profile;
