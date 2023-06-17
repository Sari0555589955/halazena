import styles from "./Login.module.css";
import logo from "../assists/zena.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserService from "../httpServices/user.services";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "../Translation/i18n";
// import UserService from "../httpServices/user.services";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginUser = async (loginData) => {
    try {
      const data = await UserService.login("user/adminLogin", loginData);
      if (data) {
        // if(data.userInfo.user.role !== "admin"){
        //   // toast.error(data[`error_${i18n.language}`])
        //   // toast.error(i18n.language === 'en' ? `Must be an admin` : `يجب أن يكون المستخدم أدمن`)

        // }

        localStorage.setItem("token", data.userInfo.token);
        axios.defaults.headers.common["authorization"] =
          localStorage.getItem("token");
        toast.success(
          i18n.language === "en" ? data.success_en : data.success_ar,
          {
            position: i18n.language === "en" ? "top-left" : "top-right",
          }
        );
        navigate("/");
      }
    } catch (e) {
      toast.error(
        i18n.language === "en"
          ? e.response?.data?.error_en
          : e.response?.data?.error_ar,
        {
          position: i18n.language === "en" ? "top-left" : "top-right",
        }
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email(t("emailValidation")).required(t("required")),
      password: yup.string().required(t("required")),
    }),
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`container d-flex flex-column justify-content-center align-items-center ${styles.Main}`}
    >
      <div
        className={`btn btn-warning p-0 text-white position-absolute top-0 ${
          i18n.language === "en" ? `end-0` : `start-0`
        } m-2`}
      >
        <button
          className="btn dropdown-toggle text-white"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {i18n.language === "en" ? `English` : `العربية`}
        </button>
        <ul
          className={`${styles.DropdownMenu} dropdown-menu`}
          style={{ width: "5px", padding: "0" }}
        >
          <li>
            <button
              className={`dropdown-item`}
              onClick={() =>
                changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              {i18n.language === "en" ? `العربية` : `English`}
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`d-flex flex-column p-5 align-items-center ${styles.Card} shadow bg-white`}
      >
        <img src={logo} alt="Logo" width="20%" />
        <p className={styles.Greeting}>{t("hello")}</p>
        <p className={styles.Greeting2}>{t("loginPage")}</p>
        <form
          className="d-flex flex-column w-100 align-items-center m-3"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={` d-flex justify-content-center align-items-center ${styles.InputContainer}`}
          >
            <MdEmail />
            <input
              className={styles.Input}
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
              placeholder={t("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}
          <div
            className={`d-flex justify-content-center align-items-center ${styles.InputContainer}`}
          >
            <MdLock />
            <input
              className={styles.Input}
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder={t("password")}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
          {/* <Link className="align-self-start">
            {i18n.language === "en" ? "Forgot your password?" : "نسيت كلمة المرور؟ "}
          </Link> */}
          <button type="submit" className="btn btn-warning text-white m-3">
            {t("login")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
