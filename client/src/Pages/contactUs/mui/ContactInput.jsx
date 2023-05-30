import { Box, InputBase, Stack, Typography } from "@mui/material";
import React from "react";
import { ContactColors, InputBoxStyle } from "../assets/contactStyle";
import { publicFontFamily } from "../../../components/publicStyle/publicStyle";

const ContactTextInput = ({
  index,
  value,
  error,
  touched,
  name,
  placeholder,
  handleChange,
  handleBlur,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: {
          md: index % 2 === 0 ? "flex-start" : "flex-end",
          xs: "center",
        },
        position: "relative",
        pb: 1,
        mt: 3.5,
      }}
    >
      <Box
        sx={{
          ...InputBoxStyle,
          width:
            name === "phone"
              ? 1
              : {
                  md: 0.96,
                  xs: 0.98,
                },
        }}
      >
        <InputBase
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          sx={{
            bgcolor: "#fff",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            borderBottom:
              error && touched
                ? `1px solid red`
                : `2px solid ${ContactColors.main}`,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontFamily: publicFontFamily,
          }}
        >
          {error && touched ? error : undefined}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactTextInput;
