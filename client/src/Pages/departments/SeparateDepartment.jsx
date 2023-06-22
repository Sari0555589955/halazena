import React, { useEffect, useState } from "react";
import { useLazyGetAllSubCategoriesQuery } from "../../APIs/categoriesApi";
import useFetchDepartments from "./useFetchDepartments";
import { Box, Stack, Typography } from "@mui/material";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import ProductCard from "../../components/productCard/ProductCard";
import Loader from "../../components/loader/loader";
import { useTranslation } from "react-i18next";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import DepartmentProduct from "./DepartmentProduct";
const SeparateDepartment = ({ category }) => {
  const { products } = useFetchDepartments(category?._id);
  const [_, { language: lang }] = useTranslation();

  return (
    <Box
      sx={{
        direction: "ltr !important",
      }}
    >
      {category?.name_en && products[0] && (
        <>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                md: "30px",
                xs: "20px",
              },
              fontFamily: `${publicFontFamily} !important`,
              fontWeight: "bold",
              color: colors.grey,
              mb: "40px",
            }}
          >
            {category[`name_${lang}`]}
          </Typography>
          <Stack
            sx={{
              mx: "auto",
            }}
          >
            <Box
              component={Splide}
              className="products_slider department_products_slider"
              hasTrack={false}
              width="100%"
              sx={{
                width: {
                  xl: 1,
                  md: "150vw",
                  xs: "150vw",
                },
                ml: {
                  xl: 0,
                  lg: "-25%",
                  md: "-17%",
                  xs: "-35%",
                },
              }}
              options={{
                perPage: 4,
                perMove: 1,
                arrows: false,
                autoplay: true,
                breakpoints: {
                  1900: {
                    perPage: 4,
                  },
                  1500: {
                    perPage: 5,
                  },
                  1200: {
                    perPage: 5,
                  },
                  992: {
                    perPage: 5,
                  },
                  900: {
                    perPage: 3,
                  },
                  768: {
                    perPage: 3,
                  },
                  600: {
                    perPage: 3,
                  },
                },
              }}
            >
              <SplideTrack>
                {products?.map((item, index) => (
                  <Box
                    component={SplideSlide}
                    key={index}
                    sx={{
                      mx: {
                        xl: 0,
                        lg: 0,
                        md: "15px",
                        xs: "10px",
                      },
                    }}
                  >
                    <DepartmentProduct item={item} />
                  </Box>
                ))}
              </SplideTrack>
            </Box>
            {/* {products?.map((product) => (
              <Box
                sx={{
                  mt: "10px",
                }}
              >
                <ProductCard
                  item={product}
                  externalWidth={{
                    lg: 400,
                    md: 0.6,
                    xs: 1,
                  }}
                />
              </Box>
            ))} */}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SeparateDepartment;
