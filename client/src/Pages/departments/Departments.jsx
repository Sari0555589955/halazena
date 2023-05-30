import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import CustomError from "../../components/Error/Error";
import Loader from "../../components/loader/loader";
import useFetchCategories from "../home/category/useFetchCategories";
import useFetchDepartments from "./useFetchDepartments";
import { useLazyGetAllSubCategoriesQuery } from "../../APIs/categoriesApi";
import { useLazyGetAllProductsBySubIdQuery } from "../../APIs/ProductApis";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/joy";
import {
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
function Departments() {
  const { categoryId } = useParams();
  const { pathname } = useLocation();
  const { products, error, isLoading } = useFetchDepartments(categoryId);
  const [_, { language }] = useTranslation();
  const [subCategories, setSubCategories] = React.useState();
  const [showResetBtn, setShowResetBtn] = React.useState(false);
  const [subProducts, setSubProducts] = React.useState({
    data: null,
    errorMessage: "",
  });
  const [getAllSubCategories] = useLazyGetAllSubCategoriesQuery();
  const [getAllProductsBySubId] = useLazyGetAllProductsBySubIdQuery();
  const singleDepartmentName = useFetchCategories()?.find(({ _id }) =>
    _id === categoryId ? true : false
  )?.name;
  const fetchCategories = () =>
    getAllSubCategories(
      pathname === "/departments" ? undefined : categoryId
    ).then(({ isError, data }) => {
      if (!isError) {
        setSubCategories(data.subCategories);
        setShowResetBtn(false);
        setSubProducts({
          ...subProducts,
          data: null,
        });
      }
    });
  useEffect(() => {
    fetchCategories();
  }, []);
  const getAllProductsBySub = (id, count) => {
    getAllProductsBySubId(id, count).then(({ data, error }) => {
      setSubProducts({
        ...subCategories,
        errorMessage: error ? error?.data[`error_${language}`] : undefined,
        data: data ? data?.products?.products : undefined,
      });
    });
    setShowResetBtn(true);
  };
  return (
    <Box
      sx={{
        pt: 15,
        pb: 7,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <>
          <Stack
            sx={{
              flexDirection: {
                lg: "row",
                xs: "column",
              },
              justifyContent: "space-between",
            }}
          >
            {subCategories?.length > 0 && (
              <Box
                sx={{
                  mt: "20px",
                  width: {
                    lg: "400px",
                    xs: 1,
                  },
                  display: {
                    lg: "block",
                    xs: "flex",
                  },
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {subCategories?.map((sub, index) => (
                  <Stack
                    key={sub._id}
                    sx={{
                      mt: index === 0 ? "10px" : "15px",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      disableRipple
                      sx={{
                        bgcolor: "#fff !important",
                        color: "#000",
                        transform: "scale(1) !important",
                        boxShadow: "0px 1px 2px #000 !important",
                        fontFamily: publicFontFamily,
                        fontSize: publicSizes.xSmall,
                        fontWeight: "bold",
                      }}
                      onClick={() => getAllProductsBySub(sub._id, 1)}
                    >
                      {sub?.name}
                    </Button>
                  </Stack>
                ))}
                {showResetBtn ? (
                  <Stack
                    sx={{
                      mt: "15px",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      disableRipple
                      sx={{
                        color: "#000",
                        transform: "scale(1) !important",
                        boxShadow: "0px 1px 2px #7AA7C7 !important",
                        bgcolor: "#EBF4FB !important",
                        border: "1px solid #7AA7C7",
                      }}
                      onClick={() => fetchCategories()}
                    >
                      {language === "en" ? "Reset" : "إعادة"}
                    </Button>
                  </Stack>
                ) : undefined}
              </Box>
            )}
            <Cards
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              items={
                subProducts.data !== null
                  ? subProducts.data?.length > 0
                    ? subProducts.data
                    : undefined
                  : products
              }
              singleDepartmentName={singleDepartmentName}
            />
          </Stack>
          {subProducts?.errorMessage && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
              sx={{
                height: "10vh",
                width: {
                  lg: "calc(100% - 200px)",
                  xs: 1,
                },
                mr: language === "ar" ? "auto" : undefined,
                ml: language === "en" ? "auto" : undefined,
                py: "6vh",
              }}
            >
              <Typography
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {subProducts.errorMessage}
              </Typography>
            </Stack>
          )}
        </>
      ) : (
        <CustomError errorMessage={error} />
      )}
    </Box>
  );
}

export default Departments;
