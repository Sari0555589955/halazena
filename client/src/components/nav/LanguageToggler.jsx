import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { customDrawerIcon } from "./nav.styes";
import { useTranslation } from "react-i18next";
import { colors } from "../publicStyle/publicStyle";
import { useLocation } from "react-router-dom";
const LanguageToggler = () => {
  const [_, { language, changeLanguage }] = useTranslation();
  const { pathname } = useLocation();
  const toggleLanguage = () => {
    language === "en" ? changeLanguage("ar") : changeLanguage("en");
  };
  return (
    <Box
      sx={{
        mx: {
          xl: "inherit",
          xs: "5px",
        },
      }}
    >
      <Button
        onClick={toggleLanguage}
        sx={{
          fontWeight: "bold",
          width: "30px",
          height: "30px",
          borderRadius: "10px%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 0,
          border: 1,
          mx: {
            lg: "5px",
            xs: "2px",
          },
          borderColor: {
            md: pathname === "/" ? "#fff" : colors.grey,
            xs: colors.grey,
          },
          p: "3px 20px",
          "&:hover": {
            borderColor: colors.newMainColor,
            bgcolor: colors.newMainColor,
            span: {
              color: "#fff",
            },
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: "17px",
            color: {
              md: pathname === "/" ? "#fff" : colors.grey,
              xs: colors.grey,
            },
          }}
        >
          {language === "en" ? "AR" : "EN"}
        </Typography>
      </Button>
    </Box>
  );
};

export default LanguageToggler;
