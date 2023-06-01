import React from "react";
import { useGetAboutUsDataQuery } from "../../APIs/aboutUsApi";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../components/nav/nav.data";
import { imageBaseUrl } from "../../components/service";
import { motion } from "framer-motion";
import {
  publicFontFamily,
  colors,
  publicButton,
} from "../../components/publicStyle/publicStyle";
import Loader from "../../components/loader/loader";

export const AboutUsShared = ({ data, isLoading }) => {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const isHomePage = pathname === "/" ? true : false;
  const aboutUsSection = data?.sections[0];
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: 0.9,
            mx: "auto",
            display: "flex",
            justifyContent: {
              md: "start",
              xs: "center",
            },
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Box>
      ) : aboutUsSection ? (
        <Box
          sx={{
            width: 0.97,
            mx: "auto",
          }}
        >
          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: {
                  md: "none",
                  xs: "block",
                },
              }}
            >
              <Box>
                <Avatar
                  // src={`${imageBaseUrl}/${aboutUsSection.image}`}
                  src={
                    "https://images.pexels.com/photos/3060330/pexels-photo-3060330.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  sx={{
                    height: {
                      lg: 500,
                      xs: 300,
                    },
                    width: "100%",
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                width: {
                  md: 0.9,
                  xs: 1,
                },
                wordBreak: "break-word",
                textAlign: {
                  md: "initial",
                  xs: "center",
                },
              }}
            >
              <Box
                sx={{
                  height: {
                    md: "42vh",
                    xs: "auto",
                  },
                  px: 3,
                  py: 1.5,
                  width: 0.97,
                  bgcolor:
                    pathname === "/"
                      ? `${colors.lightGreen} !important`
                      : "#fff",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bolder",
                    my: 4,
                    fontSize: {
                      md: "33px",
                      xs: "26px",
                    },
                    fontFamily: publicFontFamily,
                  }}
                >
                  {aboutUsSection?.type}
                </Typography>
                <Box
                  sx={{
                    fontFamily: publicFontFamily,
                    my: 4,
                    fontWeight: "bold",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: aboutUsSection?.description,
                  }}
                />
                {isHomePage && (
                  <Button
                    sx={publicButton}
                    onClick={() => navigate("/aboutUs")}
                  >
                    {language === "en" ? "Read more" : "اقرأ المزيد"}
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: {
                  md: "block",
                  xs: "none",
                },
              }}
            >
              <Box>
                <Avatar
                  // src={`${imageBaseUrl}/${aboutUsSection.image}`}
                  src={
                    "https://images.pexels.com/photos/3060330/pexels-photo-3060330.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  sx={{
                    height: {
                      lg: 500,
                      xs: 300,
                    },
                    width: "100%",
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "50vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              color: "red",
              fontWeight: "bold",
              fontFamily: publicFontFamily,
            }}
          >
            {language == "en"
              ? "About us Not Been Added Yet"
              : "لم يتم إضافة قسم من نحن حتى الآن"}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

const AboutUsPage = () => {
  const { data: aboutSectionData, isLoading: aboutIsLoading } =
    useGetAboutUsDataQuery();
  return (
    <>
      <Box
        sx={{
          py: "200px",
        }}
      >
        <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} />
      </Box>
    </>
  );
};

export default AboutUsPage;
