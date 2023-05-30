import { Box, Button, Drawer, Stack, useTheme, styled } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinksData } from "./nav.data";
import {
  MobileItemListContainerStyle,
  MobileitemListStyle,
  colors,
} from "./nav.styes";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LinkDropDown from "./LinkDropDown";
import MobileProfileMenu from "./MobileProfileMenu";
import { publicFontFamily } from "../publicStyle/publicStyle";
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
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 0.65,
            pt: 6,
            px: 3,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
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
            <CloseIcon sx={{ color: "#fff" }} />
          </Button>
        </Stack>
        <Box sx={MobileItemListContainerStyle}>
          {NavLinksData().map((item, index) => {
            return item.nestedLinks ? (
              <LinkDropDown
                key={item}
                item={item}
                pathname={pathname}
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
                  color:
                    pathname === item.link ? colors.lightMainColor : "#000",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "transparent !important",
                  display: "block",
                  fontFamily: publicFontFamily,
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
              color:
                pathname === "/privacyPolicy" ? colors.lightMainColor : "#000",
              fontFamily: publicFontFamily,
            }}
          >
            {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
          </Button>
          <MobileProfileMenu />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileSidebar;
