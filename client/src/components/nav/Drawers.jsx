import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, IconButton, SvgIcon, Avatar } from "@mui/material";
import { customDrawerIcon, colors } from "./nav.styes";
import { profile_cart_likesData } from "./nav.data";
import LanguageToggler from "./LanguageToggler";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../../store/Store";
import {
  savedProductsApi,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import cartApi, { useGetAllCartsQuery } from "../../APIs/cartApi";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import DrawerItem from "./DrawerItem";
import useFetchSavedProducts from "../../Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import useFetchCart from "../../Pages/cart/useFetchCart";
import MobileProfileMenu from "./MobileProfileMenu";
import { useGetMeQuery } from "../../APIs/UserApis";
import { removeCurrentUser } from "../../APIs/userSlice";
import { useLazyGetMeQuery } from "../../APIs/UserApis";

export default function Drawers() {
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <MobileProfileMenu />
      {[...profile_cart_likesData].map((item, index) => {
        return (
          <CustomDrawer
            icon={item.icon}
            key={index}
            data={item?.data[0] ? item?.data : []}
            name={item.name}
            path={item.name === "cart" ? "/cart" : "/savedProducts"}
          />
        );
      })}
      <LanguageToggler />
      
    </Box>
  );
}

export const CustomDrawer = ({ icon, data, name, path }) => {
  // const { data: savedProducts, isError: savedError } =
  //   useGetAllSavedProductsQuery();
  const { pathname } = useLocation();
  const { savedProducts: savedData, getSaved } = useFetchSavedProducts();
  const { data: carts, isError: isErrCart } = useGetAllCartsQuery();
  const { carts: cartData, getCarts } = useFetchCart();
  const [callDrawerData, setCallDrawerData] = React.useState();
  const { currentUser } = useSelector((state) => state);
  React.useEffect(() => {
    if (callDrawerData) {
      // getSaved();
      // getCarts();
      setCallDrawerData(false);
    }
  }, [callDrawerData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saved } = useSelector((state) => state.saved);
  const { cart } = useSelector((state) => state.cart);
  const [state, setState] = React.useState({
    right: false,
  });
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    store.dispatch(savedProductsApi.util.resetApiState());
    dispatch(setSaved(0));
    store.dispatch(cartApi.util.resetApiState());
    dispatch(setCart(0));
    navigate("/sign-in");
    // alert("ok");
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
  } = useGetAllSavedProductsQuery();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setCallDrawerData(true);
  };
  const [_, { language }] = useTranslation();

  const list = (anchor) => {
    return (
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {data && data[0] && (
          <List>
            {[...data]
              .filter(({ name_en }) => {
                return false
                  ? name_en !== "Profile" && name_en !== "Logout"
                  : name_en !== "Login" && name_en !== "Register";
              })
              .map((text) => (
                <Box
                  key={text.name_en}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => {
                    if (text.name_en == "Logout") {
                      handleLogout();
                    } else {
                      handleNavigation(text.path);
                    }
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Box>
                          <SvgIcon component={text.icon} inheritViewBox />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          language === "en" ? text.name_en : text.name_ar
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </Box>
              ))}
          </List>
        )}
        {name === "likes" || name === "cart" ? (
          <DrawerItem
            name={name}
            data={name === "likes" ? savedData[0] && savedData : cartData}
          />
        ) : null}
        {/* <Divider /> */}
      </Box>
    );
  };
  return (
    <div>
      {[language === "en" ? "right" : "left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Box
            sx={{
              ...customDrawerIcon,
              mt: "6px",
              cursor: "pointer",
              transform: language === "en" ? "rotateY(180deg)" : 0,
              svg: {
                "&:hover": {
                  color: colors.newMainColor,
                },
                color:  {
                  md : pathname === "/" ? "#fff" : colors[pathname === path ? "newMainColor" : "grey"],
                  xs : pathname === "/" ? colors.grey : colors[pathname === path ? "newMainColor" : "grey"],

                },
              },
              display: {
                md: "initial",
                xs: name === "profile" ? "none" : undefined,
              },
            }}
          >
            <Badge
              sx={{
                ".MuiBadge-badge": {
                  bgcolor: colors.light,
                },
              }}
              badgeContent={
                name == "likes"
                  ? savedProducts?.products[0] && !isErrSaved
                    ? savedProducts?.products.length
                    : undefined
                  : name == "cart"
                  ? carts?.cart[0] && !isErrCart
                    ? carts?.cart.length
                    : undefined
                  : undefined
              }
              showZero={name != "profile"}
              onClick={() => navigate(path)}
            >
              {icon}
            </Badge>
          </Box>
        </React.Fragment>
      ))}
    </div>
  );
};
