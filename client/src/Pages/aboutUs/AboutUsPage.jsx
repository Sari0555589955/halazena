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
  CardMedia,
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
import CustomError from "../../components/Error/Error";
import aboutImg1 from "../../assets/about1.jpg";
import aboutImg2 from "../../assets/about2.png";

export const AboutUsShared = ({ data, isLoading }) => {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const isHomePage = pathname === "/" ? true : false;
  const aboutUsSection = data && data?.sections[0];
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
            width: {
              xl: 1500,
              lg: 1100,
              md: 0.85,
              xs: 0.9,
            },
            mx: "auto",
          }}
        >
          {aboutUsSection && (
            <Typography
              variant="h3"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                textAlign: "center",
                mb: {
                  md: "50px",
                  xs: "35px",
                },
              }}
            >
              {aboutUsSection[`title_${language}`]}
            </Typography>
          )}
          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                mb: "10px",
                display: {
                  md: "none",
                  xs: "block",
                },
              }}
            >
              <Box>
                <Avatar
                  src={isHomePage ? aboutImg1 : aboutImg2}
                  sx={{
                    height: 300,
                    width: 0.96,
                    mx: "auto",
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
                wordBreak: "break-word",
                textAlign: {
                  md: "initial",
                  xs: "center",
                },
              }}
            >
              <Box
                sx={{
                  height: 1,
                  px: 3,
                  py: 1.5,
                  width: 0.96,
                  mx: {
                    md: 0,
                    xs: "auto",
                  },
                  bgcolor:
                    pathname === "/"
                      ? `${colors.lightGreen} !important`
                      : "transparent",
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
                  {aboutUsSection[`title_${language}`]}
                </Typography>
                <Box
                  sx={{
                    fontFamily: publicFontFamily,
                    my: 4,
                    fontWeight: "bold",
                    color: "#717272",
                    fontSize: "20px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: aboutUsSection[`description_${language}`],
                  }}
                />
                {isHomePage && (
                  <Stack direction="row" justifyContent={"flex-end"}>
                    <Button
                      sx={publicButton}
                      onClick={() => navigate("/aboutUs")}
                    >
                      {language === "en" ? "Read more" : "اقرأ المزيد"}
                    </Button>
                  </Stack>
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
                <CardMedia
                  component="img"
                  src={
                    isHomePage
                      ? aboutImg1
                      : imageBaseUrl + "/" + aboutUsSection.image
                  }
                  sx={{
                    height: 500,
                    width: 1,
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language == "en"
              ? "About us Not Been Added Yet"
              : "لم يتم إضافة قسم من نحن حتى الآن"
          }
        />
      )}
    </Box>
  );
};

const AboutUsPage = () => {
  const { data: aboutSectionData, isLoading: aboutIsLoading } =
    useGetAboutUsDataQuery();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        py: "200px",
      }}
    >
      <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} />
    </Box>
  );
};

export default AboutUsPage;
