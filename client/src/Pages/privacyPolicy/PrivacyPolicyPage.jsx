import React, { useEffect, useState } from "react";
import { useGetAllPrivcayQuery } from "../../APIs/privacyApi";
import { Box, CardMedia, CircularProgress, Stack } from "@mui/material";
import { colors } from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import bckwall from "../../assets/Group.png";

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
        <Box
          sx={{
            px: {
              lg: "70px",
              md: "30px",
              xs: "20px",
            },
          }}
        >
          <h2>{lang === "en" ? "privacy" : "الخصوصيه"}</h2>
          <p className="lead fw-bold" style={{ fontSize: "1.8rem" }}>
            {privacy?.title}
          </p>
          <div
            style={{ fontWeight: "bold" }}
            dangerouslySetInnerHTML={{ __html: privacy?.description }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PrivacyPolicyPage;
