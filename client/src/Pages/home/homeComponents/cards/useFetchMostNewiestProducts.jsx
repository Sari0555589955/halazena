import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMostNewiestProductsQuery } from "../../../../APIs/ProductApis";
import { unsetRefetch } from "../../../../APIs/refetchSlice";

function useFetchMostNewiestProducts() {
  const { refetching } = useSelector((state) => state.refetching);
  const {
    data,
    isSuccess,
    isError,
    refetch: mostNewiestRefetch,
  } = useGetMostNewiestProductsQuery();
  const [mostNewiestProducts, setMostNewiestProducts] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && !isError) {
      setMostNewiestProducts((_) => data?.products);
      setError("");
    } else {
      setError("Error Happenend While Fetching Most Newiest Products");
    }
    if (refetching) {
      mostNewiestRefetch();
      dispatch(unsetRefetch());
    }
  }, [isSuccess, refetching]);
  return { mostNewiestProducts, mostNewiestError: error, mostNewiestRefetch };
}

export default useFetchMostNewiestProducts;
