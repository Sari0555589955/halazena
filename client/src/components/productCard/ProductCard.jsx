import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../publicStyle/publicStyle";
import { cardStyle } from "../cards/cardStyle";
import { motion } from "framer-motion";
import { imageBaseUrl } from "../service";
import { useTranslation } from "react-i18next";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation, useNavigate } from "react-router-dom";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { toast } from "react-toastify";
import ProgressIcon from "../progressIcon/ProgressIcon";
const ProductCard = ({ item, externalWidth }) => {
  const navigate = useNavigate();
  const [addSavedProduct] = useAddToSavedProduct();
  const [mutateAddToCart] = useAddToCart();
  const [updateProduct] = useUpdateProductMutation();
  const [addToCart, { isLoading: addingLoading }] = useAddToCartMutation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const handleUpdateProduct = (item) => {
    updateProduct({ productId: item?._id, product: item }).then(
      ({ data, error }) => {
        if (!error) {
        } else {
          toast.error("some Error While updating ");
        }
      }
    );
  };
  const onSavedClicked = (item) => {
    addSavedProduct({ product: item?._id });
  };
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
  } = useGetAllSavedProductsQuery();
  const handleAddToCart = (productId) => {
    addToCart({
      product: productId,
      properties: [],
      // properties: myAttributes,
    }).then((res) => {
      if (res?.data) {
        toast.success(res?.data[`success_${language}`]);
      }
      toast.error(res?.error?.data[`error_${language}`]);
    });
  };
  return (
    <>
      <Box
        sx={{
          ...cardStyle.card,
          width: externalWidth
            ? externalWidth
            : {
                md: 300,
                sm: 250,
                xs: 0.9,
              },
          p: "10px",
          bgcolor: "#E4FDFD",
          height: 350,
        }}
      >
        <Stack direction="row" justifyContent={"flex-end"}>
          <Button
            sx={{
              minWidth: 0,
              pointerEvents:
                savedProducts &&
                !isErrSaved &&
                savedProducts?.products?.find(
                  (saved) => saved.product?._id === item?._id
                )
                  ? "none"
                  : "auto",
              cursor:
                savedProducts &&
                !isErrSaved &&
                savedProducts?.products?.find(
                  (saved) => saved.product?._id === item?._id
                )
                  ? "default"
                  : "pointer",
            }}
            onClick={() =>
              savedProducts &&
              !isErrSaved &&
              savedProducts?.products.find(
                (saved) => saved?.product?._id === item?._id
              )
                ? undefined
                : onSavedClicked(item)
            }
          >
            {savedProducts &&
            !isErrSaved &&
            savedProducts?.products?.find(
              (saved) => saved?.product?._id === item?._id
            ) ? (
              <FavoriteIcon
                sx={{
                  color: colors.newMainColor,
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  color: "#bbb",
                }}
              />
            )}
          </Button>
        </Stack>
        <Avatar
          src={imageBaseUrl + "/" + item.images[0]}
          alt={item.title}
          sx={{
            cursor: "pointer",
            height: 150,
            width: 150,
            my: "10px",
            mx: "auto",
          }}
          onClick={() => navigate(`/productDetails/${item._id}`)}
        />
        <Typography
          mb="10px"
          variant="h5"
          sx={{
            mt: "20px",
            textAlign: "center",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            wordBreak: "break-all",
          }}
        >
          {language === "en"
            ? item?.title_en?.length > 15
              ? item?.title_en.slice(0, 15) + "..."
              : item?.title_en
            : item?.title_ar?.length > 15
            ? item?.title_ar.slice(0, 15) + "..."
            : item?.title_ar}
        </Typography>
        <Stack direction="row" justifyContent="space-between" mt="30px">
          <Button
            sx={{
              fontFamily: publicFontFamily,
              border: `1px solid ${colors.newLightColor}`,
              fontSize: "17px",
              borderRadius: "20px",
              padding: "5px 10px",
              transition: "0.4s all",
              width: 1,
              color:
                !isErrCart &&
                cartData?.cart?.find(
                  ({ product }) => product?._id === item?._id
                )
                  ? "#fff !important"
                  : "#000 !important",
              bgcolor:
                !isErrCart &&
                cartData?.cart?.find(
                  ({ product }) => product?._id === item?._id
                )
                  ? `${colors.newLightColor} !important`
                  : "transparent !important",
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={() => handleAddToCart(item?._id)}
          >
            {addingLoading ? (
              <ProgressIcon
                size={30}
                condition={
                  !isErrCart &&
                  cartData?.cart?.find(
                    ({ product }) => product?._id === item?._id
                  )
                }
              />
            ) : !isErrCart &&
              cartData?.cart?.find(
                ({ product }) => product?._id === item?._id
              ) ? (
              language === "en" ? (
                "Remove from cart"
              ) : (
                "حذف من السلة"
              )
            ) : language === "en" ? (
              "Add to cart"
            ) : (
              "إضافة إلي السلة"
            )}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ProductCard;
