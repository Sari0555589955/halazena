export const publicFontFamily = "'Tajawal', sans-serif";
export const publicSizes = {
  header: {
    md: "60px",
    xs: "40px",
  },
  body: {
    md: "30px",
    xs: "25pxf",
  },
  xSmall: {
    lg: "15px",
    md: "14px",
    xs: "13px",
  },
  button: {
    xs: "13px",
    md: "16px",
    lg: "18px",
  },
};
export const colors = {
  newMainColor: "#C0924D",
  newMainHeavyColor: "#C0924D",
  newLightColor: "#EDCB94",
  lightYellow : "#EDCB94",
  lightGreen: "#99ECEA",
  grey: "#5E5E5E",
};

export const publicButton = {
  bgcolor: `${colors.newLightColor} !important`,
  color: "#fff",
  p: "10px 50px",
  transition: "0.3s all",
  fontFamily: publicFontFamily,
  fontWeight: "bold",
  borderRadius: "30px",
  "&:active": {
    transform: "scale(0.9)",
  },
};
