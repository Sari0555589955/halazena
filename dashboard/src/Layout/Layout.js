import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assists/logoSidebar.png";
import styles from "./Layout.module.css";
import { TiThMenu } from "react-icons/ti";
import LayoutServices from "../httpServices/Layout.services";
import { getMe } from "../store/meSlice";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../Translation/i18n";

const Layout = ({ children }) => {
  const { t } = useTranslation();

  const { me } = useSelector((state) => state.getMe);
  const disptach = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    LayoutServices.getMe(`user/me`).then((res) => {
      disptach(getMe(res.user));
    });
  }, [disptach]);
  const signOut = () => {
    localStorage.removeItem("token");
    navigate(`/login`);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const links = [
    {
      url: "/",
      title: t("home"),
    },
    {
      url: "/users",
      title: t("users"),
    },
    {
      url: "/sections",
      title: t("sections"),
    },
    {
      url: "/products",
      title: t("products"),
    },
    {
      url: "/shopping",
      title: t("shopping"),
    },
    {
      url: "/technicalSupport",
      title: t("technical"),
    },
    {
      url: "/requests",
      title: t("requests"),
    },
    {
      url: "/admins",
      title: t("admins"),
    },
    {
      url: "/siteAttachments",
      title: t("attachments"),
    },
   
  ];
  return (
    <div className="row p-0 m-0">
      <div className="row">
        <div
          className={`col-12 bg-white d-flex justify-content-between justify-content-xl-end    ${
            i18n.language === "en" ? styles.NavBarEn : styles.NavBarAr
          }`}
        >
          {/* side responsive */}
          <TiThMenu
            className={`my-2 ${styles.SideResBtn}`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />

          <div
            className="offcanvas offcanvas-start w-75"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" style={{position:"sticky" , top:0}}>
              <div className="d-flex flex-column m-2 " >
                <Link to='/' className="mb-5 w-25 align-self-center">
                  <img
                  src={logo}
                  className='w-100'
                  alt="Un Store"
                />
                </Link>

                {links.map((link) => (
                  <NavLink
                    key={link.url}
                    to={link.url}
                    className={({ isActive }) =>
                      isActive ? styles.Active : styles.Link
                    }
                  >
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          {/* end of side responsive */}
          <div className="m-2 ">
            <div className="dropdown">
              <div
                style={{ cursor: "pointer" }}
                className="dropdown-toggle fs-6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {me.firstName}
              </div>
              <ul className="dropdown-menu">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/profile`}
                >
                  <li style={{ cursor: "pointer", textAlign: "center" }}>
                    <CgProfile className="mx-2" />
                    {i18n.language === "en" ? `Profile` : `الصفحة الشخصية`}
                  </li>
                </Link>
                <li
                  onClick={signOut}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <FaSignOutAlt className="mx-2" />
                  {i18n.language === "en" ? `Sign out` : `تسجيل الخروج`}
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown ">
            <button
              className="btn dropdown-toggle"
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
        </div>
      </div>

      <div
        className={`col-2 justify-content-start align-items-start bg-white  p-4 ${styles.SideRes}`}
        style={{
          position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          height : "100vh"
        }}
        
      >
        <div className="d-flex flex-column m-2"
        >
          <Link to='/' style={{width:'fit-content', }}>
          <img
            src={logo}
            className='w-50'
            style={{margin:'5% 25%' }}
            alt="Un Store"
          />
          </Link>

          {links.map((link) => (
            <NavLink
              key={link.url}
              to={link.url}
              className={({ isActive }) =>
                isActive ? styles.Active : styles.Link
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={`col-xl-10 col-12`}>{children}</div>
    </div>
  );
};

export default Layout;
