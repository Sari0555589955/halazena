import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Rating,
  CircularProgress,
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
function SingleProduct() {
  const { productId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [getSingleProduct] = useLazyGetSingleProductQuery();
  const { data: dataCart, isSuccess: cartIsSuccess } = useGetAllCartsQuery();
  const [addRating] = useAddRatingMutation();
  const [_, { language: lang }] = useTranslation();
  const [product, setProduct] = React.useState();
  const navigate = useNavigate();
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

  const checkActivity =
    (product?.attributes?.length > 0 && myAttributes[0]) ||
    !product?.attributes?.length > 0;

  const productInCart =
    cartIsSuccess &&
    dataCart?.cart?.find(
      (earchProduct) => earchProduct?.product?._id === product?._id
    );
  const addAttributes = (key, value) => {
    let attrIsExisted = myAttributes.find((item) => item.key === key);
    if (!attrIsExisted) {
      setMyAttributes([...myAttributes, { key, value }]);
    } else {
      setMyAttributes((atts) =>
        atts.map((att) =>
          att.key === key
            ? {
                ...att,
                value,
              }
            : att
        )
      );
    }
  };
  const [addToCart, { isLoading: addingItemLoading }] = useAddToCartMutation();
  const handleAddToCart = () => {
    addToCart({
      product: productId,
      properties: myAttributes,
    }).then((res) => {
      if (res?.error) toast.error(res?.error?.data[`error_${lang}`]);
      toast.success(res?.data[`success_${lang}`]);
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
            lg={4}
            sx={{
              py: {
                md: "150px",
                xs: "110px",
              },
              px: 1,
              bgcolor: colors.newLightColor,
            }}
          >
            {/* <Avatar
                sx={{ height: "66vh", width: "100%", borderRadius: 0 }}
                src={product ? imageBaseUrl + product.images[0] : ""}
              /> */}
            {/* <div className="carousel-wrapper" style={{ direction: "ltr" }}>
                <Carousel>
                  {product.images.map((image) => {
                    return (
                      <div
                        className="w-100"
                        style={{
                          height: "250px",
                          width: "500px",
                          border: 0,
                          outline: 0,
                        }}
                      >
                        <img
                          src={imageBaseUrl + image}
                          className="w-100"
                          style={{
                            objectFit: "contain",
                            height: "100%",
                            outline: 0,
                          }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div> */}

            {/* <Splide
                options={{
                  // fixedWidth: "100%",
                  // autoplay: true,
                  // interval: 2000,
                  // type: "loop",
                  // cover: true,
                  // direction: lang === "en" ? "ltr" : "rtl",
                  type: "loop",
                  drag: "free",
                  focus: "center",
                  perPage: 3,
                  autoScroll: {
                    speed: 1,
                  },
                }}
              >
                {product?.images.map((image) => (
                  <SplideSlide key={image}>
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        sx={{
                          width: "100%",
                          height: {
                            md: "100vh",
                            xs: "50vh",
                          },
                          borderRadius: 0,
                        }}
                        src={imageBaseUrl + image}
                        alt="Image 1"
                      />
                    </Box>
                  </SplideSlide>
                ))}
              </Splide> */}
            <Stack
              direction="row"
              justifyContent="flex-start"
              pt="20px"
              px="50px"
            >
              <Button
                sx={{
                  bgcolor: `${colors.newMainHeavyColor} !important`,
                  color: "#fff",
                  minWidth: 0,
                  borderRadius: "50%",
                }}
                onClick={() => navigate(-1)}
              >
                <KeyboardArrowLeftIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </Button>
            </Stack>
            <Box
              sx={{
                width: 0.9,
                height: "40vh",
                mx: "auto",
                my: "15px",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                }}
                src={imageBaseUrl + product?.images[imageStart]}
                alt=""
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
                    borderColor: imageStart === index ? "#000" : "divider",
                    cursor: "pointer",
                  }}
                  onClick={() => setImageStart(index)}
                >
                  <img
                    src={imageBaseUrl + image}
                    alt={lang === "en" ? "Product" : "منتج"}
                    style={{ height: "100%", width: "100%" }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            lg={8}
            sx={{
              py: {
                md: "150px",
                xs: "50px",
              },
              px: "75px",
            }}
          >
            <div className="mt-4">
              <h2
                className="my-3"
                style={{
                  color: colors.newMainColor,
                  fontFamily: publicFontFamily,
                  fontSize: "30px",
                }}
              >
                {product?.title}
              </h2>
              <h4
                style={{
                  fontFamily: publicFontFamily,
                }}
              >
                {lang === "en" ? "Description" : "الوصف"}
              </h4>
              <p
                style={{
                  fontFamily: publicFontFamily,
                }}
                className="my-3 lead"
              >
                {product?.smallDesc}
              </p>
              <div className="my-3 d-flex align-items-center ">
                {alert ? <div className="alert alert-danger">{alert}</div> : ""}

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
                    attribute.values.length > 0 && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                          mt: "10px",
                          gap: "6px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: publicFontFamily,
                          }}
                        >
                          {attribute.key}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          flexWrap="wrap"
                          sx={{
                            gap: "5px",
                          }}
                        >
                          {attribute?.values?.map((value) => {
                            const check = myAttributes.find(
                              (att) => att.value === value
                            );
                            return (
                              <Button
                                disableRipple
                                sx={{
                                  px: "10px",
                                  border: `1px solid ${
                                    check ? "#fff" : "#000"
                                  } !important`,
                                  color: check ? "#fff" : "#000",
                                  transform: "scale(1) !important",
                                  backgroundColor: productInCart
                                    ? "#ccc"
                                    : check
                                    ? `${colors.newMainColor} !important`
                                    : "#fff !important",
                                  fontFamily: publicFontFamily,
                                }}
                                disabled={productInCart}
                                onClick={() =>
                                  addAttributes(attribute.key, value)
                                }
                              >
                                {value}
                              </Button>
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
                  onChange={ratingChanged}
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
              <Button
                className="text-white py-3 px-2 btn border-0"
                sx={{
                  borderRadius: "10px",
                  backgroundColor:
                    checkActivity && !productInCart
                      ? `#b19593 !important`
                      : `#DFBEA7 !important`,
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
                    ? "اضافة الي سلة التسوق"
                    : "المنتج تمت اضافته"}
                </span>

                <i className="fa-solid fa-cart-shopping mx-2"></i>
              </Button>
            </div>
            {/* <Box
                dangerouslySetInnerHTML={{ __html: product?.description }}
                sx={{
                  mt: "10px",
                }}
              /> */}
            {/* End */}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default SingleProduct;
