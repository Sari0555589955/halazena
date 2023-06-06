import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import {
  colors,
  publicButton,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ThanksOrderPage = () => {
  const [_, { language }] = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack
      height={"100vh"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            color: colors.newMainColor,
            textAlign: "center",
            fontFamily: publicFontFamily,
          }}
        >
          {language === "en" ? "THANKS" : "شكراً"}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",

            color: colors.grey,
            textAlign: "center",
            fontFamily: publicFontFamily,
          }}
        >
          {language === "en" ? "FOR THE ORDER" : "علي الطلب"}
        </Typography>
        <Stack direction="center" justifyContent="center" gap="20px" mt="40px">
          <Button sx={{ ...publicButton }} onClick={() => navigate("/")}>
            {language === "en" ? "Go To Home Page" : "إذهب الي الرئيسية"}
          </Button>
          {/* <Button
            sx={{
              ...publicButton,
              bgcolor: "transparent",
              color: colors.newMainColor,
              border: `1.5px solid ${colors.newMainColor}`,
            }}
            onClick={() => navigate("/cart")}
          >
            {language === "en" ? "Go To cart" : "إذهب إلي السلة"}
          </Button> */}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ThanksOrderPage;
