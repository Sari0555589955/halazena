import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useFetchSliders from "./useFetchSliders";
import { toast } from "react-toastify";
import { ImageUrl } from "../../../App";
import { useTranslation } from "react-i18next";

const Slider = () => {
  const [_, { language }] = useTranslation();
  const { sliders } = useFetchSliders();

  return (
    <Box mt={-16}>
      <Splide
        options={{
          fixedWidth: "100%",
          autoplay: true,
          interval: 2000,
          type: "loop",
          cover: true,
          direction: language === "en" ? "ltr" : "rtl",
        }}
      >
        {sliders.map((slider) => (
          <SplideSlide key={slider._id}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: "100%",
                  height: {
                    md: "100vh",
                    xs: "50vh",
                  },
                  borderRadius: 0,
                }}
                src={`${ImageUrl}/${slider.image}`}
                alt="Image 1"
              />
              <Stack
                direction="column"
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: "40%",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
              >
                <Typography variant="h2">{slider.title}</Typography>
                <Typography variant="h3">{slider.description}</Typography>
              </Stack>
            </Box>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default Slider;
