import {
  Avatar,
  Box,
  Button,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import urlPath from "../../assets/whiteLogo.png";
import Logo from "../nav/Logo";
import LinkDropDown from "../nav/LinkDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLinksData } from "../nav/nav.data";
import { useTranslation } from "react-i18next";
import { contactWaysIcons } from "../../Pages/contactUs/assets/contact.data";
import { footerStyle, iconBoxStyle } from "./FooterStyle";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
// import whiteLogo from "../../assets/whiteLogo.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        ...footerStyle,
        display:
          pathname === "/sign-in" || pathname === "/register"
            ? "none"
            : "block",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          py: 5,
          width: {
            md: 0.8,
            sm: 0.85,
            xs: 0.9,
          },
        }}
      >
        <Grid container>
          <Grid item lg={3} md={6} xs={12} mt={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "15px",
              }}
            >
              <Box>
                <Avatar
                  sx={{
                    height: "100px",
                    width: "auto",
                    borderRadius: 0,
                    transform: "rotate(-14deg)",
                    mx: "auto",
                    transform: "rotate(0)",
                  }}
                  src={urlPath}
                />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontFamily: publicFontFamily,
                    fontSize: {
                      md: "24px",
                      xs: "21px",
                    },
                  }}
                >
                  {lang === "en" ? "ABAYA STORE" : "متجر عباية"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={3} md={6} xs={12} mt={2}>
            <Box
              sx={{
                mx: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  my: 2,
                  fontWeight: "bold",
                  fontFamily: publicFontFamily,
                  fontSize: {
                    md: "24px",
                    xs: "21px",
                  },

                  textAlign: "center",
                }}
              >
                {lang === "en" ? "Contact Ways" : "طرق التواصل"}
              </Typography>
              {contactWaysIcons.map((contactWay) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: {
                      lg: 2.5,
                      md: 1.5,
                      xs: 0.5,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "flex", md: "inline" },
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={iconBoxStyle}>{contactWay.icon}</Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: publicFontFamily,

                        fontWeight: "bold",
                        width: "100px",
                        fontSize: {
                          md: "15px",
                          xs: "13px",
                        },
                      }}
                    >
                      {contactWay[`title_${lang}`]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item lg={3} md={6} xs={12} mt={2}>
            <Box
              sx={{
                mx: "auto",
              }}
            >
              {/* <Typography
                variant="h5"
                sx={{
                  fontFamily: publicFontFamily,
                  my: 2,
                  fontWeight: "bold",
                  fontSize: "23px",
                  textAlign: "center",
                }}
              >
                {lang === "en" ? "ABAYA STORE" : "متجر عباية"}
              </Typography> */}
              {NavLinksData().map((item) => {
                return item.nestedLinks ? (
                  <LinkDropDown
                    key={item.link}
                    item={item}
                    pathname={pathname}
                    footerTextColor={footerStyle.color}
                    justifyContenValue={"center"}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      key={item.link}
                      disableRipple
                      onClick={() => navigate(item.link)}
                      sx={{
                        fontSize: "16px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        backgroundColor: "transparent !important",
                        display: "block",
                        color: footerStyle.color,
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {item[`title_${lang}`]}
                    </Button>
                  </Box>
                );
              })}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  disableRipple
                  onClick={() => navigate("/privacyPolicy")}
                  sx={{
                    fontSize: "16px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    backgroundColor: "transparent !important",
                    display: "block",
                    color: footerStyle.color,
                    fontFamily: publicFontFamily,
                  }}
                >
                  {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={3} md={6} xs={12} mt={2}>
            <Box
              sx={{
                mx: "auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: publicFontFamily,
                  my: 2,
                  fontWeight: "bold",
                  fontSize: "23px",
                  textAlign: "center",
                }}
              >
                {lang === "en" ? "Follow us on" : "تابعنا علي"}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap="10px"
              >
                {/* Linkedin */}
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LinkedInIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.newMainColor,
                    }}
                  />
                </a>
                {/* Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TwitterIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.newMainColor,
                    }}
                  />
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FacebookOutlinedIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.newMainColor,
                    }}
                  />
                </a>
                {/* Instagram */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Avatar
                    src="https://www.iconpacks.net/icons/1/free-linkedin-icon-112-thumb.png"
                    sx={{
                      height: "20px",
                      width: "auto",
                      borderRadius: 0,
                    }}
                  /> */}
                  <InstagramIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.newMainColor,
                    }}
                  />
                </a>
                {/* youtube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <YouTubeIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.newMainColor,
                    }}
                  />
                </a>
              </Stack>
            </Box>
          </Grid>

          {/* <Grid item xl={3} lg={4} md={6} xs={12} mt={2}>
            <Box
              sx={{
                mx: "auto",
                width: {
                  md: 0.9,
                  xs: 1,
                },
                height: "30vh",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={"bold"}
                my={2}
                align="center"
              >
                {lang === "en" ? "News Letter" : "رسالة إخبارية"}
              </Typography>
              <Typography>
                You will be notified when somthing new will be appear.
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: footerStyle.color,
                  px: 1,
                  mt : 3,
                }}
              >
                <InputBase
                  type="text"
                  placeholder={
                    lang === "en" ? "Email Address" : "البريد الإلكتروني"
                  }
                  sx={{
                    width: 0.9,
                    py: 1,
                  }}
                />
                <EmailIcon
                  sx={{
                    color: "red",
                  }}
                />
              </Stack>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
