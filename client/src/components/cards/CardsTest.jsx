import * as React from "react";
import Typography from "@mui/material/Typography";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Box, Stack } from "@mui/material";
import { CardsStackStyle, cardStyle, colors } from "./cardStyle";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { publicFontFamily } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

export default function CardsTest({
  items,
  title,
  singleDepartmentName,
  subCategories,
}) {
  const autoWidth = {
    xs: 1,
  };
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        direction: "ltr",
        width: {
          xl: 1500,
          lg: 1100,
          md: 0.85,
          xs: 0.9,
        },
        mx: "auto",
      }}
      key={title ? title : undefined}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          ...CardsStackStyle.cardsHeader,
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
            mb: {
              md: "50px",
              xs: "35px",
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
        sx={{
          ...CardsStackStyle,
        }}
      >
        {items && items[0] && (
          <Splide
            className="products_slider"
            hasTrack={false}
            width="100%"
            options={{
              perPage: 3,
              breakpoints: {
                1900: {
                  perPage: 3,
                },
                1200: {
                  perPage: 2,
                },

                768: {
                  perPage: 1,
                },
              },
              pagination: true,
            }}
          >
            <SplideTrack>
              {items?.map((item, index) => (
                <SplideSlide>
                  <Box key={index}>
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
