import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import i18n from "../Translation/i18n";
import styles from "../Users/Users.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { addAdmin, deleteAdmin, getAdmins } from "../store/UsersSlice";
import UserService from "../httpServices/user.services";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Admins = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.users);
  const { me } = useSelector((state) => state.getMe);
console.log(me)
  useEffect(() => {
    UserService.getUsers(`user/getAll/admins`).then((res) => {
      if (res) {
        dispatch(
          getAdmins(
            Object.values(res.users).map((user) => {
              return { ...user.user, totalRevinue: user.totalRevinue };
            })
          )
        );
      }
    });
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fullName_en: "",
      userName_en: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `*مطلوب`),
      lastName: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `*مطلوب`),
      userName_en: yup
        .string()
        .required(i18n.language === "en" ? `*Required` : `*مطلوب`),
      email: yup
        .string()
        .email(
          i18n.language === "en"
            ? `Must be a valid email`
            : "يجب ان يكون إيميل صحيح"
        )
        .required(i18n.language === "en" ? `*Required` : `*مطلوب`),
      phone: yup
        .number()
        .typeError(
          i18n.language === "en"
            ? `Phone must contain numbers only`
            : `رقم الجوال يجب ان يحتوي على ارقام فقط`
        )
        .required(i18n.language === "en" ? "*Required" : "*مطلوب"),
      password: yup
        .string()
        .required(i18n.language === "en" ? "*Required" : "*مطلوب"),
      role: yup
        .string()
        .required(i18n.language === "en" ? "*Required" : "*مطلوب"),
    }),
    onSubmit: (values) => {
      values.fullName_en = `${
        values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1)
      } ${values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1)}`;
      UserService.addAdmin(`user/addUserWithRole`, values).then((data) => {
        dispatch(addAdmin(data.user));
        toast.success(
          i18n.language === "en" ? data.success_en : data.success_ar
        );
      });
      formik.resetForm({ values: "" });
    },
  });

  const delAdmin = (id) => {
    UserService.deleteUser(`user/delete/admin/${id}`).then(res => {
      toast.success(i18n.language === 'en' ? res.success_en : res.success_ar)
      dispatch(deleteAdmin(id))
    })
  }
  return (
    <Layout>
      <div className="m-3 w-100">
        <h4 className="m-4">
          {i18n.language === "en" ? "Admins" : "المشرفين"}
        </h4>

        <div className={styles.Container}>
          <button
            type="button"
            className="btn btn-warning text-white"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            {i18n.language === "en" ? `Add Admin` : `إضافة مشرف`}
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
                      <div className="col-lg-6 col-12 ">
                        <label className="d-block">
                          {i18n.language === "en"
                            ? `First name`
                            : `الإسم الأول`}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                          name="firstName"
                          type="text"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (
                          <p className="text-danger">
                            {formik.errors.firstName}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-lg-6 col-12">
                        <label className="d-block">
                          {i18n.language === "en"
                            ? `Last name`
                            : `الإسم الأخير`}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                          name="lastName"
                          type="text"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (
                          <p className="text-danger">
                            {formik.errors.lastName}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mx-5">
                      <div className="col-lg-6 col-12">
                        <label className="d-block">
                          {i18n.language === "en"
                            ? `User name`
                            : `إسم المستخدم`}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.userName_en}
                          name="userName_en"
                          type="text"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.userName_en &&
                        formik.touched.userName_en ? (
                          <p className="text-danger">
                            {formik.errors.userName_en}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-lg-6 col-12">
                        <label className="d-block">
                          {i18n.language === "en"
                            ? `Email`
                            : `البريد الإلكتروني`}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          name="email"
                          type="email"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.email && formik.touched.email ? (
                          <p className="text-danger">{formik.errors.email}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mx-5">
                      <div className="col-lg-6 col-12">
                        <label className="d-block">
                          {i18n.language === "en"
                            ? "Phone number"
                            : "رقم الجوال"}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          name="phone"
                          type="text"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                          <p className="text-danger">{formik.errors.phone}</p>
                        ) : null}
                      </div>
                      <div className="col-lg-6 col-12">
                        <label className="d-block">
                          {i18n.language === "en" ? "Password" : "كلمة المرور"}
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          name="password"
                          type="password"
                          className="rounded border p-1 my-2"
                        />
                        {formik.errors.password && formik.touched.password ? (
                          <p className="text-danger">
                            {formik.errors.password}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <div className="">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="role"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option selected hidden>
                            {i18n.language === "en" ? "Role" : "المنصب"}
                          </option>
                          <option value="admin">
                            {i18n.language === "en" ? "Admin" : "مشرف"}
                          </option>
                          <option value="sub admin">
                            {i18n.language === "en" ? "Sub Admin" : "مشرف فرعي"}
                          </option>
                        </select>
                      </div>
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
          <div className="row m-5 gap-3">
            {admins &&
              admins?.map((admin) => (
                <div className="p-5 border rounded col-lg-3 d-flex flex-column gap-3">
                  <h5>{i18n.language === "en" ? "Name: " : "الإسم: "} {admin?.fullName_en}</h5>
                  <h6>{i18n.language === "en" ? "Role: " : "المنصب: "} {admin?.role} </h6>
                  {me?.role === 'super admin' && 
                  <button className="btn btn-danger align-self-center" onClick={()=>delAdmin(admin?._id)}>{i18n.language === 'en' ? 'Delete' : 'مسح'}</button>
                  }
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admins;
