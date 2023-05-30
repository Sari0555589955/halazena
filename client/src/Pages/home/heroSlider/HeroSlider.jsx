import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import "./sliderStyle.css";
import { useGetAllSlidersQuery } from "../../../APIs/SectionApis";
import { imageBaseUrl } from "../../../components/service";
import { useNavigate } from "react-router-dom";
const HeroSlider = () => {
  const [_, { language }] = useTranslation();
  const { data } = useGetAllSlidersQuery();
  const navigate = useNavigate();
  return (
    <section>
      <section
        className="slider slider-homePage"
        style={{
          direction: "ltr",
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
            arrows: true,
            interval: "4000",
          }}
        >
          {data?.sections &&
            data?.sections.map((slide, index) => (
              <SplideSlide
                key={index}
                style={{
                  position: "relative",
                }}
              >
                {slide?.image && (
                  <Box
                    className="home_slider"
                    sx={{
                      // backgroundImage: `url(${IMAGE_URL}${slide?.image})`,
                      background: `linear-gradient(${
                        language === "en" ? "90" : "270"
                      }deg, rgba(184,192,208,1) 9%, rgba(137,177,255,0.06206232492997199) 44%), url(${
                        imageBaseUrl + "/" + slide?.image
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "left",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      className="zoomIn"
                      sx={{
                        //   background: "rgba(235, 235, 235,0.3)",
                        direction: "rtl !important",

                        mb: {
                          md: "70px",
                          xs: "60px",
                        },
                        py: "20px",
                        px: {
                          lg: "100px",
                          md: "60px",
                          xs: "30px",
                        },
                        // bgcolor: "#00000036",
                        width: 1,
                        direction: language === "en" ? "ltr" : "rtl",
                      }}
                    >
                      <>
                        <Typography
                          sx={{
                            textAlign: {
                              md: "initial",
                              xs: "center",
                            },
                            fontSize: {
                              lg: "60px",
                              md: "45px",
                              xs: "32.5px",
                            },
                            mt: "-60px",
                            fontWeight: "bold",
                          }}
                        >
                          {slide?.title ? slide?.title : "كيك"}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: {
                              md: "initial",
                              xs: "center",
                            },
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
                          {slide?.description
                            ? slide?.description.length > 160
                              ? `${slide?.description.slice(0, 160)}...`
                              : slide?.description
                            : "qqqqqqq"}
                        </Typography>
                      </>
                      <Box
                        sx={{
                          mt: 4,
                          display: "flex",
                          justifyContent: {
                            md: "flex-start",
                            xs: "center",
                          },
                        }}
                      >
                        <Button
                          sx={{
                            bgcolor: `${colors.newMainHeavyColor} !important`,
                            color: "#fff",
                            fontFamily: publicFontFamily,
                            fontSize: "19px",
                            padding: "5px 10px",
                          }}
                          onClick={() => navigate("/departments")}
                        >
                          {language === "en" ? "Choose a cake" : "أختار كيك"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
              </SplideSlide>
            ))}
        </Splide>
      </section>
    </section>
  );
};

export default HeroSlider;
