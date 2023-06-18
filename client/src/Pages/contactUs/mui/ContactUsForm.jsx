import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { contactFormik } from "../assets/contact.data";
import {
  ContactColors,
  InputBoxStyle,
  SubmitBtnStyle,
} from "../assets/contactStyle";
import ContactTextInput from "./ContactInput";
import {
  publicFontFamily,
  publicSizes,
} from "../../../components/publicStyle/publicStyle";

const ContactUsForm = ({ formik, language }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = formik;
  return (
    <Box
      sx={{
        py: {
          xl: 5,
          lg: 4,
          md: 3,
          xs: 2,
        },
        px: {
          xl: 5,
          lg: 4,
          md: 3,
          xs: 2,
        },
      }}
    >
      <Typography
        fontFamily={publicFontFamily}
        variant="h5"
        fontWeight={"bold"}
      >
        {language === "en" ? "Contact Us" : "تواصل معنا"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <ContactTextInput
              index={0}
              value={values.name}
              error={errors.name}
              touched={touched.name}
              placeholder={language === "en" ? "Name" : "الأسم"}
              name="name"
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ContactTextInput
              index={1}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              placeholder={language === "en" ? "Email" : "البريد الإلكتروني"}
              name="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Grid>
        </Grid>
        <ContactTextInput
          index={0}
          value={values.phone}
          error={errors.phone}
          touched={touched.phone}
          placeholder={language === "en" ? "phone" : "الجوال"}
          name="phone"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <Box
          sx={{
            position: "relative",
            pb: 1.5,
            mt: 2,
          }}
        >
          <Box sx={InputBoxStyle}>
            <select
              value={values.contactType}
              name="contactType"
              style={{
                backgroundColor: "#fff",
                width: "100%",
                padding: "18px 0",
                fontFamily: publicFontFamily,
                fontSize: "16px",
                fontWeight: "bold",
                // backgroundColor:
                //   errors.contactType && touched.contactType
                //     ? "transparent"
                //     : ContactColors.light,
                outline: 0,
                boxShadow: 0,
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom:
                  errors.contactType && touched.contactType
                    ? `1px solid red `
                    : `1px solid ${ContactColors.main} `,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="select one" hidden selected>
                {language === "en"
                  ? "Select Contact Type"
                  : "أختار نوع التواصل"}
              </option>
              <option value="complaints">
                {language === "en" ? "Complaints" : "الشكاوي"}
              </option>
              <option value="suggestions">
                {language === "en" ? "Suggestions" : "الاقتراحات"}
              </option>
              <option value="customerService">
                {language === "en" ? "Customer Service" : "خدمة العملاء"}
              </option>
            </select>
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: publicFontFamily,
              }}
            >
              {errors.contactType && touched.contactType
                ? errors.contactType
                : undefined}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              md: "flex-end",
              xs: "center",
            },
            position: "relative",
            pb: 0.8,
            mt: 2,
          }}
        >
          <Box sx={{ ...InputBoxStyle, width: 1, mt: "5px" }}>
            <textarea
              value={values.message}
              name="message"
              placeholder={language === "en" ? "Message" : "الرسالة"}
              style={{
                width: "100%",
                padding: "12px 16px",
                height: "150px",
                backgroundColor: "#fff",
                fontFamily: publicFontFamily,
                fontSize: "16px",
                fontWeight: "bold",
                border:
                  errors.message && touched.message
                    ? "1px solid red"
                    : `1px solid ${ContactColors.main}`,
                outline: 0,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: publicFontFamily,
              }}
            >
              {errors.message && touched.message ? errors.message : undefined}
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="center">
          <Button
            sx={{
              ...SubmitBtnStyle,
              transition: "all 0.3s",
              borderRadius: "15px",
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
            type="submit"
          >
            {contactFormik[`ButtonContext_${language}`]}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactUsForm;
