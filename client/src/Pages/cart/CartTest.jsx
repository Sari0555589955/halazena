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
      {/* <Grid
        container
        sx={{
          width: 0.9,
          mx: "auto",
        }}
      >
        <Grid
          item
          md={7}
          xs={12}
          sx={{
            height: {
              md:
                cartData?.cart[0] && cartData?.cart?.length <= 2 && !isErrCart
                  ? "40vh"
                  : undefined,
              xs: "auto",
            },
          }}
        >
          {cartData?.cart[0] && !isErrCart ? (
            cartData?.cart.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: {
                    md: "center",
                    xs: "flex-start",
                  },
                  justifyContent: "space-between",
                  px: "10px",
                  mt: "25px",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap={"wrap"}
                  sx={{
                    width: {
                      md: 0.96,
                      xs: 1,
                    },
                    py: "2.5vh",
                    borderRadius: "40px",
                    bgcolor: "#FEFBFB",
                    px: "15px",
                  }}
                >
                  <Stack
                    direction="row"
                    gap="10px"
                    sx={{
                      alignItems: {
                        md: "center",
                        xs: "flex-start",
                      },
                      justifyContent: {
                        md: "center",
                        xs: "flex-start",
                      },
                      width: {
                        md: "auto",
                        xs: 1,
                      },
                    }}
                  >
                    <Avatar />
                    <Box
                      sx={{
                        width: {
                          lg: "300px",
                          md: "150px",
                          xs: "auto",
                        },
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: publicFontFamily,
                          fontWeight: "bold",
                        }}
                      >
                        {item.product.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: publicFontFamily,
                        }}
                        variant="body"
                      >
                        {item.product.smallDesc}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      display: {
                        md: "flex",
                        xs: "none",
                      },
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      <AddCircleIcon
                        sx={{
                          display: "block",
                          cursor: "pointer",
                        }}
                        onClick={() => inc(item)}
                      />

                      <RemoveCircleIcon
                        sx={{
                          display: "block",
                          cursor: item.Quantity !== 1 && "pointer",
                          pointerEvents: item.Quantity === 1 && "none",
                          color: item.Quantity === 1 && "#bbb",
                        }}
                        onClick={() => dec(item)}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      {item.Quantity}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: {
                        md: "auto",
                        xs: 0.5,
                      },
                      fontFamily: publicFontFamily,
                    }}
                  >
                    {item.product.price * item.Quantity}{" "}
                    {language === "en" ? "SAR" : "ريال سعودي"}
                  </Box>
                  <Box
                    sx={{
                      display: {
                        md: "none",
                        xs: "flex",
                      },
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <AddCircleIcon
                      sx={{
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={() => inc(item)}
                    />
                    <Typography
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      {item.Quantity}
                    </Typography>
                    <RemoveCircleIcon
                      sx={{
                        display: "block",
                        cursor: item.Quantity !== 1 && "pointer",
                        pointerEvents: item.Quantity === 1 && "none",
                        color: item.Quantity === 1 && "#bbb",
                      }}
                      onClick={() => dec(item)}
                    />
                  </Box>
                </Stack>
                <CancelIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => deleteItem(item.product)}
                />
              </Box>
            ))
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "40vh",
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
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            mt: {
              md: 0,
              xs: "20px",
            },
          }}
        >
          <Box
            sx={{
              width: {
                md: 0.8,
                xs: 1,
              },
              mx: "auto",
              bgcolor: "#FEFBFB",
              borderRadius: "20px",
              px: "25px",
              py: "10px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={1}
              borderColor={"divider"}
              py="25px"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: publicFontFamily,
                }}
              >
                {language === "en" ? "Total" : "الإجمالي"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {cartData?.cart[0] && !isErrCart ? cartTotalPrice : 0}
                {language === "en" ? " SAR" : " ريال سعودي"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              py="25px"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: publicFontFamily,
                }}
              >
                {language === "en" ? "Items" : "العناصر"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {cartData?.cart[0] && !isErrCart ? cartData?.cart.length : 0}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              type="button"
              onClick={checkoutNavigation}
              sx={{
                bgcolor: `${colors.newMainColor} !important`,
                color: "#fff",
                p: "5px 12px",
                fontSize: "18px",
                textTransform: "capitalize",
                mt: "25px",
                width: 1,
                borderRadius: "30px",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
              }}
            >
              {language === "en" ? "Checkout" : "دفع"}
            </Button>
          </Box>
        </Grid>
      </Grid> */}
      <Box
        sx={{
          width: 0.9,
          mx: "auto",
          mt: "100px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            textAlign: "center",
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
