import { Box, CardMedia, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  contactFormik,
  contactHeader,
  contactHeroSection,
  contactWaysIcons,
} from "./assets/contact.data";
import { useFormik } from "formik";
import ContactUsForm from "./mui/ContactUsForm";
import { iconBoxStyle } from "./assets/contactStyle";
import { motion } from "framer-motion";
import { useContactMutation } from "../../APIs/contactsApis";
import { toast } from "react-toastify";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
const ContactUsPage = () => {
  const [_, { language }] = useTranslation();
  const [contact, { isSuccess, data }] = useContactMutation();
  const formik = useFormik({
    initialValues: contactFormik.values,
    validationSchema: contactFormik.errors,
    onSubmit: () => {
      contact(formik.values);
      if (isSuccess) {
        formik.resetForm();
        toast.success(data[`success_${language}`]);
      } else {
        toast.error(
          language === "en" ? "Contact Already Exist" : "الشكوى موجودة بالفعل"
        );
      }
    },
  });
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <Stack
        sx={{
          height: "750px",
          backgroundImage:
            "url(https://t4.ftcdn.net/jpg/02/11/44/37/240_F_211443782_ZMRxLprJn8b06Xft7HCXvDm9pIHi2cpS.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          mb: {
            lg: "500px",
            xs: "900px",
          },
        }}
      >
        <Box
          align="center"
          sx={{ color: "#fff", mt: "250px", textAlign: "center" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: publicFontFamily,
            }}
          >
            {contactHeroSection[`heading_${language}`]}
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            px: "20px",
            bgcolor: "#fff",
            width: {
              md: 0.75,
              xs: 0.9,
            },
            mx: "auto",
            mt: "50px",
            borderRadius: "20px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            pb: "25px",
            zIndex: 3,
          }}
        >
          <Grid item xs={12} lg={8}>
            <ContactUsForm formik={formik} language={language} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                width: {
                  lg: "105%",
                  sm: 0.95,
                  xs: 1,
                },
                mx: "auto",
                transform: {
                  lg: `translateX(${language === "en" ? "40px" : "-40px"})`,
                  xs: `translateX(0)`,
                },
                bgcolor: "#333333",
                borderRadius: "15px",
                pt: "75px",
                mt: "40px",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={"bold"}
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: {
                    md: "25px",
                    xs: "20px",
                  },
                  fontFamily: publicFontFamily,
                }}
              >
                {contactHeader[`headTitle_${language}`]}
              </Typography>

              <Box
                sx={{
                  mt: 4,
                }}
              >
                {contactWaysIcons.map((contactWay) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    my={2}
                  >
                    <Box sx={iconBoxStyle}>{contactWay.icon}</Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "15px",
                          color: "#fff",
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {contactWay[`des_${language}`]}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Box>
              <Box
                sx={{
                  height: "250px",
                  mx: "auto",
                  mt: "70px",
                  width: {
                    lg: 1,
                    md: 0.5,
                    xs: 1,
                  },
                }}
              >
                <CardMedia
                  component={"iframe"}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1727.6494304747157!2d31.16048102552309!3d29.99957380501351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1681385549754!5m2!1sen!2seg"
                  sx={{
                    width: 1,
                    height: "250px",
                    borderRadius: "15px",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack> */}
      <Box
        container
        sx={{
          height: {
            lg: 550,
            xs: "auto",
          },
          bgcolor: colors.lightGreen,
          mb: {
            lg: "100px",
            md: "70px",
            xs: "50px",
          },
          mt: {
            lg: "250px",
            md: "200px",
            xs: "150px",
          },
          pt: {
            lg: 0,
            xs: "60px",
          },
        }}
      >
        <Grid
          container
          sx={{
            width: {
              md: 0.75,
              xs: 0.9,
            },
            mx: "auto",
          }}
        >
          <Grid item lg={6} xs={12}>
            <Paper
              sx={{
                height: {
                  md: 630,
                  xs: "auto",
                },
                marginTop: {
                  lg: "-25px",
                  xs: 0,
                },
              }}
            >
              <ContactUsForm formik={formik} language={language} />
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              px: {
                lg: "100px",
                md: "60px",
                xs: "10px",
              },
            }}
          >
            <Box>
              {contactWaysIcons.map((contactWay) => (
                <Stack direction="row" alignItems="center" gap={2} my={3}>
                  <Box sx={iconBoxStyle}>{contactWay.icon}</Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {
                          lg: "20px",
                          md: "18px",
                          xs: "16px",
                        },
                        color: "#fff",
                        fontFamily: publicFontFamily,
                        fontWeight: "bold",
                      }}
                    >
                      {contactWay[`des_${language}`]}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
