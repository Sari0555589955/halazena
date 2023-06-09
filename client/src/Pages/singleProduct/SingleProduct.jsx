import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Rating,
  CircularProgress,
  InputBase,
  CardMedia,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import React from "react";
import { style } from "./singleProdcut";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddRatingMutation,
  useLazyGetSingleProductQuery,
} from "../../APIs/ProductApis";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { toast } from "react-toastify";
import { imageBaseUrl } from "../../components/service";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function SingleProduct() {
  const { productId } = useParams();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state);
  const [getSingleProduct] = useLazyGetSingleProductQuery();
  const { data: dataCart, isSuccess: cartIsSuccess } = useGetAllCartsQuery();
  const [addRating] = useAddRatingMutation();
  const [_, { language: lang }] = useTranslation();
  const [product, setProduct] = React.useState();
  const navigate = useNavigate();
  const [attrs, setAttrs] = useState([]);
  React.useEffect(() => {
    getSingleProduct(productId).then(({ data, error }) => {
      if (data.product) {
        setProduct(data.product);
      }
    });
  }, []);
  const dispatch = useDispatch();
  const handleUpdateproductRating = (ratingValue) => {
    addRating({ productId, rating: ratingValue }).then(({ data, error }) => {
      if (!error) {
        toast.success(data[`success_${lang}`]);
        dispatch(setRefetch());
      } else {
        toast.error(error?.data[`error_${lang}`]);
      }
    });
  };
  const style = {
    mx: "auto",
    width: 1,
    boxShadow: 24,
  };
  const [myAttributes, setMyAttributes] = React.useState([]);
  const checkAttributeValues = product?.attributes.some(
    (att) => att.values?.length > 0
  );
  const checkActivity =
    (checkAttributeValues && myAttributes[0]) ||
    (!checkAttributeValues && !myAttributes[0]);
  const productInCart =
    cartIsSuccess &&
    dataCart?.cart?.find(
      (earchProduct) => earchProduct?.product?._id === product?._id
    );
  const addAttributes = (attribute, value) => {
    let attrIsExisted = myAttributes.find(
      (item) => item?.key_en === attribute?.key_en
    );
    if (!attrIsExisted) {
      const newAttr = {
        key_en: attribute.key_en,
        key_ar: attribute.key_ar,
        value_en: value.en,
        value_ar: value.ar,
      };
      setMyAttributes([...myAttributes, { ...newAttr }]);
    } else {
      setMyAttributes((atts) => {
        return atts.map((att) =>
          att.key_en === attribute.key_en
            ? {
                ...att,
                value_en: value.en,
                value_ar: value.ar,
              }
            : att
        );
      });
    }
  };
  const [addToCart, { isLoading: addingItemLoading }] = useAddToCartMutation();
  const handleAddToCart = (method) => {
    addToCart({
      product: productId,
      properties: myAttributes,
      Quantity: count,
    }).then((res) => {
      if (res?.error) toast.error(res?.error?.data[`error_${lang}`]);
      toast.success(res?.data[`success_${lang}`]);
      if (method === "creatingOrder") {
        setTimeout(() => {
          navigate("/checkout");
        }, 500);
      }
    });
  };
  const [getMe] = useLazyGetMeQuery();
  const [user, setUser] = React.useState();
  const ratingChanged = (_, rating) => {
    if (user?.status) {
      addRating({ rating, productId }).then((res) => {
        toast.success(res?.data[`success_${lang}`]);
      });
    } else {
      toast.error(
        lang == "en" ? "You Should Login First " : "يجب عليك تسجيل الدخول أولا"
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  React.useEffect(() => {
    getMe().then((res) => {
      if (res?.data.success !== undefined) {
        setUser(res?.data.user);
      }
    });
  }, []);

  const [imageStart, setImageStart] = React.useState(0);
  const [count, setCount] = useState(1);

  return (
    <Box sx={style}>
      {!product ? (
        <Stack
          sx={{
            height: "66vh",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Stack>
      ) : (
        <Grid container>
          <Grid
            item
            xs={12}
            lg={7}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
              py: {
                md: "150px",
                xs: "50px",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              pt="20px"
              sx={{
                px: {
                  lg: "75px",
                  md: "55px",
                  xs: "35px",
                },
              }}
            >
              <Button
                sx={{
                  bgcolor: `${colors.newLightColor} !important`,
                  color: "#fff",
                  minWidth: 0,
                  borderRadius: "50%",
                }}
                onClick={() => navigate(-1)}
              >
                <KeyboardArrowLeftIcon
                  sx={{
                    fontSize: "25px",
                    transform: lang === "ar" ? "rotate(180deg)" : 0,
                  }}
                />
              </Button>
            </Stack>
            <Box
              sx={{
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  color: colors.newMainColor,
                  fontFamily: publicFontFamily,
                  fontSize: {
                    lg: "30px",
                    md: "25px",
                    xs: "16px",
                  },
                  mt: "20px",
                  display: "inline",
                  bgcolor: colors.lightGreen,
                  color: "#fff",
                  // padding: "6px 75px",
                  py: "6px",
                  px: {
                    lg: "75px",
                    md: "60px",
                    xs: "55px",
                  },
                  borderRadius:
                    lang === "en" ? "0 40px 40px 0" : "40px 0 0 40px",
                }}
              >
                {product[`title_${lang}`]}
              </Typography>
              <Box
                sx={{
                  px: {
                    lg: "75px",
                    md: "60px",
                    xs: "55px",
                  },
                }}
              >
                <h4
                  style={{
                    fontFamily: publicFontFamily,
                    fontSize: "20px",
                  }}
                >
                  {lang === "en" ? "Description" : "الوصف"}
                </h4>
                <p
                  style={{
                    fontFamily: publicFontFamily,
                    fontSize: "18px",
                  }}
                  className="my-3 lead"
                >
                  {product[`smallDesc_${lang}`]}
                </p>
                <div className="my-3 d-flex align-items-center ">
                  {alert ? (
                    <div className="alert alert-danger">{alert}</div>
                  ) : (
                    ""
                  )}

                  <div>
                    <div
                      className=" mx-2 "
                      style={{
                        color: " #9e9797",
                        fontWeight: "500 ",
                        fontSize: "18px",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {product?.reviews > 0 && <span>{product.reviews}</span>}
                      <span
                        style={{
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {lang === "en" ? "reviews" : "تقييم"}
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <Box>
                  {product?.attributes?.map(
                    (attribute) =>
                      attribute?.values?.length > 0 && (
                        <Stack
                          sx={{
                            mt: "10px",
                            gap: "6px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: publicFontFamily,
                              fontWeight: "bold",
                              fontSize: "22px",
                              color: colors.newLightColor,
                            }}
                          >
                            {attribute[`key_${lang}`]}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{
                              gap: {
                                md: "10px",
                                xs: "5px",
                              },
                            }}
                          >
                            {attribute?.values?.map((value) => {
                              return (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap="0px"
                                >
                                  <InputBase
                                    name={attribute?.key_en}
                                    value={value[lang]}
                                    disableRipple
                                    type="radio"
                                    id={value[lang]}
                                    sx={{
                                      px: "10px",
                                      accentColor: colors.newLightColor,
                                      // color: check ? "#fff" : "#000",
                                      transform: "scale(1) !important",
                                      fontFamily: publicFontFamily,
                                    }}
                                    disabled={productInCart || checkActivity}
                                    onChange={() =>
                                      addAttributes(attribute, value)
                                    }
                                  />
                                  <Typography
                                    component="label"
                                    htmlFor={value[lang]}
                                    sx={{
                                      fontFamily: publicFontFamily,
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      cursor: !productInCart && "pointer",
                                    }}
                                  >
                                    {value[lang]}
                                  </Typography>
                                </Stack>
                              );
                            })}
                          </Stack>
                        </Stack>
                      )
                  )}
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="20px"
                  my="15px"
                >
                  <ReactStars
                    count={5}
                    onChange={(value) => ratingChanged(_, value)}
                    size={24}
                    isHalf={true}
                    value={Math.floor(product?.avgRating)}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <div className="my-3">
                    <span
                      className="fw-bold mx-2 fs-4"
                      style={{
                        color: colors.newMainHeavyColor,
                        fontWeight: "bold",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {product?.price * product?.sale} ريال
                    </span>
                    {product?.price != product?.price * product?.sale && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {product?.price} ريال
                      </span>
                    )}
                  </div>
                </Stack>
                {!productInCart && (
                  <Stack
                    direction="row"
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap="10px"
                  >
                    <AddCircleIcon
                      sx={{
                        cursor: "pointer",
                        color: colors.newLightColor,
                        transform: "scale(1.2)",
                        transition: "all 0.2s",
                        "&:active": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={() => setCount(count + 1)}
                    />
                    <Typography
                      fontFamily={publicFontFamily}
                      variant="h6"
                      fontWeight={"bold"}
                      align={"center"}
                    >
                      {count}
                    </Typography>
                    <RemoveCircleIcon
                      sx={{
                        display: "block",
                        cursor: count !== 1 && "pointer",
                        pointerEvents: count === 1 && "none",
                        color: count === 1 ? "#bbb" : colors.newLightColor,
                        transform: "scale(1.2)",
                        transition: "all 0.2s",
                        "&:active": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={() => setCount(count - 1)}
                    />
                  </Stack>
                )}
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  gap="10px"
                  mt="30px"
                >
                  <Button
                    className="text-white py-3 px-2 btn border-0"
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: `${
                        !checkActivity ? "#D0B98B" : colors.newLightColor
                      } !important`,
                      fontFamily: publicFontFamily,
                    }}
                    disabled={!checkActivity || productInCart}
                    onClick={() =>
                      checkActivity && !productInCart
                        ? handleAddToCart()
                        : undefined
                    }
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {!productInCart
                        ? lang === "en"
                          ? "Add to cart"
                          : "اضافة الي سلة التسوق"
                        : lang === "en"
                        ? "Product is added"
                        : "المنتج تمت اضافته"}
                    </span>

                    <i className="fa-solid fa-cart-shopping mx-2"></i>
                  </Button>
                  {currentUser?.email && (
                    <Button
                      className="text-white py-3 px-2 btn border-0"
                      sx={{
                        borderRadius: "10px",
                        bgcolor: productInCart
                          ? `${colors.newLightColor} !important`
                          : "transparent",
                        color: productInCart ? "#fff" : "#000",
                        border: `2px solid ${colors.newLightColor}`,
                        fontFamily: publicFontFamily,
                      }}
                      onClick={() =>
                        checkActivity && !productInCart
                          ? handleAddToCart("creatingOrder")
                          : undefined
                      }
                    >
                      {lang === "en" ? "Order now" : "اطلب الآن"}
                    </Button>
                  )}
                </Stack>
              </Box>
              {/* <div className="my-3">
                        <h6>المقاسات</h6>
                        <div className="d-flex justify-content-between w-50">
                          {sizes?.map((size, index) => (
                            <div
                              key={index}
                              className="border d-flex align-items-center justify-content-center"
                              style={{ height: "30px", width: "30px" }}
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              position: "relative",
              py: {
                md: "150px",
                xs: "110px",
              },
              px: 1,
            }}
          >
            <Box
              sx={{
                display: {
                  md: "none",
                  xs: "flex",
                },
                pt: "20px",
                justifyContent: "flex-start",
                position: "absolute",
                top: "80px",
                px: {
                  lg: "75px",
                  md: "55px",
                  xs: "35px",
                },
              }}
            >
              <Button
                sx={{
                  bgcolor: `${colors.newLightColor} !important`,
                  color: "#fff",
                  minWidth: 0,
                  borderRadius: "50%",
                }}
                onClick={() => navigate(-1)}
              >
                <KeyboardArrowLeftIcon
                  sx={{
                    fontSize: "25px",
                    transform: lang === "ar" ? "rotate(180deg)" : 0,
                  }}
                />
              </Button>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: lang === "ar" ? 0 : undefined,
                right: lang === "en" ? 0 : undefined,
                height: {
                  md: 1,
                  xs: 0.5,
                },
                width: {
                  md: 0.45,
                  xs: 1,
                },
                bgcolor: colors.lightGreen,
                zIndex: "-1",
              }}
            />

            <Box
              sx={{
                width: 0.9,
                height: "40vh",
                mx: "auto",
                my: "15px",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={imageBaseUrl + "/" + product?.images[imageStart]}
                alt={product[`title_${lang}`]}
              />
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="14px"
              mt="6px"
              flexWrap="wrap"
            >
              {product?.images?.map((image, index) => (
                <Box
                  sx={{
                    height: "120px",
                    width: "150px",
                    padding: "2px",
                    border: 1,
                    borderColor:
                      imageStart === index ? colors.lightYellow : colors.grey,
                    cursor: "pointer",
                  }}
                  onClick={() => setImageStart(index)}
                >
                  <CardMedia
                    component="img"
                    src={imageBaseUrl + "/" + image}
                    alt={
                      lang === "en" ? `Product${index + 1}` : `منتج${index + 1}`
                    }
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            sx={{
              display: {
                md: "none",
                xs: "block",
              },
              py: {
                md: "150px",
                xs: "50px",
              },
            }}
          >
            <Box
              sx={{
                mt: 5,
              }}
            >
              <Typography
                sx={{
                  color: colors.newMainColor,
                  fontFamily: publicFontFamily,
                  fontSize: {
                    lg: "30px",
                    md: "25px",
                    xs: "16px",
                  },
                  mt: "20px",
                  display: "inline",
                  bgcolor: colors.lightGreen,
                  color: "#fff",
                  // padding: "6px 75px",
                  py: "6px",
                  px: {
                    lg: "75px",
                    md: "60px",
                    xs: "55px",
                  },
                  borderRadius:
                    lang === "en" ? "0 40px 40px 0" : "40px 0 0 40px",
                }}
              >
                {product[`title_${lang}`]}
              </Typography>
              <Box
                sx={{
                  px: {
                    lg: "75px",
                    md: "60px",
                    xs: "55px",
                  },
                }}
              >
                <h4
                  style={{
                    fontFamily: publicFontFamily,
                    fontSize: "20px",
                  }}
                >
                  {lang === "en" ? "Description" : "الوصف"}
                </h4>
                <p
                  style={{
                    fontFamily: publicFontFamily,
                    fontSize: "18px",
                  }}
                  className="my-3 lead"
                >
                  {product[`smallDesc_${lang}`]}
                </p>
                <div className="my-3 d-flex align-items-center ">
                  {alert ? (
                    <div className="alert alert-danger">{alert}</div>
                  ) : (
                    ""
                  )}

                  <div>
                    <div
                      className=" mx-2 "
                      style={{
                        color: " #9e9797",
                        fontWeight: "500 ",
                        fontSize: "18px",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {product?.reviews > 0 && <span>{product.reviews}</span>}
                      <span
                        style={{
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {lang === "en" ? "reviews" : "تقييم"}
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <Box>
                  {product?.attributes?.map(
                    (attribute) =>
                      attribute?.values?.length > 0 && (
                        <Stack
                          sx={{
                            mt: "10px",
                            gap: "6px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: publicFontFamily,
                              fontWeight: "bold",
                              fontSize: "22px",
                              color: colors.newLightColor,
                            }}
                          >
                            {attribute[`key_${lang}`]}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{
                              gap: {
                                md: "10px",
                                xs: "5px",
                              },
                            }}
                          >
                            {attribute?.values?.map((value) => {
                              return (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  gap="0px"
                                >
                                  <InputBase
                                    name={attribute?.key_en}
                                    value={value[lang]}
                                    disableRipple
                                    type="radio"
                                    id={value[lang]}
                                    sx={{
                                      px: "10px",
                                      accentColor: colors.newLightColor,
                                      // color: check ? "#fff" : "#000",
                                      transform: "scale(1) !important",
                                      fontFamily: publicFontFamily,
                                    }}
                                    disabled={productInCart || checkActivity}
                                    onChange={() =>
                                      addAttributes(attribute, value)
                                    }
                                  />
                                  <Typography
                                    component="label"
                                    htmlFor={value[lang]}
                                    sx={{
                                      fontFamily: publicFontFamily,
                                      fontWeight: "bold",
                                      fontSize: "20px",
                                      cursor: !productInCart && "pointer",
                                    }}
                                  >
                                    {value[lang]}
                                  </Typography>
                                </Stack>
                              );
                            })}
                          </Stack>
                        </Stack>
                      )
                  )}
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="20px"
                  my="15px"
                >
                  <ReactStars
                    count={5}
                    onChange={(value) => ratingChanged(_, value)}
                    size={24}
                    isHalf={true}
                    value={Math.floor(product?.avgRating)}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  <div className="my-3">
                    <span
                      className="fw-bold mx-2 fs-4"
                      style={{
                        color: colors.newMainHeavyColor,
                        fontWeight: "bold",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {product?.price * product?.sale} ريال
                    </span>
                    {product?.price != product?.price * product?.sale && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {product?.price} ريال
                      </span>
                    )}
                  </div>
                </Stack>
                {!productInCart && (
                  <Stack
                    direction="row"
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap="10px"
                  >
                    <AddCircleIcon
                      sx={{
                        cursor: "pointer",
                        color: colors.newLightColor,
                        transform: "scale(1.2)",
                        transition: "all 0.2s",
                        "&:active": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={() => setCount(count + 1)}
                    />
                    <Typography
                      fontFamily={publicFontFamily}
                      variant="h6"
                      fontWeight={"bold"}
                      align={"center"}
                    >
                      {count}
                    </Typography>
                    <RemoveCircleIcon
                      sx={{
                        display: "block",
                        cursor: count !== 1 && "pointer",
                        pointerEvents: count === 1 && "none",
                        color: count === 1 ? "#bbb" : colors.newLightColor,
                        transform: "scale(1.2)",
                        transition: "all 0.2s",
                        "&:active": {
                          transform: "scale(1)",
                        },
                      }}
                      onClick={() => setCount(count - 1)}
                    />
                  </Stack>
                )}
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  gap="10px"
                  mt="30px"
                >
                  <Button
                    className="text-white py-3 px-2 btn border-0"
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: `${
                        !checkActivity ? "#D0B98B" : colors.newLightColor
                      } !important`,
                      fontFamily: publicFontFamily,
                    }}
                    disabled={!checkActivity || productInCart}
                    onClick={() =>
                      checkActivity && !productInCart
                        ? handleAddToCart()
                        : undefined
                    }
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {!productInCart
                        ? lang === "en"
                          ? "Add to cart"
                          : "اضافة الي سلة التسوق"
                        : lang === "en"
                        ? "Product is added"
                        : "المنتج تمت اضافته"}
                    </span>

                    <i className="fa-solid fa-cart-shopping mx-2"></i>
                  </Button>
                  {currentUser?.email && (
                    <Button
                      className="text-white py-3 px-2 btn border-0"
                      sx={{
                        borderRadius: "10px",
                        bgcolor: productInCart
                          ? `${colors.newLightColor} !important`
                          : "transparent",
                        color: productInCart ? "#fff" : "#000",
                        border: `2px solid ${colors.newLightColor}`,
                        fontFamily: publicFontFamily,
                      }}
                      onClick={() =>
                        checkActivity && !productInCart
                          ? handleAddToCart("creatingOrder")
                          : undefined
                      }
                    >
                      {lang === "en" ? "Order now" : "اطلب الآن"}
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default SingleProduct;
