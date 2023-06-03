import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFetchCategories from "../../Pages/home/category/useFetchCategories";
// import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "../publicStyle/publicStyle";
export const urlPath = `https://tse3.mm.bing.net/th?id=OIP.1d7TQI67pwfr0F5jqTgD1AHaGw&pid=Api&P=0`;
// export const navLinks = ["About us ", "home", "prifle"];
// const [_, {language}] = useTranslation()
export const navLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/aboutUs" },
  {
    title: "departments",
    nestedLinks: [
      { title: "men", link: "/departments/men" },
      { title: "women", link: "/departments/women" },
      { title: "children", link: "/departments/children" },
    ],
  },
  { title: "Profile", link: "/profile" },
];
const iconStyle = {
  color: colors.grey,
  fontSize: "20px",
};
export const ProfileMenuData = [
  {
    name_en: "Login",
    name_ar: "تسجيل الدخول",
    path: "sign-in",
    icon: <LoginIcon sx={iconStyle} />,
  },
  {
    name_en: "Register",
    name_ar: "تسجيل حساب",
    path: "register",
    icon: <AppRegistrationIcon sx={iconStyle} />,
  },
  {
    name_en: "Profile",
    name_ar: "الملف الشخصي",
    path: "profile",
    icon: <AccountCircleIcon sx={iconStyle} />,
  },
  {
    name_en: "Logout",
    name_ar: "تسجيل خروج",
    path: "",
    icon: <LogoutIcon sx={iconStyle} />,
  },
];

export const profile_cart_likesData = [
  {
    name: "cart",
    icon: <LocalMallIcon />,
    data: [],
  },
  {
    name: "likes",
    icon: <FavoriteIcon />,
    data: [],
  },
];

export const NavLinksData = () => {
  return [
    {
      title_en: "Home",
      title_ar: "الصفحة الرئيسية",
      link: "/",
    },
    {
      title_en: "About Us",
      title_ar: "معلومات عنا",
      link: "/aboutUs",
    },
    {
      title_en: "Products",
      title_ar: "المنتجات",
      nestedLinks: useFetchCategories(),
    },
    {
      title_en: "Contact Us",
      title_ar: "تواصل معنا",
      link: "/contactUs",
    },
    // { title: "Profile", link: "/profile" },
  ];
};
