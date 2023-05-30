export const colors = {
  lightMainColor: "#BC6146",
  heavyMainColor: "#B83806",
  newMainColor: "#C29997",
  newMainHeavyColor: "#a97674",
};

export const CardsStackStyle = {
  gap: {
    lg: 4,
    xs: 1,
  },
  cardsHeader: {
    color: "#000",
    py: 3,
  },
};
export const cardStyle = {
  wrapper: {
    width: {
      lg: "400px",
      md: 0.4,
      xs: 0.92,
    },
    pb: 12,
    px: 5,
  },
  card: {
    border: "1px solid red",
    bgcolor: "#f3f3f3",
    borderRadius: "20px",
    width: {
      md: 1,
      xs: 0.9,
    },
    mx: "auto",
    mt: 2,
    boxShadow: 0,
    cardMedia: {
      height: "25vh",
      borderBottom: `2px solid ${colors.newMainColor}`,
    },
    cardContent: {
      color1: "#000",
      color2: "#B83806",
      padding: 3,
    },
    animatedBox: {
      position: "absolute",
      height: 1,
      width: 1,
      left: 0,
      top: "-100%",
      backgroundImage: "-webkit-linear-gradient(0deg,#a13602c4,#feb93494)",
      animatedTop: 0,
      transition: "ease-out all 0.3s",
    },
    animatedBoxIconsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      button: {
        border: "1px solid #fff",
        position: "relative",
        p: 1,
        borderRadius: "50%",
        minWidth: 0,
        svg: {
          color: "#a13602c4",
        },
        "&:hover": {
          backgroundColor: "#fff",
          svg: {
            color: colors.heavyMainColor,
          },
        },
      },
    },
  },
};
