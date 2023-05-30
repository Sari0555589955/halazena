import { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React, { useEffect } from "react";
// import colors from "../../";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllCategoriesQuery } from "../../APIs/categoriesApi";
import { imageBaseUrl } from "../service";
const DepartmentsSlider = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [_, { language }] = useTranslation();
  const { data } = useGetAllCategoriesQuery();
  useEffect(() => {
    if (data?.categories) {
      setCategories(data?.categories?.category);
    }
  }, [data?.categories]);
  const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "0.7s all",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    "&:hover": {
      backgroundColor: "#f8f8f8",
      transform: "scale(0.97)",
    },
  });
  return (
    <Box
      sx={{
        position: "relative",
        direction: "ltr",
      }}
    >
      <Box
        sx={{
          width: {
            xl: "1200px",
            lg: "992px",
            xs: 0.9,
          },
          mx: "auto",
          mt: "-225px",
          py: "70px",
        }}
        className="doctors-carousel"
      >
        {categories && (
          <Splide
            hasTrack={false}
            options={{
              type: "loop",
              perPage: 3,
              arrows: false,
              width: "100%",
              interval: "5000",
              speed: "2000",
              autoplay: true,
              breakpoints: {
                1900: {
                  perPage: 3,
                },
                1200: {
                  perPage: 3,
                },
                992: {
                  perPage: 1,
                },
                768: {
                  perPage: 1,
                },
                600: {
                  perPage: 1,
                },
              },
              pagination: true,
              gap: "40px",
            }}
          >
            <SplideTrack
              style={
                {
                  // overflowY: "visible",
                }
              }
            >
              {categories?.map((category) => (
                <SplideSlide>
                  <StyledBox
                    onClick={() => navigate(`/departments/كل_العيادات`)}
                    sx={{
                      height: {
                        lg: 240,
                        md: 200,
                        xs: 190,
                      },
                    }}
                  >
                    <Box>
                      <Avatar
                        sx={{
                          mx: "auto",
                          height: "60px",
                          width: "60px",
                        }}
                        src={`${imageBaseUrl}/${category?.image}`}
                      />
                      <Typography variant="h6" mt="6px">
                        {category?.name}
                      </Typography>
                    </Box>
                  </StyledBox>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        )}
      </Box>
    </Box>
  );
};

export default DepartmentsSlider;
