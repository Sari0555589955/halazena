import { Box, Input, InputBase, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
const DynamicInputText = ({
  index,
  input,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
}) => {
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        pb: 1.5,
      }}
    >
      <Typography>{input[`label_${language}`]}</Typography>
      <InputBase
        type={input.type}
        name={input.name}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          mx: "auto",
          width: {
            md: 0.97,
            xs: 1,
          },
          py: 1,
          px: 2,

          // #1976d2
          border: 1,
          borderColor: touched && error ? "red" : "#000",
          borderRadius: "15px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10px",
          left:
            language === "en"
              ? {
                  md: index % 2 === 0 ? 0 : "5%",
                  xs: 0,
                }
              : undefined,
          right:
            language === "ar"
              ? {
                  md: index % 2 === 0 ? 0 : "5%",
                  xs: 0,
                }
              : undefined,
        }}
      >
        {error && touched ? (
          <Typography
            sx={{
              color: "red",
              fontSize: "13px",
              fontWeight: "bolder",
            }}
          >
            {error}
          </Typography>
        ) : undefined}
      </Box>
    </Box>
  );
};

export default DynamicInputText;
