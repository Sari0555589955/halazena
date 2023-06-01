import React, { useEffect, useState } from "react";
import { useLazyGetAllSubCategoriesQuery } from "../../APIs/categoriesApi";
import useFetchDepartments from "./useFetchDepartments";
import { Box, Stack, Typography } from "@mui/material";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
import ProductCard from "../../components/productCard/ProductCard";
import Loader from "../../components/loader/loader";

const SeparateDepartment = ({ category }) => {
  const { products, error, isLoading } = useFetchDepartments(category?._id);

  return (
    <Box>
      {category?.name && products[0] && (
        <>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontFamily: `${publicFontFamily} !important`,
              fontWeight: "bold",
            }}
          >
            {category?.name}
          </Typography>
          <Stack
            sx={{
              flexWrap: "wrap",
              flexDirection: {
                lg: "row",
                xs: "column",
              },
              justifyContent: "space-evenly",
              gap: "15px",
            }}
          >
            {products?.map((product) => (
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
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default SeparateDepartment;
