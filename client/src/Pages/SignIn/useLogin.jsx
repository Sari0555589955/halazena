import React, { useEffect, useState } from "react";
import { useLazyGetMeQuery, useLoginMutation } from "../../APIs/UserApis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLazyGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { useLazyGetAllCartsQuery } from "../../APIs/cartApi";
import { useDispatch } from "react-redux";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import { setCurrentUser } from "../../APIs/userSlice";
function useLogin() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [_, { language: lang }] = useTranslation();
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const [getCartsByUser, {}] = useLazyGetAllCartsQuery();
  const [getSavedProducts, {}] = useLazyGetAllSavedProductsQuery();
  const handleDispatchedData = () => {
    if (sessionStorage.getItem("token")) {
      getCartsByUser().then(({ data, error }) => {
        if (data?.cart[0] && !error) {
          dispatch(setCart(data?.cart.length));
        }
      });
      getSavedProducts().then(({ data, error }) => {
        if (data?.products[0] && !error) {
          dispatch(setSaved(data?.products.length));
        }
      });
    }
  };
  function authUser(user) {
    if (user?.email && user?.password) {
      login(user).then(({ data, error }) => {
        if (data?.userInfo) {
          sessionStorage.setItem("token", data?.userInfo?.token);
          handleDispatchedData();
          dispatch(setCurrentUser(data?.userInfo.user));
          navigate("/");
        } else {
          toast.error(error?.data[`error_${lang}`]);
        }
      });
    } else {
      toast.error("Both User email and user password are Required");
    }
  }

  return [authUser];
}

export default useLogin;
