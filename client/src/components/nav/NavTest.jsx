import * as React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Box, Stack, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import { urlPath } from "./nav.data";
import NavLinks from "./NavLinks";
import Drawers from "./Drawers";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";
import LanguageToggler from "./LanguageToggler";
import { colors } from "./nav.styes";
import { motion } from "framer-motion";
import urlPath from "../../assets/Group.png";
import { useTranslation } from "react-i18next";
import { publicFontFamily } from "../publicStyle/publicStyle";
import { useLocation, useNavigate } from "react-router-dom";
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [_, { language }] = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        display:
          pathname === "/sign-in" || pathname === "/register"
            ? "none"
            : "block",
        position: "fixed",
        top: {
          md: "20px",
          xs: 0,
        },
        width: "100%",
        zIndex: 1000,
        bgcolor: "transparent",
      }}
    >
      <CssBaseline />
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: {
            md: "#fff",
            xs: colors.newMainColor,
          },
          py: 1.5,
          width: {
            xs: 1,
            md: 0.92,
          },
          mx: "auto",
          // borderRadius: {
          //   lg: "50px",
          //   md: "35px",
          //   xs: 1,
          // },
          // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          px: {
            lg: "60px",
            md: "30px",
            xs: "10px",
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mx: 1,
              display: {
                md: "none",
                xs: "flex",
              },
              backgroundColor: `${colors.newMainColor} !important`,
              borderRadius: 1,
              p: {
                sm: 0.8,
                xs: 0.7,
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "19px", color: "#fff" }} />
          </IconButton>
          <Box>
            <Logo imagePath={urlPath} />
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: publicFontFamily,
                color: {
                  md: "#000",
                  xs: "#fff",
                },
              }}
              onClick={() => navigate("/")}
            >
              {language === "en" ? "ABAYA STORE" : "متجر عباية"}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" >
          <NavLinks />
          <Drawers handleDrawerToggle={handleDrawerToggle} />
        </Stack>
      </Toolbar>
      <MobileSidebar
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}

export default DrawerAppBar;