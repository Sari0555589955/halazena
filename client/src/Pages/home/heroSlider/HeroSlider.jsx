import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import sliderWall from "../../../assets/backSlide.jpg";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import "./sliderStyle.css";
import { useGetAllSlidersQuery } from "../../../APIs/SectionApis";
import { imageBaseUrl } from "../../../components/service";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/loader";
import CustomError from "../../../components/Error/Error";
const HeroSlider = () => {
  const [_, { language }] = useTranslation();
  const { data, isLoading, error } = useGetAllSlidersQuery();
  const navigate = useNavigate();
  return (
    <section
      style={{
        overflow: "visible",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Box>
      ) : data?.sections?.length > 0 && !error ? (
        <Box
          className="slider slider-homePage"
          sx={{
            backgroundImage: `url(${sliderWall})`,
            backgroundPosition: "center bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: {
              md: "105vh",
              xs: "auto",
            },
          }}
        >
          <Splide
            aria-label="My Favorite Images"
            className="biolife-carousel"
            options={{
              type: "loop",
              autoplay: true,
              pauseOnHover: false,
              resetProgress: false,
              speed: "2000",
              arrows: false,
              direction: language === "en" ? "ltr" : "rtl",
              pagination: false,
              interval: "4000",
            }}
          >
            {data?.sections.map((slide, index) => (
              <SplideSlide
                key={index}
                style={{
                  position: "relative",
                }}
              >
                {slide?.image && (
                  <Grid
                    container
                    sx={{
                      position: "relative",
                      px: {
                        xl: "80px",
                        lg: "65px",
                        md: "40px",
                        xs: "00px",
                      },
                    }}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sx={{
                        height: {
                          xl: "80vh",
                          lg: "85vh",
                          xs: "90vh",
                        },
                        display: {
                          md: "flex",
                          xs: "none",
                        },
                        alignItems: {
                          md: "center",
                          xs: "flex-start",
                        },
                        justifyContent: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          direction: "rtl !important",

                          mb: {
                            md: "70px",
                            xs: "60px",
                          },
                          py: "20px",

                          width: 1,
                        }}
                      >
                        <>
                          <Typography
                            sx={{
                              fontSize: {
                                lg: "60px",
                                md: "45px",
                                xs: "32.5px",
                              },
                              mt: "-60px",
                              fontWeight: "bold",
                              fontFamily: publicFontFamily,
                            }}
                          >
                            {slide?.title_en
                              ? slide[`title_${language}`]
                              : "Old Title"}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: publicFontFamily,
                              fontSize: {
                                lg: "35px",
                                md: "30px",
                                xs: "20px",
                              },
                              fontWeight: "bold",
                              mt: "10px",
                            }}
                          >
                            {slide[`description_${language}`]
                              ? slide[`description_${language}`].length > 160
                                ? `${slide[`description_${language}`].slice(
                                    0,
                                    160
                                  )}...`
                                : slide[`description_${language}`]
                              : "Old Description"}
                          </Typography>
                        </>
                        <Box
                          sx={{
                            mt: 4,
                            display: "flex",
                            direction: language === "en" ? "ltr" : "rtl",
                            justifyContent: {
                              md: "flex-start",
                              xs: "center",
                            },
                          }}
                        >
                          <Button
                            sx={{
                              bgcolor: colors.lightYellow,
                              color: "#fff",
                              fontFamily: publicFontFamily,
                              fontSize: "19px",
                              padding: "5px 10px",
                              borderRadius: "20px",
                              "&:hover": {
                                bgcolor: colors.heavyYellow,
                              },
                            }}
                            onClick={() => navigate("/departments")}
                          >
                            {language === "en" ? "Choose a cake" : "أختار كيك"}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: {
                          md: "center",
                          xs: "flex-end",
                        },
                        justifyContent: {
                          md: "flex-end",
                          xs: "center",
                        },
                        height: {
                          md: "auto",
                          xs: "65vh",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: {
                            md: 400,
                            xs: 0.8,
                          },
                          height: 300,
                          objectFit: "contain",
                          background: `url(${
                            imageBaseUrl + "/" + slide?.image
                          })`,
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sx={{
                        height: "60vh",
                        display: {
                          md: "none",
                          xs: "flex",
                        },
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          mb: {
                            md: "70px",
                            xs: "60px",
                          },
                          py: "20px",

                          width: 1,
                        }}
                      >
                        <>
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontSize: {
                                lg: "60px",
                                md: "45px",
                                xs: "32.5px",
                              },

                              fontWeight: "bold",
                            }}
                          >
                            {slide?.title_en
                              ? slide[`title_${language}`]
                              : "Old Title"}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontFamily: "'Tajawal', sans-serif",
                              fontSize: {
                                lg: "35px",
                                md: "30px",
                                xs: "20px",
                              },
                              fontWeight: "bold",
                              mt: "10px",
                            }}
                          >
                            {slide[`description_${language}`]
                              ? slide[`description_${language}`].length > 160
                                ? `${slide[`description_${language}`].slice(
                                    0,
                                    160
                                  )}...`
                                : slide[`description_${language}`]
                              : "Old Description"}
                          </Typography>
                        </>
                        <Box
                          sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            sx={{
                              bgcolor: `${colors.lightYellow} !important`,
                              color: "#fff",
                              fontFamily: publicFontFamily,
                              fontSize: "19px",
                              padding: "5px 10px",
                              borderRadius: "20px",
                              width: 0.6,
                            }}
                            onClick={() => navigate("/departments")}
                          >
                            {language === "en" ? "Choose a cake" : "أختار كيك"}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      ) : (
        <CustomError errorMessage={error?.data[`error_${language}`]} />
      )}
    </section>
  );
};

export default HeroSlider;
