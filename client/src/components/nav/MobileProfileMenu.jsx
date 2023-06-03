import * as React from "react";
import { Button, Menu, Stack, Typography } from "@mui/material";
import { ProfileMenuData, profile_cart_likesData } from "./nav.data";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../../store/Store";
import { savedProductsApi } from "../../APIs/SavedProductApi";
import cartApi from "../../APIs/cartApi";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { use } from "i18next";
import { removeCurrentUser } from "../../APIs/userSlice";
import { useLogoutMutation } from "../../APIs/UserApis";
export default function MobileProfileMenu() {
  const { currentUser } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    handleClose();
    logout().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      store.dispatch(savedProductsApi.util.resetApiState());
      store.dispatch(cartApi.util.resetApiState());
      dispatch(setSaved(0));
      dispatch(setCart(0));
      navigate("/");
      dispatch(removeCurrentUser());
    });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [_, { language }] = useTranslation();
  const handleClickMenuItem = (item) => {
    item.name_en === "Logout" ? handleLogout() : navigate(item.path);
    handleClose();
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        sx={{
          width: "auto",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        {open ? (
          <CloseIcon
            sx={{
              fontSize: {
                lg: "27px",
                xs: "25",
              },
              color: colors[pathname === "/profile" ? "newMainColor" : "grey"],
            }}
          />
        ) : (
          <AccountCircleIcon
            sx={{
              fontSize: {
                lg: "27px",
                xs: "25px",
              },
              color: colors[pathname === "/profile" ? "newMainColor" : "grey"],
            }}
          />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          width: "100%",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {ProfileMenuData.filter(({ name_en }) =>
          currentUser && currentUser?.email
            ? name_en !== "Login" && name_en !== "Register"
            : name_en !== "Profile" && name_en !== "Logout"
        ).map((item) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => handleClickMenuItem(item)}
            sx={{
              cursor: "pointer",
              gap: "10px",
              p: "10px",
              bgcolor:
                item.name_en === "Profile" && pathname === "/profile"
                  ? `${colors.newMainColor} !important `
                  : undefined,
              svg: {
                color:
                  item.name_en === "Profile" && pathname === "/profile"
                    ? `#fff !important `
                    : undefined,
              },
            }}
          >
            {item.icon}
            <Typography
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                color:
                  item.name_en === "Profile" && pathname === "/profile"
                    ? `#fff !important `
                    : undefined,
              }}
            >
              {item[`name_${language}`]}
            </Typography>
          </Stack>
        ))}
      </Menu>
    </div>
  );
}
