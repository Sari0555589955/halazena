import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutAccordions from "./mui/Accordions";
import FormCheckout from "./mui/CheckForm";
import { useFormik } from "formik";
import { formikData, inputsData } from "./check_assets/checkout.inputs";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import useFetchCart from "./../cart/useFetchCart";
import { calculateTheTotalCart } from "../../APIs/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation } from "../../APIs/ordersApi";
import { useTranslation } from "react-i18next";
const CheckoutPage = () => {
  const [getMe] = useLazyGetMeQuery();
  const { getCarts, carts, error } = useFetchCart();
  const [_, { language }] = useTranslation();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const formik = useFormik({
    initialValues: { ...formikData.values },
    validationSchema: Yup.object({ ...formikData.errors }),
    onSubmit: (values) => {
      values = {
        ...values,
        products: carts,
        phoneNumber: values.phone,
        phone: undefined,
      };
      addOrder(values).then((res) =>
        toast.success(
          language === "en" ? res.data.success_en : res.data.success_ar
        )
      );
      // delete values[phone]
      // toast.success("ok");
      // formik.resetForm();
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

  const allCash = carts?.every(({ product }) => product.payInCash);
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
        expirationDate: null,
      });
    }
  }, [carts]);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <Box
      sx={{
        py: "150px",
        width: {
          xs: 1,
          md: 0.8,
        },
        mx: "auto",
      }}
    >
      <Grid container>
        <Grid item lg={6} md={12} xs={12} mt={3}>
          <Paper
            elevation={3}
            sx={{ width: 0.95, mx: "auto", p: 3, borderRadius: 0 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <FormCheckout inputsData={inputsData} formik={formik} />
              <CheckoutAccordions
                formik={formik}
                paymentIsCash={formik.values.payInCash}
              />
            </form>
          </Paper>
        </Grid>
        <Grid item lg={6} md={12} xs={12} mt={3}>
          <Paper
            elevation={3}
            sx={{ width: 0.95, mx: "auto", p: 3, borderRadius: 0 }}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              Cart Total
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={1}
              borderColor="divider"
              py={3}
            >
              <Typography fontWeight="bold">Subtotal</Typography>
              <Typography>{totalPrice}</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              borderBottom={1}
              borderColor="divider"
              py={3}
            >
              <Typography fontWeight="bold">Charge</Typography>
              <Typography>Free</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              py={3}
            >
              <Typography fontWeight="bold">Total</Typography>
              <Typography>{totalPrice}</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
