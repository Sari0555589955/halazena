import React from "react";
import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  CardMedia,
  Paper,
  Table,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import {
  useClearCartMutation,
  useDeleteFromCartMutation,
  useGetAllCartsQuery,
  useUpdateQuantityMutation,
} from "../../APIs/cartApi";
import bckwall from "../../assets/Group.png";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { baseUrl, imageBaseUrl } from "../../components/service";
const CartTest = () => {
  const [_, { language }] = useTranslation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const navigate = useNavigate();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [clearCart, { isLoading: clearingCartLoading }] =
    useClearCartMutation();
  var cartTotalPrice =
    cartData?.cart &&
    !isErrCart &&
    cartData.cart.reduce(
      (price, item) => price + item.product?.price * item.Quantity,
      0
    );
  const deleteItem = (product) => {
    deleteFromCart(product._id).then((res) =>
      toast.success(res?.data[`success_${language}`])
    );
  };
  const inc = (item) => {
    updateQuantity({
      product: item.product._id,
      Quantity: item.Quantity + 1,
    }).then((res) => toast.success(res?.data[`success_${language}`]));
  };
  const dec = (item) => {
    updateQuantity({
      product: item.product._id,
      Quantity: item.Quantity - 1,
    }).then((res) => toast.success(res?.data[`success_${language}`]));
  };
  const { currentUser } = useSelector((state) => state);
  const checkoutNavigation = () => {
    if (!currentUser?.email) {
      toast.error(
        language === "en"
          ? "You should login first"
          : "يجب عليك تسجيل الدخول أولا"
      );
      // setTimeout(() => {
      //   navigate("/sign-in");
      // }, 1000);
    } else {
      navigate("/checkout");
    }
  };
  const handleClearAllCart = () => {
    clearCart().then(({ data }) => {
      if (data) {
        toast.success(data[`success_${language}`]);
      }
    });
  };
  return (
    <Box
      sx={{
        pt: "200px",
        pb: "50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 0.9,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            color: colors.grey,
          }}
        >
          {language === "en" ? "Shopping cart" : "عربة التسوق"}
        </Typography>
      </Box>

      {cartData?.cart[0] && !isErrCart ? (
        <>
          <Box
            sx={{
              width: {
                lg: 0.9,
                xs: 0.95,
              },
              mx: "auto",
              overflowX: {
                lg: "hidden",
                xs: "scroll",
              },
              "&::-webkit-scrollbar": {
                height: 15,
              },

              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },

              "&::-webkit-scrollbar-thumb ": {
                background: colors.newLightColor,
              },

              "&::-webkit-scrollbar-thumb:hover": {
                background: colors.newMainHeavyColor,
              },
            }}
          >
            <Box
              sx={{
                py: "100px",
              }}
            >
              <Button
                sx={{
                  bgcolor: `${colors.newLightColor} !important`,
                  color: "#fff",
                  fontFamily: publicFontFamily,
                  fontSize: "20px",
                  fontWeight: "bold",
                  transition: "0.3s all",
                  "&:active": {
                    transform: "scale(0.9)",
                  },
                }}
                onClick={handleClearAllCart}
              >
                {language === "en" ? "Clear Cart" : "تفريغ السلة"}
              </Button>
            </Box>
            <Box
              sx={{
                width: {
                  lg: 1,
                  xs: 1500,
                },
              }}
            >
              <Grid container py="10px">
                <Grid item xs={3}>
                  <Typography
                    fontFamily={publicFontFamily}
                    variant="h6"
                    fontWeight={"bold"}
                    align={"center"}
                  >
                    {language === "en" ? "Product" : "المنتج"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    fontFamily={publicFontFamily}
                    variant="h6"
                    fontWeight={"bold"}
                    align={"center"}
                  >
                    {language === "en" ? "Count" : "الكمية"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    fontFamily={publicFontFamily}
                    variant="h6"
                    fontWeight={"bold"}
                    align={"center"}
                  >
                    {language === "en" ? "Price" : "السعر"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    fontFamily={publicFontFamily}
                    variant="h6"
                    fontWeight={"bold"}
                    align={"center"}
                  >
                    {language === "en" ? "Delete" : "حذف"}
                  </Typography>
                </Grid>
              </Grid>

              {cartData?.cart.map((item) => (
                <Grid
                  container
                  borderTop={1}
                  borderColor={colors.newLightColor}
                  py="20px"
                >
                  <Grid item xs={3}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent={"center"}
                      gap="20px"
                      height={200}
                    >
                      <CardMedia
                        component="img"
                        src={`${imageBaseUrl}/${item?.product?.images[0]}`}
                        sx={{
                          height: 100,
                          width: 150,
                          objectFit: "contain",
                        }}
                      />
                      <Box
                        sx={{
                          height: 100,
                          overflow: "hidden",
                          width: 325,
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontFamily={publicFontFamily}
                          fontWeight={"bold"}
                        >
                          {item.product[`title_${language}`]}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontFamily={publicFontFamily}
                          fontWeight={"bold"}
                        >
                          {item?.product?.price}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack
                      direction="row"
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap="10px"
                      height={200}
                    >
                      <AddCircleIcon
                        sx={{
                          cursor: "pointer",
                          color: colors.newLightColor,
                          transform: "scale(1.2)",
                          transition: "all 0.2s",
                          "&:active": {
                            transform: "scale(1)",
                          },
                        }}
                        onClick={() => inc(item)}
                      />
                      <Typography
                        fontFamily={publicFontFamily}
                        variant="h6"
                        fontWeight={"bold"}
                        align={"center"}
                      >
                        {item?.Quantity}
                      </Typography>

                      <RemoveCircleIcon
                        sx={{
                          display: "block",
                          cursor: item.Quantity !== 1 && "pointer",
                          pointerEvents: item.Quantity === 1 && "none",
                          color:
                            item.Quantity === 1 ? "#bbb" : colors.newLightColor,
                          transform: "scale(1.2)",
                          transition: "all 0.2s",
                          "&:active": {
                            transform: "scale(1)",
                          },
                        }}
                        onClick={() => dec(item)}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack
                      direction="row"
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap="6px"
                      height={200}
                    >
                      <Typography
                        fontFamily={publicFontFamily}
                        variant="h6"
                        fontWeight={"bold"}
                        align={"center"}
                      >
                        {item.product?.price * item.Quantity + " "}
                        {language === "en" ? "SAR" : "ريال سعودي"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Stack
                      direction="row"
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap="6px"
                      height={200}
                    >
                      <CancelIcon
                        sx={{
                          color: colors.newLightColor,
                          cursor: "pointer",
                          transform: "scale(1.2)",
                          transition: "all 0.2s",
                          "&:active": {
                            transform: "scale(1)",
                          },
                        }}
                        onClick={() => deleteItem(item.product)}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            height={200}
            borderTop={1}
            borderColor={colors.newLightColor}
            sx={{
              width: 0.9,
              mx: "auto",
            }}
          >
            <Typography
              fontFamily={publicFontFamily}
              variant="h6"
              fontWeight={"bold"}
              align={"center"}
            >
              {language === "en" ? "Total" : "الإجمالي"}
            </Typography>
            <Stack
              sx={{
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
                alignItems: "center",
              }}
              gap="10px"
            >
              <Typography
                fontFamily={publicFontFamily}
                variant="h6"
                fontWeight={"bold"}
                align={"center"}
              >
                {cartData?.cart[0] && !isErrCart ? cartTotalPrice : 0}

                {cartData?.cart[0] && !isErrCart
                  ? language === "en"
                    ? " SAR"
                    : " ريال سعودي"
                  : undefined}
              </Typography>
              <Button
                variant="contained"
                type="button"
                onClick={checkoutNavigation}
                sx={{
                  bgcolor: `${colors.newLightColor} !important`,
                  color: "#fff",
                  p: "5px 40px",
                  fontSize: "18px",
                  textTransform: "capitalize",
                  borderRadius: "30px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                {language === "en" ? "Checkout" : "دفع"}
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 400,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "red",
              fontFamily: publicFontFamily,
            }}
            variant="h5"
          >
            {language === "en" ? "Cart is empty" : "السلة فارغة"}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default CartTest;
