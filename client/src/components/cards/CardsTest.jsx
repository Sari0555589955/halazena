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
              speed: "1000",
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
