import { Box, Typography } from "@mui/material";
import { publicFontFamily } from "../publicStyle/publicStyle";

export default function CustomError({ errorMessage }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "red",
          fontSize: { xs: "35px", md: "50px" },
          fontFamily: publicFontFamily,
        }}
      >
        {errorMessage}
      </Typography>
    </Box>
  );
}
