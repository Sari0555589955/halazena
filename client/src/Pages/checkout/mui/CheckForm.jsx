import { Box, FormLabel, Grid, Input, InputBase, Stack } from "@mui/material";
import DynamicInputText from "./DynamicInputText";
import StaticInputText from "./StaticInputText";
import { useTranslation } from "react-i18next";

const FormCheckout = ({ inputsData, formik }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const [_, { language }] = useTranslation();
  return (
    <Grid container>
      {inputsData.map((input, index) => {
        return (
          <Grid md={6} xs={12} mt={3}>
            <DynamicInputText
              index={index}
              input={input}
              value={values[input.name]}
              error={errors[input.name]}
              touched={touched[input.name]}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
        );
      })}
      {!values.payInCash && (
        <>
          <Grid md={6} xs={12} mt={3}>
            <StaticInputText
              index={0}
              type="text"
              name="formalName"
              value={values.formalName}
              error={errors.formalName}
              label={
                language === "en" ? "the name of the card" : "الأسم بالبطاقة"
              }
              touched={touched.formalName}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
          <Grid md={6} xs={12} mt={3}>
            <StaticInputText
              index={1}
              type="text"
              name="creditCard"
              value={values.creditCard}
              error={errors.creditCard}
              label={language === "en" ? "Card Number" : "رقم البطاقة"}
              touched={touched.creditCard}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
          <Grid md={6} xs={12} mt={3}>
            <StaticInputText
              index={0}
              type="date"
              name="expirationDate"
              value={values.expirationDate}
              error={errors.expirationDate}
              touched={touched.expirationDate}
              label={language === "en" ? "Release Date" : "تاريخ الإصدار"}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
          <Grid md={6} xs={12} mt={3}>
            <StaticInputText
              index={1}
              type="text"
              name="protectionSymbol"
              value={values.protectionSymbol}
              error={errors.protectionSymbol}
              label={language === "en" ? "Security code" : "رمز الحماية"}
              touched={touched.protectionSymbol}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default FormCheckout;
