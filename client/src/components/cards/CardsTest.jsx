import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";

import { CardsStackStyle, cardStyle, colors } from "./cardStyle";
import ProductDetailsModal from "./ProductDetailsModal";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import useFetchSavedProducts from "../../Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import { useTranslation } from "react-i18next";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import ReactStars from "react-rating-stars-component";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { publicFontFamily, publicSizes } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";
export default function CardsTest({
  items,
  title,
  singleDepartmentName,
  subCategories,
}) {
  const autoWidth = {
    lg:
      subCategories && subCategories?.length > 0 ? "calc(100vw - 200px)" : 1200,
    xs: 1,
  };
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        direction: "ltr",
      }}
      key={title ? title : undefined}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          ...CardsStackStyle.cardsHeader,
          width: autoWidth,
          mx: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bolder",
            textTransform: "capitalize",
            bgcolor: pathname === "/" ? "transparent" : undefined,
            color: pathname === "/" ? "#000" : "#000",
            fontWeight: "bold",
            fontFamily: publicFontFamily,
            fontSize: {
              xl: "30px",
              lg: "26px",
              md: "21px",
              xs: "18px",
            },
            py: {
              lg: "20px",
              xs: "16px",
            },
            px: {
              lg: "100px",
              xs: "70px",
            },
            borderRadius:
              pathname === "/"
                ? language === "en"
                  ? "0 50px 50px 0"
                  : "50px 0 0 50px"
                : 0,
          }}
        >
          {title ? title : singleDepartmentName}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent={"center"}
        flexWrap="wrap"
        sx={{
          ...CardsStackStyle,
          width: autoWidth,
          mx: "auto",
        }}
      >
        {items && items[0] && (
          <Splide
            className="products_slider"
            hasTrack={false}
            options={{
              width: "100%",
              type: "loop",
              perPage: 3,
              arrows: true,
              interval: "3000",
              speed: "2000",
              focus: false,
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
              style={{
                overflow: "hidden",
              }}
            >
              {items?.map((item, index) => (
                <SplideSlide>
                  <Box key={index} sx={cardStyle.wrapper}>
                    <ProductCard item={item} />
                  </Box>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        )}
      </Stack>
    </Box>
  );
}
