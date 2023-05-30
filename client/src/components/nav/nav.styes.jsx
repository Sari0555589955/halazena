export const colors = {
  lightMainColor: "#BC6146",
  heavyMainColor: "#B83806",
  newMainColor: "#C29997",
  newMainHeavyColor: "#a97674",
};

export const logoStyles = {
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
};

export const customDrawerIcon = {
  width: "auto",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mx: {
    md: 1,
    xs: 0.5,
  },
  px: 0.5,
  svg: {
    color: {
      md: colors.newMainColor,
      xs: "#fff",
    },
    fontSize: {
      xs: "22px",
      md: "25px",
    },
  },
  ".MuiBadge-badge": {
    cursor: "pointer",
    position : "absolute",
    backgroundColor: {
      md: colors.newMainHeavyColor,
      xs: "#f3f3f3",
    },
    color: {
      md: "#fff",
      xs: "#000",
    },
  },
};

export const navLinksStyles = {
  display: "flex",
};

export const MobileItemListContainerStyle = {
  py: 5,
};

export const MobileitemListStyle = {
  display: "block",
  color: "#000",
  backgroundColor: "#f8f8f8 !important",
  marginTop: "20px",
  fontWeight: "bolder",
  border: 1,
  width: 0.5,
  py: 1.5,
  textTransform: "capitalize",
  fontSize: "15px",
};
