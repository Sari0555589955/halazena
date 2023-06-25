import { Avatar, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoStyles } from "./nav.styes";
import whiteLogo from "../../assets/whiteLogo.png";
function Logo({ imagePath, text }) {
  const navigate = useNavigate();
  return (
    <Box sx={logoStyles} onClick={() => navigate("/")}>
      {imagePath && (
        <Avatar
          sx={{
            height: {
              md: 80,
              xs: 60,
            },
            width: {
              md: 50,
              xs: 40,
            },
            borderRadius: 0,
            mx: "auto",
            transform: "rotate(0)",
          }}
          src={imagePath}
        />
      )}
    </Box>
  );
}

export default Logo;
