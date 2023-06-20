import { Box, Button, CardMedia, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import video from "../../assets/video.mp4";
import videoWall from "../../assets/video-wall.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Iframe = () => {
  const [state, setState] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    if (state) {
      videoRef.current.play();
    }
  }, [state]);
  return (
    <Box
      sx={{
        bgcolor: state ? "#badbdb8f" : undefined,
        mt: {
          md: "75px",
          xs: "50px",
        },
      }}
    >
      {!state ? (
        <Stack
          sx={{
            height: 500,
            backgroundImage: `url(${videoWall})`,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              left: 0,
              height: 1,
              width: 1,
              bgcolor: "#badbdb8f",
            }}
          >
            <Button
              sx={{
                height: 75,
                width: 75,
                bgcolor: "#c4cac7cf !important",
                borderRadius: "50%",
              }}
              onClick={() => setState(!state)}
            >
              <PlayArrowIcon
                sx={{
                  color: "#fff",
                  fontSize: "60px",
                }}
              />
            </Button>
          </Box>
        </Stack>
      ) : (
        <CardMedia
          component="video"
          src={video}
          title="YouTube video player"
          allowfullscreen
          type="video/mp4"
          ref={videoRef}
          controls={state ? true : false}
          sx={{
            height: state ? "50vh" : "40vh",
            width: 1,
            mx: "auto",
          }}
        />
      )}
    </Box>
  );
};

export default Iframe;
