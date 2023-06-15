import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  InputBase,
  Stack,
  Typography,
  styled,
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
import snapchatImg from "../../assets/snapChat.png";
import linkedinImg from "../../assets/linkedin.png";
import twitterImg from "../../assets/twitter.png";
import instagramImg from "../../assets/instagram.png";
import facebookImg from "../../assets/facebook.png";
import youtubeImg from "../../assets/youtube.png";
import imgPath from "../../assets/zena.png";
import footeriMG from "../../assets/footer.jpg";
const Footer = () => {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const StyledLink = styled(Typography)({
    img: {
      height: 22,
      width: 22,
    },
  });
  return (
    <Box
      sx={{
        display:
          pathname === "/sign-in" ||
          pathname === "/register" ||
          pathname === "/thanksOrder"
            ? "none"
            : "block",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          py: 5,
          width: {
            lg: 0.75,
            md: 0.85,
            xs: 1,
          },
          height: 600,
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: "-1",
          }}
          src={footeriMG}
        />
        <Stack
          sx={{
            width: {
              md: 0.9,
              xs: 0.8,
            },
            mx: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: {
              md: "flex-end",
              xs: "center",
            },
          }}
        >
          <Box
            sx={{
              bgcolor: colors.lightGreen,
              height: "auto",
              p: {
                md: "50px 20px",
                xs: "25px 10px",
              },
            }}
          >
            {contactWaysIcons.map((contactWay) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: {
                    lg: 2.5,
                    md: 1.5,
                    xs: 0,
                  },
                  mt: "10px",
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
                      width: 200,
                      color: "#fff",
                      fontSize: {
                        md: "18px",
                        xs: "14px",
                      },
                    }}
                  >
                    {contactWay[`title_${lang}`]}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box width={0.9} mx={"auto"} mt={"20px"}>
              <Box>
                <Button
                  sx={{
                    fontFamily: publicFontFamily,
                    fontSize: {
                      md: "18px",
                      xs: "14px",
                    },
                    color: "#fff",
                    fontWeight: "bold",
                    transition: "color 0.4s",
                    bgcolor: "transparent !important",
                    "&:hover": {
                      color: colors.newMainHeavyColor,
                    },
                  }}
                  onClick={() => navigate("/aboutUs")}
                >
                  {lang === "en" ? "About Us" : "معلومات عننا"}
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{
                    fontFamily: publicFontFamily,
                    fontSize: {
                      md: "18px",
                      xs: "14px",
                    },
                    color: "#fff",
                    fontWeight: "bold",
                    transition: "color 0.4s",
                    bgcolor: "transparent !important",
                    "&:hover": {
                      color: colors.newMainHeavyColor,
                    },
                  }}
                  onClick={() => navigate("/contactUs")}
                >
                  {lang === "en" ? "Contact Us" : "تواصل معنا"}
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{
                    fontFamily: publicFontFamily,
                    fontSize: {
                      md: "18px",
                      xs: "14px",
                    },
                    color: "#fff",
                    fontWeight: "bold",
                    transition: "color 0.4s",
                    bgcolor: "transparent !important",
                    "&:hover": {
                      color: colors.newMainHeavyColor,
                    },
                  }}
                  onClick={() => navigate("/privacyPolicy")}
                >
                  {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          background: `linear-gradient(${
            lang === "en" ? 90 : 270
          }deg, rgba(243,244,245,0.958420868347339) 2%, rgba(202,242,241,1) 10%, rgba(110,220,218,1) 71%)`,
        }}
      >
        <Container
          maxWidth="xl"
          fixed
          sx={{
            display: {
              lg: "flex",
              xs: "block",
            },
            justifyContent: "space-between",
            py: "20px",
          }}
        >
          <CardMedia
            sx={{
              height: 50,
              width: 50,
              mx: {
                lg: "initial",
                xs: "auto",
              },
            }}
            component={"img"}
            src={imgPath}
          />
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { lg: "flex-start", xs: "center" },
              alignItems: "center",
              width: {
                lg: 0.5,
                md: 1,
              },
              mt: {
                lg: 0,
                xs: "20px",
              },
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: publicFontFamily,
                fontSize: "20px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {lang === "en" ? "Follow us on" : "تابعنا علي"}
            </Typography>
            <Stack direction="row" alignItems="center" gap="10px">
              <StyledLink
                component="a"
                href="https://www.snapchat.com"
                target="_blank"
              >
                <img src={snapchatImg} />
              </StyledLink>
              <StyledLink
                component="a"
                href="https://www.linkedin.com"
                target="_blank"
              >
                <img src={linkedinImg} height={20} width={20} />
              </StyledLink>
              <StyledLink
                component="a"
                href="https://www.facebook.com"
                target="_blank"
              >
                <img src={facebookImg} />
              </StyledLink>
              <StyledLink
                component="a"
                href="https://www.instagram.com"
                target="_blank"
              >
                <img src={instagramImg} />
              </StyledLink>
              <StyledLink
                component="a"
                href="https://www.twitter.com"
                target="_blank"
              >
                <img src={twitterImg} />
              </StyledLink>
              <StyledLink
                component="a"
                href="https://www.youtube.com"
                target="_blank"
              >
                <img src={youtubeImg} />
              </StyledLink>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
