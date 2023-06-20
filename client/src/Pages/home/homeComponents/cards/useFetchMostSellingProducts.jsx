import React, { useEffect, useState } from "react";
import { useGetMostSellingProductsQuery } from "../../../../APIs/ProductApis";
import { useTranslation } from "react-i18next";

const handleUniqueMostSelling = (mostSelling) => {
  let newProductsObj = {};
  let copyProducts = [...mostSelling];
  let newProducts = [];
  copyProducts.forEach(({ product }, index) => {
    if (!newProductsObj[product._id]) {
      newProductsObj[product._id] = product;
      newProducts.push(product);
    }
  });
  return newProducts;
};
function useFetchMostSellingProducts() {
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    refetch: refetchMostSelling,
  } = useGetMostSellingProductsQuery();
  console.log("fetchingErro");
  const [mostSellingProducts, setMostSellingProducts] = useState([]);
  useEffect(() => {
    if (isSuccess && !isError) {
      let products = handleUniqueMostSelling(data.products);
      setMostSellingProducts((_) => products);
    }
  }, [isSuccess]);
  return {
    mostSellingProducts,
    refetchMostSelling,
    isLoading,
  };
}

export default useFetchMostSellingProducts;
