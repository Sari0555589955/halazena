import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetAllCartsQuery } from "../../APIs/cartApi";
import { setCart } from "../../APIs/cartSlice";

export default function useFetchCart() {
  const [_, { language: lang }] = useTranslation();
  const [
    getAllCart,
    {
      data,
      isError,
      isSuccess,

      error: cartError,
    },
  ] = useLazyGetAllCartsQuery();
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     getAllCart().then(({ data }) => {
  //       if (data.cart[0]) {
  //         setCartData(data?.cart);
  //         setError("");
  //         dispatch(setCart(data.cart.length));
  //       } else {
  //         setError(error?.data[`error_${lang}`]);
  //         setCartData([]);
  //       }
  //     });
  //   }
  // }, [isSuccess]);

  function getCarts() {
    if (sessionStorage.getItem("token")) {
      getAllCart().then(({ data, error }) => {
        if (data?.cart[0]) {
          setCartData(data?.cart);
          setError("");
          dispatch(setCart(data.cart.length));
        } else {
          setError(error?.data[`error_${lang}`]);
          setCartData([]);
        }
      });
    }
  }

  return { carts: cartData, error, isSuccess, getCarts };
}
