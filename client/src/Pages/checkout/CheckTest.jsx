import { Box, Button, Grid, Stack, Typography, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutAccordions from "./mui/Accordions";
import FormCheckout from "./mui/CheckForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { formikData, inputsData } from "./check_assets/checkout.inputs";
import { toast } from "react-toastify";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import useFetchCart from "./../cart/useFetchCart";
import { calculateTheTotalCart } from "../../APIs/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../APIs/ordersApi";
import { useTranslation } from "react-i18next";
import { checkoutButtonStyle } from "./check_assets/checkoutStyle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const CheckTest = () => {
  const [getMe] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const { getCarts, carts, error } = useFetchCart();
  const [_, { language: lang }] = useTranslation();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const formik = useFormik({
    initialValues: { ...formikData.values },
    validationSchema: Yup.object({ ...formikData.errors }),
    onSubmit: (values) => {
      if (values.payInCash) {
        delete values["creditCard"];
        delete values["expirationDate"];
        delete values["protectionSymbol"];
        delete values["formalName"];
      }
      addOrder({ ...values, phoneNumber: values.phone, phone: undefined }).then(
        ({ error, data }) => {
          if (error) {
            return toast.error(
              lang === "en" ? error.data?.error_en : error.data?.error_ar
            );
          }
          toast.success(lang === "en" ? data?.success_en : data?.success_ar);
          setTimeout(() => {
            // navigate("/completePayment");
            navigate("/thanksOrder");
          }, 2000);
        }
      );
    },
  });
  useEffect(() => {
    getMe().then(({ data, error }) => {
      if (data.user && !error) {
        const tempUser = { ...data.user };
        delete tempUser["_id"];
        delete tempUser["role"];
        delete tempUser["status"];
        delete tempUser["createdAt"];
        delete tempUser["updatedAt"];
        delete tempUser["__v"];
        delete tempUser["userName_en"];
        formik.setValues(tempUser);

        getCarts();
      }
    });
  }, []);
  const allCash = carts?.every(({ product }) => product.payInCash)
    ? true
    : false;
  useEffect(() => {
    if (carts[0]) {
      dispatch(calculateTheTotalCart(carts));
      formik.setValues({
        ...formik.values,
        payInCash: allCash,
        country: "",
        city: "",
        address: "",
        formalName: "",
        expirationDate: "",
      });
    }
  }, [carts]);
  // const [selected, setSelected] = useState(0);
  return (
    <Box
      sx={{
        p: 3,
        width: {
          xs: 1,
          md: 0.8,
        },
        mx: "auto",
        py: "150px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* <Grid container mt="10px">
          {!formik.values.payInCash && (
            <>
              <Box
                sx={{
                  width: 0.97,
                  mx: "auto",
                }}
              >
                <Typography variant="h4">
                  {language === "en" ? "Payment" : "الدفع"}
                </Typography>
                <Typography variant="h6">
                  {language === "en"
                    ? "Choose payment method"
                    : "أختر طريقة الدفع"}
                </Typography>
              </Box>
              {[...Array(5)].map((_, index) => (
                <Grid item xl={2.38} lg={3} md={4} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      mt: "20px",
                      width: 0.9,
                      mx: "auto",
                      height: "150px",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: "10px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelected(index)}
                  >
                    {selected === index && (
                      <CheckCircleIcon
                        sx={{
                          position: "absolute",
                          top: "-10px",
                          right: language === "ar" ? "-5px" : undefined,
                          left: language === "en" ? "-5px" : undefined,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      src={
                        "https://tse3.mm.bing.net/th?id=OIP.F387clXSIAjQrTo1cExmKgHaE8&pid=Api&P=0"
                      }
                      sx={{
                        height: "60px",
                        width: "auto",
                      }}
                    />
                  </Stack>
                </Grid>
              ))}
            </>
          )}
        </Grid> */}
        <FormCheckout inputsData={inputsData} formik={formik} />
        <Button sx={checkoutButtonStyle} type="submit">
          {lang === "en" ? "Checkout" : "دفع"}
        </Button>
      </form>
    </Box>
  );
};

export default CheckTest;
