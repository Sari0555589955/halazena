import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { publicFontFamily } from "../publicStyle/publicStyle";
import LinkDropDown from "./LinkDropDown";
import { NavLinksData } from "./nav.data";
import { colors } from "./nav.styes";
export default function NavLinks() {
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box
      sx={{
        display: {
          md: "flex",
          xs: "none",
        },
        gap: 2,
      }}
    >
      {NavLinksData().map((item, index) => {
        return item.nestedLinks ? (
          <LinkDropDown
            key={item}
            item={item}
            pathname={pathname}
            extraColor={pathname === "/" ? "#fff" : colors.grey}
          />
        ) : (
          <Button
            key={item.link}
            disableRipple
            onClick={() => navigate(item.link)}
            sx={{
              color: pathname === "/" ? "#fff" : colors.grey,
              fontSize: {
                lg: "16px",
                md: "13px",
              },
              textTransform: "capitalize",
              backgroundColor: "transparent !important",
              fontFamily: publicFontFamily,
              fontWeight: "bolder !important",
              borderRadius : 0,
              borderBottom: `1px solid ${
                pathname === item.link ? colors.newMainColor : "transparent"
              }`,
              "&:hover": {
                borderBottom: `1px solid ${colors.newMainColor}`,
              },
            }}
          >
            {item[`title_${lang}`]}
          </Button>
        );
      })}
    </Box>
  );
}
