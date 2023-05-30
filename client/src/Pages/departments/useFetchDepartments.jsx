import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyGetAllProductsQuery } from "../../APIs/ProductApis";
const useFetchDepartments = (id) => {
  const [getAll, { isLoading }] = useLazyGetAllProductsQuery();
  const [_, { language: lang }] = useTranslation();
  const [products, setProducts] = useState([]);
  const [productsError, setError] = useState("");
  useEffect(() => {
    getAll(id, false).then(({ error, data }) => {
      if (error) {
        setError(error?.data[`error_${lang}`]);
        setProducts([]);
      } else {
        setProducts(data?.products.products);
        setError("");
      }
    });
  }, [id]);
  return { products, error: productsError, isLoading };
};

export default useFetchDepartments;
