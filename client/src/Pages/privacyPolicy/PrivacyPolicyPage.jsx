import React, { useEffect, useState } from "react";
import { useGetAllPrivcayQuery } from "../../APIs/privacyApi";
import { Box, CardMedia, CircularProgress, Grid, Stack } from "@mui/material";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import bckwall from "../../assets/Group.png";
import { imageBaseUrl } from "../../components/service";

const PrivacyPolicyPage = () => {
  const { data, isLoading } = useGetAllPrivcayQuery();
  const [_, { language: lang }] = useTranslation();
  const [privacy, setPrivacy] = useState();
  useEffect(() => {
    if (data) {
      setPrivacy(data?.sections[0]);
    }
  }, [data]);

  return (
    <Box
      sx={{
        py: "130px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "70vh",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Stack>
      ) : (
        privacy && (
          <Box
            sx={{
              px: {
                lg: "70px",
                md: "30px",
                xs: "20px",
              },
            }}
          >
            <Grid container>
              <Grid item xs={12} lg={6}>
                <h2
                  style={{
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                  }}
                >
                  {lang === "en" ? "privacy" : "الخصوصيه"}
                </h2>
                <p
                  className="lead fw-bold"
                  style={{ fontSize: "1.8rem", fontFamily: publicFontFamily }}
                >
                  {privacy[`title_${lang}`]}
                </p>
                <div
                  style={{ fontWeight: "bold", fontFamily: publicFontFamily }}
                  dangerouslySetInnerHTML={{
                    __html: privacy[`description_${lang}`],
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  src={`${imageBaseUrl}/${privacy.image}`}
                  sx={{
                    height: 400,
                    width: 500,
                    objectFit: "contain",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )
      )}
    </Box>
  );
};

export default PrivacyPolicyPage;
