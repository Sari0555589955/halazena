import { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllCategoriesQuery } from "../../APIs/categoriesApi";
import { imageBaseUrl } from "../service";
import { publicFontFamily } from "../publicStyle/publicStyle";
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
    transition: "0.7s all",
    backgroundColor: "#f4f4f4 ",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    border: "1px solid transparent",
    "&:hover": {
      transform: "scale(0.98)",
      boxShadow: "#66DFDC  0px 2px 8px 0px"
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
            xl: 1500,
            lg: 1100,
            md: 0.85,
            xs: 0.9,
          },
          mx: "auto",
          mt: "-175px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: {
            lg: "space-between",
            xs: "center",
          },
        }}
      >
        {categories &&
          categories.map((category) => (
            <StyledBox
              onClick={() => navigate(`/departments/${category._id}`)}
              sx={{
                height: {
                  lg: 180,
                  xs: 150,
                },
                width: {
                  lg: 300,
                  xs: 0.42,
                },
                mt: "10px",
              }}
            >
              <Box>
                <Avatar
                  sx={{
                    mx: "auto",
                    height: {
                      md: 60,
                      xs: 45,
                    },
                    width: {
                      md: 60,
                      xs: 45,
                    },
                  }}
                  src={`${imageBaseUrl}/${category?.image}`}
                />
                <Typography
                  variant="h6"
                  mt="6px"
                  align="center"
                  sx={{
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                    fontSize: {
                      md: "20px",
                      xs: "15px",
                    },
                  }}
                >
                  {category[`name_${language}`]}
                </Typography>
              </Box>
            </StyledBox>
          ))}
      </Box>
    </Box>
  );
};

export default DepartmentsSlider;
