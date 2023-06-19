import React from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  useDeleteSavedProductMutation,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { toast } from "react-toastify";
import { imageBaseUrl } from "../../components/service";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
const SavedTest = () => {
  const [_, { language: lang }] = useTranslation();
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
  } = useGetAllSavedProductsQuery();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation();
  const [deleteSavedProduct] = useDeleteSavedProductMutation();
  const deleteProduct = (id) => {
    deleteSavedProduct(id).then(({ data, error }) => {
      if (data) {
        toast.success(data[`success_${lang}`]);
      }
      if (error) {
        toast.error(error?.data[`error_${lang}`]);
      }
    });
  };
  const handleAddToCart = (productId) => {
    addToCart({
      product: productId,
      properties: [],
      // properties: myAttributes,
    }).then((res) => {
      if (res?.data) {
        toast.success(res?.data[`success_${lang}`]);
      }
      toast.error(res?.error?.data[`error_${lang}`]);
    });
  };
  return (
    <Box
      sx={{
        py: "150px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        container
        sx={{
          width: 0.95,
          mx: "auto",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          gap: {
            xl: "50px",
            lg: "40px",
            md: "30px",
      
            xs: "20px",
          },
          flexWrap: "wrap",
        }}
      >
        {savedProducts?.products &&
          !isErrSaved &&
          savedProducts.products.map((item) => (
            <Box
              sx={{
                width: 300,
                height: 350,
                p: 1.5,
                backgroundColor: "#DFFCFC",
                zIndex: 2,
                borderRadius: "25px",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <Stack direction="row" justifyContent={"flex-end"}>
                <DeleteIcon
                  sx={{ color: colors.newLightColor, cursor: "pointer" }}
                  onClick={() => deleteProduct(item.product._id)}
                />
              </Stack>
              <Avatar
                src={imageBaseUrl + "/" + item.product.images[0]}
                alt={item.product[`title_${lang}`]}
                sx={{
                  cursor: "pointer",
                  height: 150,
                  width: 150,
                  my: "10px",
                  mx: "auto",
                }}
                onClick={() => navigate(`/productDetails/${item?.product._id}`)}
              />
              <Typography
                mb="10px"
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  mt: "20px",
                }}
              >
                {item.product[`title_${lang}`]}
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
                    width: 0.9,
                    mx: "auto",
                    color:
                      !isErrCart &&
                      cartData?.cart?.find(
                        ({ product }) => product?._id === item?.product?._id
                      )
                        ? "#fff !important"
                        : "#000 !important",
                    bgcolor:
                      !isErrCart &&
                      cartData?.cart?.find(
                        ({ product }) => product?._id === item?.product?._id
                      )
                        ? `${colors.newLightColor} !important`
                        : "transparent !important",
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                  onClick={() => handleAddToCart(item?.product?._id)}
                >
                  {!isErrCart &&
                  cartData?.cart?.find(
                    ({ product }) => product?._id === item?.product?._id
                  )
                    ? lang === "en"
                      ? "Remove from cart"
                      : "حذف من السلة"
                    : lang === "en"
                    ? "Add to cart"
                    : "إضافة إلي السلة"}
                </Button>
              </Stack>
            </Box>
          ))}

        {error && (
          <Box
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30vh",
            }}
          >
            <Typography
              sx={{
                color: "red",
                fontWeight: "bold",
                fontFamily: publicFontFamily,
              }}
            >
              {lang === "en"
                ? "Sorry but your productList is empty"
                : "عذرا ولكن قائمة المنتجات الخاصة بك فارغة"}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SavedTest;
