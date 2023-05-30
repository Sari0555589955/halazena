import * as yup from "yup";



export const formData = {
  initialVals: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    // password: "",
    creditCard: "",
    expirationDate: "",
    protectionSymbol: "",
  },
  validation: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    phone: yup.number(),
    email: yup.string().email(),
    // password: yup.string(),
    creditCard: yup.number(),
    expirationDate: yup.date(),
    protectionSymbol: yup.number(),
  }),
};
