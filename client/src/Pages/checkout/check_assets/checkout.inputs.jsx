import i18next from "i18next";
import * as Yup from "yup";
const { language } = i18next;
export const inputsData = [
  {
    type: "text",
    name: "firstName",
    label_en: "first name",
    label_ar: "الاسم الأول",
  },
  {
    type: "text",
    name: "lastName",
    label_en: "last name",
    label_ar: "الاسم الأخير",
  },
  {
    type: "text",
    name: "phone",
    label_en: "phone number",
    label_ar: "رقم الجوال",
  },
  {
    type: "text",
    name: "email",
    label_en: "email address",
    label_ar: "البريد الإلكتروني",
  },
  {
    type: "text",
    name: "country",
    label_en: "country",
    label_ar: "الدولة",
  },
  {
    type: "text",
    name: "city",
    label_en: "city",
    label_ar: "المدينة",
  },
  {
    type: "text",
    name: "address",
    label_en: "address",
    label_ar: "العنوان",
  },
  {
    type: "text",
    name: "orderNotes",
    label_en: "order notes (Optional)",
    label_ar: "ترتيب ملاحظفات (أختياري)",
  },
];

export const formikData = {
  values: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    payInCash: false,
    formalName: "",
    creditCard: "",
    expirationDate: "",
    protectionSymbol: "",
    orderNotes: "",
  },
  errors: {
    firstName: Yup.string().required(
      language === "en" ? "First name is required" : "الأسم الأول مطلوب"
    ),
    lastName: Yup.string().required(
      language === "en" ? "Last name is required" : "الأسم الأخير مطلوب"
    ),
    phone: Yup.string().required(
      language === "en" ? "Phone is required" : "رقم الجوال مطلوب"
    ),
    email: Yup.string()
      .email(() => (language === "en" ? "Invalid email" : "بريد إلكتروني خاطئ"))
      .required(
        language === "en" ? "Email is Required" : "البريد الإلكتروني مطلوب"
      ),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required(
      language === "en" ? "City is required" : "المدينة مطلوبة"
    ),
    address: Yup.string().required(
      language === "en" ? "Address is required" : "العنوان مطلوب"
    ),
    formalName: Yup.string().when("payInCash", {
      is: false,
      then: () =>
        Yup.string().required(
          language === "en" ? "Card name is required" : "اسم البطاقة مطلوب"
        ),
      otherwise: Yup.string(),
    }),
    creditCard: Yup.number().when("payInCash", {
      is: false,
      then: Yup.number().required(
        language === "en" ? "Credit number is required" : "رقم بالبطاقة مطلوب"
      ),
      otherwise: Yup.number().notRequired(),
    }),
    expirationDate: Yup.date().when("payInCash", {
      is: false,
      then: Yup.date().typeError("Expiration Date is required"),
    }),
    protectionSymbol: Yup.number().when("payInCash", {
      is: false,
      then: Yup.number().required(
        language === "en" ? "Security code is required" : "الرقم السري مطلوب"
      ),
      otherwise: Yup.number().notRequired(),
    }),
  },
};
