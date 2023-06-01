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
  const navigate = useNavigate();
  const [_, { language }] = useTranslation();
  const [subCategories, setSubCategories] = React.useState();
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const [allCategories, setAllCategories] = React.useState();
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
  console.log("categoryId", categoryId);
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
  useEffect(() => {
    if (dataCategories?.categories) {
      setAllCategories(dataCategories?.categories?.category);
    }
  }, [dataCategories]);

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
          {categoryId ? (
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
                        lg: 400,
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

                <Box>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: "80px",
                    }}
                  >
                    {allCategories &&
                      allCategories?.map((category) => (
                        <Button
                          variant="h1"
                          border={1}
                          borderColor={"red"}
                          sx={{
                            bgcolor:
                              categoryId === category._id
                                ? `${colors.newLightColor} !important`
                                : "#F5F5F5 !important",
                            color:
                              categoryId === category._id
                                ? "#fff !important"
                                : "#000 !important",
                            fontFamily: publicFontFamily,
                            fontSize: "17px",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            navigate(`/departments/${category._id}`)
                          }
                        >
                          {category?.name}
                        </Button>
                      ))}
                  </Stack>
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
                </Box>
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
            <Box
              sx={{
                width: {
                  lg: 1500,
                  md: 0.9,
                  xs: 0.97,
                },
                mx: "auto",
              }}
            >
              {allCategories?.map((category) => (
                <Box
                  key={category?._id}
                  sx={{
                    width: 1,
                    mt: "40px",
                    pt: "100px",
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
