import i18next from "i18next";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import * as Yup from "yup";
const { language: lang } = i18next;

export const contactHeroSection = {
  heading_en: "We want to hear from you",
  heading_ar: "نريد أن نسمع منك",
  p_en: "Home / Contact",
  p_ar: "الصفحة الرئيسية",
};

export const contactHeader = {
  headTitle_en: "Our Contacts",
  headTitle_ar: "تواصلات بنا",
  headBody_en:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old",
  headBody_ar:
    "خلافًا للاعتقاد الشائع ، فإن Lorem Ipsum ليس مجرد نص عشوائي. لها جذور في قطعة من الأدب اللاتيني الكلاسيكي من 45 قبل الميلاد ، مما يجعلها أكثر من 2000 عام",
};

export const contactWaysIcons = [
  {
    title_en: "+900 00 000",
    title_ar: "+900 00 000",
    icon: <LocalPhoneIcon />,
    des_en: "0-123-456-7890",
    des_ar: "0-123-456-7890",
  },
  {
    title_en: "abaya@store.com",
    title_ar: "abaya@store.com",
    icon: <EmailOutlinedIcon />,
    des_en: "abaya@store.com",
    des_ar: "abaya@store.comcom",
  },
  {
    icon: <LocationOnOutlinedIcon />,
    title_en: "Lorem Ipsum is simply dummy",
    title_ar: "لوريم إيبسوم مجرد دمية",
    des_en: "245 King Street, Touterie Victoria 8520 Australia",
    des_ar: "245 ش الملك استراليا",
  },
];

export const contactFormik = {
  heading_en: "Quick Contact Form",
  heading_ar: "نموذج الإتصال السريع",

  values: {
    name: "",
    email: "",
    phone: "",
    message: "",
    contactType: "",
  },
  errors: Yup.object({
    name: Yup.string().required(
      lang === "en" ? "Name is required" : "الأسم مطلوب"
    ),
    email: Yup.string()
      .email(() => (lang === "en" ? "Invalid Email" : "بريد إلكتروني خاطئ"))
      .required(
        lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب"
      ),
    phone: Yup.number()
      .typeError(lang === "en" ? "Numbers only" : "أرقام فقط")
      .required(lang === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
    message: Yup.string().required(
      lang === "en" ? "Message is required" : "الرسالة مطلوبة"
    ),
    contactType: Yup.string()
      .ensure()
      .oneOf(["complaints", "suggestions", "customerService"])
      .required(lang === "en" ? "Select Contact Type" : "اختار نوع التواصل"),
  }),
  ButtonContext_en: "Send",
  ButtonContext_ar: "إرسال",
};
