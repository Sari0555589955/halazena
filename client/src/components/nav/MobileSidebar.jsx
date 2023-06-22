import { Box, Button, Drawer, Stack, useTheme, styled } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinksData } from "./nav.data";
import { MobileItemListContainerStyle, colors } from "./nav.styes";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LinkDropDown from "./LinkDropDown";
import { publicFontFamily } from "../publicStyle/publicStyle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const MobileSidebar = ({ container, mobileOpen, handleDrawerToggle }) => {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (mobileOpen) {
      handleDrawerToggle();
    }
  }, [pathname]);
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 0.55,
            bgcolor: "#99ECEA",
            pt: 6,
            px: 3,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent={lang ==='en' ?"flex-start" : "flex-end" }>
          <Button
            sx={{
              width: "35px",
              height: "35px",
              minWidth: "auto",
              borderRadius: 1,
              bgcolor: `${colors.heavyMainColor} !important`,
            }}
            onClick={handleDrawerToggle}
          >
            <KeyboardBackspaceIcon sx={{ color: colors.newMainColor }} />
          </Button>
        </Stack>
        <Box sx={MobileItemListContainerStyle}>
          {NavLinksData().map((item, index) => {
            return item.nestedLinks ? (
              <LinkDropDown
                key={index}
                item={item}
                pathname={pathname}
                extraColor="#000"
                moreStyle={{
                  fontSize: "16px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "transparent !important",
                  display: "block",
                }}
              />
            ) : (
              <Button
                key={item.link}
                disableRipple
                onClick={() => navigate(item.link)}
                sx={{
                  borderBottom:
                    pathname === item.link
                      ? `1px solid ${colors.newMainColor}`
                      : "transparent",
                  color: "#000",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "transparent !important",
                  display: "block",
                  fontFamily: publicFontFamily,
                  "&:hover": {
                    borderBottom: `1px solid ${colors.newMainColor}`,
                  },
                }}
              >
                {item[`title_${lang}`]}
              </Button>
            );
          })}
          <Button
            disableRipple
            onClick={() => navigate("/privacyPolicy")}
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              fontWeight: "bold",
              backgroundColor: "transparent !important",
              display: "block",
              color: "#000",
              fontWeight: "bold",
              borderBottom:
                pathname === "/privacyPolicy"
                  ? `1px solid ${colors.newMainColor}`
                  : "1px solid transparent",
              fontFamily: publicFontFamily,
              "&:hover": {
                borderBottom: `1px solid ${colors.newMainColor}`,
              },
            }}
          >
            {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileSidebar;
