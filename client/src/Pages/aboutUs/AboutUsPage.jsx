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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../components/nav/nav.data";
import { imageBaseUrl } from "../../components/service";
import { motion } from "framer-motion";
import {
  publicFontFamily,
  colors,
} from "../../components/publicStyle/publicStyle";
import Loader from "../../components/loader/loader";

export const AboutUsShared = ({ data, isLoading }) => {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const isHomePage = pathname === navLinks[0].link;
  const aboutUsSection = data?.sections[0];
  console.log("about", data);
  return (
    <Box
      sx={{
        bgcolor:
          pathname === "/" ? `${colors.newLightColor} !important` : "#fff",
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
            width: 0.9,
            mx: "auto",
          }}
        >
          <Grid container border borderColor={"red"}>
            <Grid
              item
              md={7}
              xs={12}
              sx={{
                px: 3,
                wordBreak: "break-word",
                textAlign: {
                  md: "initial",
                  xs: "center",
                },
                height: {
                  md: "42vh",
                  xs: "auto",
                },
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
              <Typography
                sx={{
                  fontFamily: publicFontFamily,
                  my: 4,
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{
                  __html: aboutUsSection?.description,
                }}
              />
            </Grid>
            <Grid
              item
              md={5}
              xs={12}
              sx={{
                transform: {
                  md: !isHomePage ? "translateY(-130px)" : 0,
                  xs: "translateX(0)",
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
                      lg: "50vh",
                      xs: "35vh",
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
