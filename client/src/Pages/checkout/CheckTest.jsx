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
import { useClearCartMutation } from "../../APIs/cartApi";

const CheckTest = () => {
  const [getMe] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const { getCarts, carts, error } = useFetchCart();
  const [_, { language: lang }] = useTranslation();
  const dispatch = useDispatch();
  const [addOrder] = useAddOrderMutation();
  const [clearCart] = useClearCartMutation();
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
          clearCart();
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
        receiptDay: 5,
      });
    }
  }, [carts]);
  console.log("formik values", formik.values);
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
        <FormCheckout inputsData={inputsData} formik={formik} />
        <Button sx={checkoutButtonStyle} type="submit">
          {lang === "en" ? "Checkout" : "دفع"}
        </Button>
      </form>
    </Box>
  );
};

export default CheckTest;
