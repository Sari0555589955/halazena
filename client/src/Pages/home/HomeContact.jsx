import { Box, Button, CardMedia, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { contactFormik } from "../contactUs/assets/contact.data";
import { toast } from "react-toastify";
import imgPath from "../../assets/cakeContact.png";
import ContactTextInput from "../contactUs/mui/ContactInput";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
import sliderWall from "../../assets/homeContact.png";
import {
  ContactColors,
  InputBoxStyle,
  SubmitBtnStyle,
} from "../contactUs/assets/contactStyle";
import { useContactMutation } from "../../APIs/contactsApis";
const HomeContact = () => {
  const [_, { language }] = useTranslation();
  const [contact, { isSuccess, data }] = useContactMutation();
  const formik = useFormik({
    initialValues: contactFormik.values,
    validationSchema: contactFormik.errors,
    onSubmit: () => {
      contact(formik.values);
      if (isSuccess) {
        resetForm();
        toast.success(data[`success_${language}`]);
      } else {
        toast.error(
          language === "en" ? "Contact Already Exist" : "الشكوى موجودة بالفعل"
        );
      }
    },
  });
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
    <Stack
      sx={{
        position: "relative",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        alignItems: "center",
        justifyContent: "center",
        gap: "100px",
        mb: "50px",
        py: {
          md: 0,
          xs: "100px",
        },
        backgroundImage: `url(${sliderWall})`,
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: {
          md: "1000px",
          xs: "auto",
        },
      }}
    >
      <Box
        sx={{
          py: {
            md: 2.5,
            xs: 1,
          },
          px: 2.5,
          width: {
            md: 500,
            xs: 0.9,
            mx: "auto",
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
                radius={"15px"}
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
                radius={"15px"}
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
            radius={"15px"}
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
                  color: values.contactType ? "#000" : "#87989D",
                  width: "100%",
                  padding: "18px 0",
                  fontFamily: publicFontFamily,
                  fontSize: "16px",
                  fontWeight: "bold",
                  outline: 0,
                  boxShadow: 0,
                  border: `1px solid ${
                    errors.contactType && touched.contactType
                      ? "#f00"
                      : "#f5f5f5"
                  }`,
                  borderRadius: "20px",

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
                <option
                  value="complaints"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {language === "en" ? "Complaints" : "الشكاوي"}
                </option>
                <option
                  value="suggestions"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {language === "en" ? "Suggestions" : "الاقتراحات"}
                </option>
                <option
                  value="customerService"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
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
                  borderRadius: "20px",

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
                bgcolor: "#fff !important",
                color: "#000",
                transition: "all 0.3s",
                borderRadius: "10px",
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

      <CardMedia
        component="img"
        src={imgPath}
        sx={{
          height: {
            xl: 600,
            lg: 500,
            md: 400,
            xs: 300,
          },
          width: {
            lg: 500,
            md: 400,
            xs: 300,
          },
          objectFit: "contain",
          mb: {
            md: 0,
            xs: "100px",
          },
        }}
      />
    </Stack>
  );
};

export default HomeContact;
