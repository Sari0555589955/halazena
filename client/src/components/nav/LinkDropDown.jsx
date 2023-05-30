import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import { publicFontFamily } from "../publicStyle/publicStyle";
import { Box } from "@mui/material";
const LinkDropDown = ({
  item,
  pathname,
  footerTextColor,
  moreStyle,
  justifyContenValue,
}) => {
  const [_, { language: lang }] = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justifyContenValue && justifyContenValue,
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        sx={{
          ...moreStyle,
          color: footerTextColor ? footerTextColor : "#000",
          fontWeight: "bolder",
          textTransform: "capitalize",
          fontSize: "14px",
          backgroundColor: "transparent !important",
          fontFamily: publicFontFamily,
        }}
      >
        {item[`title_${lang}`]}
        <ArrowDropDownIcon
          sx={{
            transition: "transform 0.4s",
            transform: open ? "rotate(180deg)" : undefined,
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiList-root": {
            width: "in",
          },
        }}
      >
        {item?.nestedLinks.map((nested) => {
          return (
            <MenuItem
              key={nested.name}
              onClick={() => {
                navigate(`departments/${nested?._id}`);
                handleClose();
              }}
              sx={{
                fontFamily: publicFontFamily,
              }}
            >
              {nested?.name}
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={() => {
            navigate(`departments`);
            handleClose();
          }}
          sx={{
            fontFamily: publicFontFamily,
          }}
        >
          {lang === "en" ? "All Departments" : "جميع الأقسام"}
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default LinkDropDown;
