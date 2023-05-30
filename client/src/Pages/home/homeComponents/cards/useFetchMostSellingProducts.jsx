import React, { useEffect, useState } from "react";
import { useGetMostSellingProductsQuery } from "../../../../APIs/ProductApis";

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
    refetch: refetchMostSelling,
  } = useGetMostSellingProductsQuery();
  const [mostSellingProducts, setMostSellingProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isSuccess && !isError) {
      let products = handleUniqueMostSelling(data.products);
      // let temp =
        
      //   products?.map((item) => {
      //     return { ...item?.product };
      //   });
      setMostSellingProducts((_) => products);
      setError("");
    } else {
      setError("Error Happenend While Fetching Most Newiest Products");
    }
  }, [isSuccess]);
  return { mostSellingProducts, mostSellingError: error, refetchMostSelling };
}

export default useFetchMostSellingProducts;
