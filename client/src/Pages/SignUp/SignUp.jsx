import {
  Grid,
  Box,
  Stack,
  ButtonBase,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useSignUp from "./useSignUp";
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
import Person2Icon from "@mui/icons-material/Person2";
import PhoneIcon from "@mui/icons-material/Phone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
const SignUp = () => {
  const [moreFields, setMoreFields] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName_en: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required(
          lang === "en" ? "First name is required*" : "*الاسم الاول مطلوب"
        ),
      lastName: yup
        .string()
        .required(
          lang === "en" ? "Last name is required*" : "*الاسم الاخير مطلوب"
        ),
      userName_en: yup
        .string()
        .required(
          lang === "en" ? "Username is required*" : "*الاسم المستخدم مطلوب"
        ),
      phone: yup
        .number()
        .required(lang === "en" ? "Phone is required*" : "*رقم الهاتف مطلوب"),
      email: yup
        .string()
        .email()
        .required(
          lang === "en" ? "Email is required*" : "*البريد الالكتروني مطلوب"
        ),
      password: yup
        .string()
        .required(
          lang === "en" ? "Password is required*" : "*كلمة المرور مطلوب"
        ),
      creditCard: yup.number(),
      expirationDate: yup.date(),
      protectionSymbol: yup.number(),
    }),
    onSubmit: (values) => {
      signUp(values)
    },
  });
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
          height: {
            md: "100vh",
            xs: "auto",
          },
          overflowY: {
            md: "scroll",
            xs: "auto",
          },
          p: {
            md: "140px 0 40px",
            xs: "100px 0 40px",
          },
          "&::-webkit-scrollbar": {
            width: "15px",
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: colors.newLightColor,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.newMainColor,
            borderRadius: "30px",
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
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
              {/* First Name */}
              <Input
                startDecorator={
                  <Person2Icon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "First name" : "الإسم الأول"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                }}
                name="firstName"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.firstName}
                </Typography>
              )}
              {/* Last name */}
              <Input
                startDecorator={
                  <Person2Icon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "Last name" : "الأسم الأخير"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                }}
                name="lastName"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.lastName}
                </Typography>
              )}
              {/* Username */}
              <Input
                startDecorator={
                  <Person2Icon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "Username" : "أسم المستخدم"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                }}
                name="userName_en"
                value={formik.values.userName_en}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.userName_en && formik.touched.userName_en && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.userName_en}
                </Typography>
              )}
              {/* Phone */}
              <Input
                startDecorator={
                  <PhoneIcon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "phone" : "الهاتف"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  fontFamily: publicFontFamily,
                  p: "20px",
                }}
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.phone}
                </Typography>
              )}
              {/* Email */}
              <Input
                startDecorator={
                  <MailIcon
                    sx={{
                      color: colors.newMainColor,
                    }}
                  />
                }
                placeholder={lang === "en" ? "email" : "البريد الإلكتروني"}
                type={"text"}
                sx={{
                  borderRadius: "40px",
                  p: "20px",
                  fontFamily: publicFontFamily,
                }}
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
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
              {/* Password */}
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
              <FormControlLabel
                sx={{
                  ".MuiTypography-root": {
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                  },
                }}
                control={
                  <Checkbox onChange={() => setMoreFields(!moreFields)} />
                }
                label={lang === "en" ? "More fields" : "حقول أخرى"}
              />
              {moreFields && (
                <>
                  <Input
                    startDecorator={<CreditCardIcon />}
                    placeholder={lang === "en" ? "Credit Card" : "بطاقة إئتمان"}
                    type={"number"}
                    sx={{
                      borderRadius: "40px",
                      p: "20px",
                      fontFamily: publicFontFamily,
                    }}
                    name="creditCard"
                    value={formik.values.creditCard}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Input
                    placeholder={
                      lang === "en" ? "Expiration Date" : "تاريخ الإنتهاء"
                    }
                    type={"date"}
                    sx={{
                      borderRadius: "40px",
                      p: "20px",
                    }}
                    name="expirationDate"
                    value={formik.values.expirationDate}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Input
                    startDecorator={<VerifiedUserIcon />}
                    placeholder={
                      lang === "en" ? "Protection symbol" : "رمز الحماية"
                    }
                    type={"number"}
                    sx={{
                      borderRadius: "40px",
                      p: "20px",
                      fontFamily: publicFontFamily,
                    }}
                    name="protectionSymbol"
                    value={formik.values.protectionSymbol}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </>
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
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
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
                    cursor: "pointer",
                    // fontFamily: basicFont,
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,
                  }}
                  onClick={() => navigate("/sign-in")}
                >
                  {lang === "en" ? "Sign in" : "سجل دخول"}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUp;
