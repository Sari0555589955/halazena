import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import CustomError from "../../components/Error/Error";
import Loader from "../../components/loader/loader";
import useFetchCategories from "../home/category/useFetchCategories";
import useFetchDepartments from "./useFetchDepartments";
import { useLazyGetAllSubCategoriesQuery } from "../../APIs/categoriesApi";
import { useLazyGetAllProductsBySubIdQuery } from "../../APIs/ProductApis";
import { useGetAllCategoriesQuery } from "../../APIs/categoriesApi";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/joy";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
import SeparateDepartment from "./SeparateDepartment";
function Departments() {
  const { categoryId } = useParams();
  const { pathname } = useLocation();
  const { products, error, isLoading } = useFetchDepartments(categoryId);
  const [_, { language }] = useTranslation();
  const [subCategories, setSubCategories] = React.useState();
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const [allCategories, setAllCategories] = React.useState();
  const [showResetBtn, setShowResetBtn] = React.useState(false);
  const [activedSub, setActivedSub] = React.useState("");
  const [subProducts, setSubProducts] = React.useState({
    data: null,
    errorMessage: "",
  });
  const [getAllSubCategories] = useLazyGetAllSubCategoriesQuery();
  const [getAllProductsBySubId] = useLazyGetAllProductsBySubIdQuery();
  const singleDepartmentName_en = useFetchCategories()?.find(({ _id }) =>
    _id === categoryId ? true : false
  )?.name_en;
  const singleDepartmentName_ar = useFetchCategories()?.find(({ _id }) =>
    _id === categoryId ? true : false
  )?.name_ar;

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
      setActivedSub(id);
    });
    setShowResetBtn(true);
  };
  useEffect(() => {
    if (dataCategories?.categories) {
      setAllCategories(dataCategories?.categories?.category);
    }
  }, [dataCategories]);
  console.log("single cat", dataCategories?.categories?.category);
  return (
    <Box
      sx={{
        pt: 15,
        pb: 7,
        overflowX: "hidden",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <>
          {categoryId ? (
            <>
              <Box>
                {subCategories?.length > 0 && (
                  <Box
                    sx={{
                      mt: "20px",
                      width: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {subCategories?.map((sub) => (
                      <Button
                        disableRipple
                        sx={{
                          bgcolor:
                            activedSub === sub?._id
                              ? `${colors.newLightColor} !important`
                              : "#fff !important",
                          color: activedSub === sub?._id ? "#fff" : "#000",
                          transform: "scale(1) !important",
                          // boxShadow: "0px 1px 2px #000 !important",
                          fontFamily: publicFontFamily,
                          fontSize: publicSizes.xSmall,
                          fontWeight: "bold",
                          border: `1px solid ${
                            activedSub === sub?._id
                              ? colors.newLightColor
                              : "#ddd"
                          }`,
                        }}
                        onClick={() => getAllProductsBySub(sub._id, 1)}
                      >
                        {sub[`name_${language}`]}
                      </Button>
                    ))}
                  </Box>
                )}
                {showResetBtn ? (
                  <Stack
                    sx={{
                      mt: "10px",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      disableRipple
                      sx={{
                        // color: "#000",
                        // transform: "scale(1) !important",
                        // boxShadow: "0px 1px 2px #7AA7C7 !important",
                        // bgcolor: "#EBF4FB !important",
                        // border: "1px solid #7AA7C7",

                        color: "#000",
                        transform: "scale(1) !important",
                        // boxShadow: "0px 1px 2px #000 !important",
                        fontFamily: publicFontFamily,
                        fontSize: publicSizes.xSmall,
                        fontWeight: "bold",
                        border: "1px solid #ddd",
                        transition: "all 0.4s",
                      }}
                      onClick={() => {
                        fetchCategories();
                        setActivedSub("");
                      }}
                    >
                      {language === "en" ? "Reset" : "إعادة"}
                    </Button>
                  </Stack>
                ) : undefined}
                <Box
                  sx={{
                    pb: "100px",
                  }}
                >
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
                    singleDepartmentName={
                      language === "en"
                        ? singleDepartmentName_en
                        : singleDepartmentName_ar
                    }
                  />
                  {/* <Box
                    sx={{
                      width: 1,
                      mt: "75px",
                    }}
                  >
                    <SeparateDepartment
                      category={
                        dataCategories &&
                        dataCategories?.categories?.category.find(
                          ({ _id }) => _id === categoryId
                        )
                      }
                    />
                  </Box> */}
                </Box>
              </Box>
              {subProducts?.errorMessage && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                  sx={{
                    height: "10vh",
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
            <Box
              sx={{
                mb: "50px",
                pt: "25px",
              }}
            >
              {allCategories?.map((category) => (
                <Box
                  key={category?._id}
                  sx={{
                    width: 1,
                    mt: "75px",
                  }}
                >
                  <SeparateDepartment category={category} />
                </Box>
              ))}
            </Box>
          )}
        </>
      ) : (
        <CustomError errorMessage={error} />
      )}
    </Box>
  );
}

export default Departments;
