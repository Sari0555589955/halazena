import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import CardsTest from "../../components/cards/CardsTest";
import useFetchProducts from "./homeComponents/cards/useFetchProducts";
import useFetchMostSellingProducts from "./homeComponents/cards/useFetchMostSellingProducts";
import useFetchMostNewiestProducts from "./homeComponents/cards/useFetchMostNewiestProducts";
import { sectionStyle } from "./homeStyle";
import { motion } from "framer-motion";
import { AboutUsShared } from "../aboutUs/AboutUsPage";
import { useDispatch } from "react-redux";
import { colors } from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import HeroSlider from "./heroSlider/HeroSlider";
import DepartmentsSlider from "../../components/departmentsSlider/DepartmentsSlider";
import { useGetAboutUsDataQuery } from "../../APIs/aboutUsApi";
import Loader from "../../components/loader/loader";
import CustomError from "../../components/Error/Error";
import HomeContact from "./HomeContact";
import Iframe from "./Iframe";
function Home() {
  const dispatch = useDispatch();
  const [_, { language }] = useTranslation();
  const { mostSellingProducts, isLoading: loadingSellings } =
    useFetchMostSellingProducts();
  const { mostNewiestProducts, isLoading: loadingNewiest } =
    useFetchMostNewiestProducts();
  const { data: aboutSectionData, isLoading: aboutIsLoading } =
    useGetAboutUsDataQuery();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        overflowX: "hidden",
      }}
    >
      <Box>
        <HeroSlider />
        <DepartmentsSlider />
      </Box>
      {loadingNewiest ? (
        <Loader />
      ) : mostNewiestProducts[0] ? (
        <Box sx={{ pt: 3 }}>
          <CardsTest
            items={mostNewiestProducts}
            title={language === "en" ? "Most newiest" : "الأحدث"}
          />
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "Most newiest products are not dound"
              : "لم يتم العثور على المنتجات الأحدث"
          }
        />
      )}
      <Box
        sx={{
          mt: "30px",
        }}
      >
        <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} />
      </Box>
      {loadingSellings ? (
        <Loader />
      ) : mostSellingProducts[0] ? (
        <Box sx={{ pt: 3 }}>
          <CardsTest
            items={mostSellingProducts}
            title={language === "en" ? "Most selling" : "الأكثر مبيعاً"}
          />
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "Most selling products Are Not Found"
              : "لم يتم العثور على المنتجات الأكثر مبيعاً"
          }
        />
      )}
      <Iframe />
      <HomeContact />
    </Box>
  );
}

export default Home;
