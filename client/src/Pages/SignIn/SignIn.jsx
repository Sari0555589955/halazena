import { Grid, Box, Stack, ButtonBase, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useLogin from "./useLogin";
import { motion } from "framer-motion";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsIcon from "@mui/icons-material/Https";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import image from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignIn = () => {
  const [_, { language: lang }] = useTranslation();
  const { currentUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const [authUser] = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email(
          lang === "en"
            ? "email must be a valid email"
            : "يجب أن يكون البريد الإلكتروني صالحًا"
        )
        .required(lang === "en" ? "Required*" : "مطلوب*"),
      password: yup.string().required(lang === "en" ? "Required*" : "مطلوب*"),
    }),
    onSubmit: (values) => authUser(values),
  });
  const [passwordType, setPasswordType] = React.useState(true);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={7}
        lg={8}
        sx={{
          bgcolor: colors.newLightColor,
          position: "relative",
          display: "flex",
          alignItems: {
            md: "center",
            xs: "flex-end",
          },
          justifyContent: "center",
          height: {
            md: "100vh",
            xs: "380px",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: lang == "en" ? 0 : undefined,
            right: lang == "ar" ? 0 : undefined,
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <img
            alt="img"
            crossorigin="anonymous"
            src={image}
            style={{
              height: "99%",
              width: "99%",
              objectFit: "contain",
              opacity: 0.15,
              transform: lang === "en" ? "rotateY(180deg)" : "rotateY(0)",
            }}
          />
        </Box>
        <Box
          sx={{
            mb: {
              md: 0,
              xs: "80px",
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              height: {
                xl: "250px",
                lg: "200px",
                md: "150px",
                xs: "75px",
              },
            }}
          >
            <img
              src={image}
              alt="img"
              crossorigin="anonymous"
              style={{
                height: "100%",
                transform: lang === "en" ? "rotateY(180deg)" : "rotateY(0)",
              }}
            />
          </Stack>
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: publicFontFamily,
            }}
          >
            {lang === "en" ? "APAYA STORE" : "متجر عباية"}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        md={5}
        sx={{
          bgcolor: "#F1F1F1",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: {
            md: " 100vh",
            xs: "auto",
          },
          py: {
            md: 0,
            xs: "40px",
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: {
                md: "75%",
                xs: "auto",
              },
              p: "20px 0",
              direction: lang === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  lg: "30px",
                  xs: "25px",
                },
                fontWeight: "600",
                fontFamily: publicFontFamily,
              }}
            >
              {lang === "en"
                ? "welcome back to apaya store"
                : "مرحباً في متجر عباية"}
            </Typography>

            <Box
              sx={{
                py: "50px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                width: { xs: "90%", sm: "85%" },
              }}
            >
              <Input
                startDecorator={
                  <MailIcon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "ُEmail" : "البريد الإلكتروني"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
                name="email"
                id="email"
                label={lang === "en" ? "email" : "البريد الإلكتروني"}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.email}
                </Typography>
              )}

              <Input
                startDecorator={
                  <HttpsIcon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "Password" : "كلمة المرور"}
                type={passwordType ? "password" : "text"}
                endDecorator={
                  <IconButton color="neutral" size="sm">
                    {passwordType ? (
                      <VisibilityRoundedIcon
                        sx={{
                          color: colors.newMainColor,
                        }}
                        onClick={() => setPasswordType(false)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        sx={{
                          color: colors.newMainColor,
                        }}
                        onClick={() => setPasswordType(true)}
                      />
                    )}
                  </IconButton>
                }
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
                name="password"
                id="password"
                label={lang === "en" ? "Password" : "كلمة المرور"}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.password}
                </Typography>
              )}
              {/* Remember me checkbox input and Forget Me link in the following comment */}
              {/* <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormControl>
                  <FormControlLabel
                    sx={{
                      ".MuiButtonBase-root": {
                        fontFamily: `${basicFont} !important`,
                      },
                    }}
                    label={translate("remember_me")}
                    control={<Checkbox />}
                  />
                </FormControl>
                <Typography
                  sx={{
                    textDecoration: "underline",
                    color: "#030355",
                    fontFamily: basicFont,
                  }}
                >
                  {translate("forget_password")}
                </Typography>
              </Box> */}
              <ButtonBase
                type="submit"
                sx={{
                  color: "#fff",
                  bgcolor: colors.newMainColor,
                  borderRadius: "50px",
                  mt: "20px",
                  fontSize: {
                    xl: "22px",
                    lg: "20px",
                    xs: "18px",
                  },
                  padding: "15px 35px",
                  py: {
                    xl: "15px",
                    lg: "11px",
                    xs: "8px",
                  },
                  px: "35px",
                  // fontFamily: basicFont,
                  fontFamily: publicFontFamily,
                }}
              >
                {lang === "en" ? "Login" : "تسجيل الدخول"}
              </ButtonBase>

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ color: "#AEB0B2", fontFamily: publicFontFamily }}
                >
                  {lang === "en" ? "don't have an account?" : "ليس لديك حساب؟"}
                </Typography>
                <Typography
                  sx={{
                    color: "#030355",
                    cursor: "pointer",
                    // fontFamily: basicFont,
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,
                  }}
                  onClick={() => navigate("/register")}
                >
                  {lang === "en" ? "Sign up" : "أشترك"}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignIn;
