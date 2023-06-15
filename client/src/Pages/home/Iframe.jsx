import { CardMedia, Stack } from "@mui/material";
import React from "react";

const Iframe = () => {
  return (
    <Stack
      sx={{
        bgcolor: "#59D8D5",
      }}
    >
      <CardMedia
        component="iframe"
        src="https://www.youtube.com/embed/hbfiJHW-LP4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        sx={{
          height: 500,
          width: {
            lg: 750,
            md: 500,
            xs: 0.9,
          },
          mx: "auto",
        }}
      ></CardMedia>
    </Stack>
  );
};

export default Iframe;
