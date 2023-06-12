import { Box, InputBase, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
const StaticInputText = ({
  value,
  error,
  touched,
  label,
  handleChange,
  handleBlur,
  name,
  type,
  index,
}) => {
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        pb: 1.5,
      }}
    >
      <Typography>{label}</Typography>

      <InputBase
        label={label}
        type={type}
        name={name}
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
          borderRadius: {
            lg: "15px",
            xs: "10px",
          },
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
        <Typography
          sx={{
            color: "red",
            fontSize: "12px",
            fontWeight: "bolder",
          }}
        >
          {error && touched ? error : undefined}
        </Typography>
      </Box>
    </Box>
  );
};

export default StaticInputText;
