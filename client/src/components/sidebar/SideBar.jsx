import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Stack } from "@mui/material";
import LinkDropDown from "../nav/LinkDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MobileItemListContainerStyle } from "../nav/nav.styes";
import { NavLinksData } from "../nav/nav.data";

export default function SideBar() {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    setState({
      left: false,
      right: false,
    });
  }, [pathname]);

  return (
    <Box
      sx={{
        display: {
          md: "none",
          xs: "block",
        },
      }}
    >
      <Button onClick={toggleDrawer(lang === "en" ? "left" : "right", true)}>
        <MenuIcon
          sx={{
            fontSize: "25px",
            color: {
              md: colors.newMainColor,
              xs: pathname.includes("/productDetails/") ? "#fff" : colors.newMainHeavyColor,
            },
          }}
        />
      </Button>
      <Drawer
        anchor={lang === "en" ? "left" : "right"}
        open={state[lang === "en" ? "left" : "right"]}
        onClose={toggleDrawer(lang === "en" ? "left" : "right", false)}
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
        <Stack direction="row" alignItems="center" justifyContent={"flex-end"}>
          <Button
            sx={{
              width: "35px",
              height: "35px",
              minWidth: "auto",
              borderRadius: 1,
              bgcolor: `${colors.heavyMainColor} !important`,
            }}
            onClick={toggleDrawer(lang === "en" ? "left" : "right", false)}
          >
            <KeyboardBackspaceIcon
              sx={{
                color: "#fff",
                transform: lang === "ar" ? "rotateY(180deg)" : 0,
              }}
            />
          </Button>
        </Stack>
        <Box sx={MobileItemListContainerStyle}>
          {NavLinksData().map((item, index) => {
            return item.nestedLinks ? (
              <LinkDropDown
                key={index}
                item={item}
                pathname={pathname}
                extraColor={pathname.includes("/department") ? "#fff" : "#aaa"}
              />
            ) : (
              <Button
                key={item.link}
                disableRipple
                onClick={() => navigate(item.link)}
                sx={{
                  color: pathname === item.link ? "#fff" : "#aaa",
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
              color: "#000",
              fontWeight: "bold",
              color: pathname === "/privacyPolicy" ? "#fff" : "#aaa",

              fontFamily: publicFontFamily,
            }}
          >
            {lang === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
