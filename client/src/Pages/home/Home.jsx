import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import CardsTest from "../../components/cards/CardsTest";
import useFetchProducts from "./homeComponents/cards/useFetchProducts";
import useFetchMostSellingProducts from "./homeComponents/cards/useFetchMostSellingProducts";
import useFetchMostNewiestProducts from "./homeComponents/cards/useFetchMostNewiestProducts";
import { cardsContainerStyle, sectionStyle } from "./homeStyle";
import { motion } from "framer-motion";
import { AboutUsShared } from "../aboutUs/AboutUsPage";
import { useDispatch } from "react-redux";
import { colors } from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import HeroSlider from "./heroSlider/HeroSlider";
import DepartmentsSlider from "../../components/departmentsSlider/DepartmentsSlider";
import { useGetAboutUsDataQuery } from "../../APIs/aboutUsApi";
function Home() {
  const dispatch = useDispatch();
  const [_, { language }] = useTranslation();
  const {
    items1Loading,
    mostSellingProducts,
    mostSellingError,
    refetchMostSelling,
  } = useFetchMostSellingProducts();
  const { mostNewiestError, mostNewiestProducts, mostNewiestRefetch } =
    useFetchMostNewiestProducts();
  const { data: aboutSectionData, isLoading: aboutIsLoading } =
    useGetAboutUsDataQuery();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box>
        <HeroSlider />
        <DepartmentsSlider />
      </Box>
      {mostSellingProducts[0] && mostNewiestProducts[0] ? (
        <Box sx={sectionStyle}>
          <Box sx={{ ...cardsContainerStyle, pt: 3 }}>
            <CardsTest
              items={mostNewiestProducts}
              title={language === "en" ? "most newiest" : "الأحدث"}
            />
          </Box>
          <Box pt="100px" pb="50px">
            {aboutSectionData?.sections && (
              <Typography variant="h4" align="center" mb="100px">
                {aboutSectionData.sections[0].type}
              </Typography>
            )}
            <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} />
          </Box>
          <Box sx={{ ...cardsContainerStyle, mt: 7 }}>
            <CardsTest
              items={mostSellingProducts}
              title={language === "en" ? "most selling" : "الأكثر مبيعاً"}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "30vh",
            }}
          >
            <CircularProgress
              sx={{
                color: colors.newMainColor,
              }}
            />
          </Stack>
          <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} />
        </>
      )}
    </Box>
  );
}

export default Home;
