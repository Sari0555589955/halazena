import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
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
            className="heroSection_slider"
            options={{
              autoplay: true,
              pauseOnHover: false,
              resetProgress: false,
              speed: "2000",
              arrows: false,
              direction: language === "en" ? "ltr" : "rtl",
              pagination: true,
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
                      pt: {
                        md: "50px",
                        xs: 0,
                      },
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
                      md={7}
                      xs={12}
                      sx={{
                        pt: "150px",
                        display: {
                          md: "flex",
                          xs: "none",
                        },
                        alignItems: {
                          md: "flex-end",
                          xs: "flex-start",
                        },
                        justifyContent: "flex-start",
                        color: "#707070",
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
                                lg: "35px",
                                md: "30px",
                                xs: "20px",
                              },
                              mt: "-60px",
                              fontWeight: "bold",
                              fontFamily: publicFontFamily,
                            }}
                          >
                            {language === "en"
                              ? slide?.title_en
                              : slide?.title_ar}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: publicFontFamily,
                              fontSize: {
                                xl: "50px",
                                lg: "40px",
                                md: "35px",
                                xs: "25.5px",
                              },
                              fontWeight: 900,
                              mt: "10px",
                              height: 400,
                            }}
                          >
                            {language === "en"
                              ? slide?.description_en?.length > 160
                                ? slide?.description_en.slice(0, 160) + "..."
                                : slide?.description_en
                              : slide?.description_ar?.length > 160
                              ? slide?.description_ar.slice(0, 160) + "..."
                              : slide?.description_ar}
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
                              fontSize: {
                                md: "21px",
                                xs: "18.5px",
                              },
                              padding: "5px 10px",
                              borderRadius: "20px",
                              textTransform: "none",
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
                      md={5}
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        height: {
                          md: "auto",
                          xs: "50vh",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={imageBaseUrl + "/" + slide?.image}
                        sx={{
                          width: {
                            xl: 500,
                            lg: 450,
                            md: 400,
                            xs: 250,
                          },
                          height: {
                            lg: 600,
                            md: 450,
                            xs: 300,
                          },
                          objectFit: "contain",
                          mb: {
                            md: "100px",
                            xs: 0,
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sx={{
                        height: 800,
                        display: {
                          md: "none",
                          xs: "flex",
                        },
                        px: {
                          md: 0,
                          xs: "10px",
                        },
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        color: "#707070",
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
                              fontSize: {
                                lg: "35px",
                                md: "30px",
                                xs: "20px",
                              },
                              mt: "-60px",
                              fontWeight: "bold",
                              fontFamily: publicFontFamily,
                            }}
                          >
                            {language === "en"
                              ? slide?.title_en
                              : slide?.title_ar}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: publicFontFamily,
                              fontSize: {
                                lg: "60px",
                                md: "45px",
                                xs: "32.5px",
                              },
                              fontWeight: 900,
                              mt: "10px",
                              height: 450,
                            }}
                          >
                            {language === "en"
                              ? slide?.description_en?.length > 160
                                ? slide?.description_en.slice(0, 160) + "..."
                                : slide?.description_en
                              : slide?.description_ar?.length > 160
                              ? slide?.description_ar.slice(0, 160) + "..."
                              : slide?.description_ar}
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
                              textTransform: "capitalize !important",

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
        <CustomError
          errorMessage={error?.data && error?.data[`error_${language}`]}
        />
      )}
    </section>
  );
};

export default HeroSlider;
