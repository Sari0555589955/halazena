import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Rating,
  Skeleton,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { imageBaseUrl } from "../../components/service";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import useAddSavedProduct from "../../Pages/savedProduct/useAddSavedProduct";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CardsStackStyle, cardStyle, colors } from "./cardStyle";
import ProductDetailsModal from "./ProductDetailsModal";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import useFetchSavedProducts from "../../Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import { useTranslation } from "react-i18next";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import ReactStars from "react-rating-stars-component";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { publicFontFamily, publicSizes } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import DepartmentProduct from "../../Pages/departments/DepartmentProduct";
// export const CustomCard = ({ item }) => {
//   const [addSavedProduct] = useAddToSavedProduct();
//   const [mutateAddToCart] = useAddToCart();
//   const [updateProduct] = useUpdateProductMutation();
//   const navigate = useNavigate();
//   const onSavedClicked = (item) => {
//     addSavedProduct({ product: item?._id });
//   };
//   const [_, { language }] = useTranslation();
//   const handleAddToCart = (item) => {
//     mutateAddToCart({
//       product: item._id,
//     });
//   };

//   const handleUpdateProduct = (item) => {
//     updateProduct({ productId: item?._id, product: item }).then(
//       ({ data, error }) => {
//         if (!error) {
//         } else {
//           toast.error("some Error While updating ");
//         }
//       }
//     );
//   };
//   async function getAllProductsBySub(sub, pageNum) {}
//   const {
//     data: savedProducts,
//     isError: isErrSaved,
//     error,
//   } = useGetAllSavedProductsQuery();
//   const checkSavedExisted = (product) => {
//     savedProducts?.products?.find(
//       (savPro) => savPro.product._id === product._id
//     )
//       ? true
//       : false;
//   };
//   return (
//     <Card
//       sx={cardStyle.card}
//       component={motion.div}
//       initial={{ y: 300 }}
//       whileInView={{
//         y: 50,
//         transition: {
//           type: "spring",
//           bounce: 0.5,
//           duration: 0.6,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           "&:hover .animated_box": {
//             top: cardStyle.card.animatedBox.animatedTop,
//           },
//         }}
//       >
//         <CardMedia
//           sx={cardStyle.card.cardMedia}
//           component="img"
//           image={imageBaseUrl + item?.images[0]}
//           alt={item.title}
//         />
//         {/* <Box
//           className="animated_box"
//           sx={{
//             ...cardStyle.card.animatedBox,
//             ...cardStyle.card.animatedBoxIconsContainer,
//           }}
//         >
//           <Button>
//             <ShoppingCartIcon
//               onClick={() => {
//                 handleAddToCart(item);
//               }}
//             />
//           </Button>
//           <ProductDetailsModal productId={item._id} />
//           <Button>
//             <FavoriteIcon
//               onClick={() => onSavedClicked(item)}
//               sx={{ zIndex: "10" }}
//             />
//           </Button>
//         </Box> */}
//       </Box>
//       <CardContent
//         sx={{
//           p: cardStyle.card.cardContent.padding,
//           bgcolor: cardStyle.card.cardContent.bg,
//           height: "37.5vh",
//         }}
//       >
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           align={"center"}
//           sx={{
//             fontWeight: "bolder",
//             color: cardStyle.card.cardContent.color1,
//             fontFamily: publicFontFamily,
//           }}
//         >
//           {item?.title}
//         </Typography>
//         <Typography
//           gutterBottom
//           component="p"
//           sx={{
//             align: "center",
//             fontWeight: "bolder",
//             height: "auto",
//             height: "110px",
//             fontFamily: publicFontFamily,
//           }}
//           dangerouslySetInnerHTML={{
//             __html: item?.description.slice(0, 50) + "...",
//           }}
//         />
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           gap={2}
//         >
//           <Typography
//             sx={{
//               color: "#B83806",
//               fontWeight: "bolder",
//               fontSize: publicSizes.xSmall,
//               fontFamily: publicFontFamily,
//             }}
//           >
//             {item?.price} {language === "en" ? "SAR" : "ريال سعودي"}
//           </Typography>
//           {/* <Rating value={item.avgRating} readOnly /> */}
//           {/* <ReactStars
//             count={5}
//             size={24}
//             isHalf={true}
//             value={Math.floor(item.avgRating)}
//             emptyIcon={<i className="far fa-star"></i>}
//             halfIcon={<i className="fa fa-star-half-alt"></i>}
//             fullIcon={<i className="fa fa-star"></i>}
//             activeColor="#ffd700"
//           /> */}
//           <Button
//             sx={{
//               minWidth: 0,
//               pointerEvents:
//                 savedProducts &&
//                 !isErrSaved &&
//                 savedProducts?.products.find(
//                   (saved) => saved.product._id === item._id
//                 )
//                   ? "none"
//                   : "auto",
//               cursor:
//                 savedProducts &&
//                 !isErrSaved &&
//                 savedProducts?.products.find(
//                   (saved) => saved.product._id === item._id
//                 )
//                   ? "default"
//                   : "pointer",
//             }}
//             onClick={() =>
//               savedProducts &&
//               !isErrSaved &&
//               savedProducts?.products.find(
//                 (saved) => saved.product._id === item._id
//               )
//                 ? undefined
//                 : onSavedClicked(item)
//             }
//           >
//             {savedProducts &&
//             !isErrSaved &&
//             savedProducts?.products.find(
//               (saved) => saved.product._id === item._id
//             ) ? (
//               <FavoriteIcon
//                 sx={{
//                   color: colors.newMainColor,
//                 }}
//               />
//             ) : (
//               <FavoriteBorderIcon
//                 sx={{
//                   color: "#bbb",
//                 }}
//               />
//             )}
//           </Button>
//         </Stack>
//         <Button
//           sx={{
//             bgcolor: `${colors.newMainColor} !important`,
//             color: "#fff",
//             width: 1,
//             py: "2px",
//             fontSize: "18px",
//             mt: "5px",
//             borderRadius: "40px",
//             py: "3px",
//             fontWeight: "bold",
//             fontFamily: publicFontFamily,
//           }}
//           onClick={() => navigate(`/productDetails/${item._id}`)}
//         >
//           {language === "en" ? "Select item" : "أختار عنصر"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };
export default function Cards({ items, title, singleDepartmentName }) {
  // const cardVariants = {
  //   offscreen: {
  //     y: 300,
  //   },
  //   onscreen: {
  //     y: 50,
  //     rotate: -10,
  //     transition: {
  //       type: "spring",
  //       bounce: 0.4,
  //       duration: 0.8,
  //     },
  //   },
  // };

  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        direction: "ltr !important",
      }}
      key={title ? title : undefined}
    >
      <Box
        sx={{
          ...CardsStackStyle.cardsHeader,
          dusplay: "flex",
          alignItems: "center",
          justifyContent: pathname === "/" ? "flex-start" : "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bolder",
            textTransform: "capitalize",
            bgcolor: pathname === "/" ? colors.newMainColor : undefined,
            color: pathname === "/" ? "#fff" : "#000",
            fontFamily: publicFontFamily,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: {
              lg: "30px",
              xs: "22px",
            },
            py: {
              lg: "20px",
              xs: "16px",
            },
            px: {
              lg: "100px",
              xs: "70px",
            },
            color: colors.grey,
            borderRadius:
              pathname === "/"
                ? language === "en"
                  ? "0 50px 50px 0"
                  : "50px 0 0 50px"
                : 0,
          }}
        >
          {title ? title : singleDepartmentName}
        </Typography>
      </Box>
      {/* <Stack
        flexWrap="wrap"
        sx={{
          ...CardsStackStyle,
          flexDirection: "row",
          justifyContent: "center",
          width: 0.9,
          mx: "auto",
        }}
      >
        {items &&
          items[0] &&
          items.map((item, index) => {
            return (
              <ProductCard
                key={index}
                item={item}
                externalWidth={{ lg: 400, md: 0.5, xs: 0.9 }}
              />
            );
          })}
      </Stack> */}
      <Box
        component={Splide}
        className="products_slider department_products_slider"
        hasTrack={false}
        width="100%"
        sx={{
          width: {
            xl: 1,
            md: "150vw",
            xs: "150vw",
          },
          ml: {
            xl: 0,
            lg: "-25%",
            md: "-17%",
            xs: "-35%",
          },
        }}
        options={{
          perPage: 4,
          perMove: 1,
          arrows: false,
          autoplay: true,
          breakpoints: {
            1900: {
              perPage: 4,
              type: "slide",
            },
            1500: {
              perPage: 5,
              type: "slide",
            },
            1200: {
              perPage: 5,
              type: "slide",
            },
            992: {
              perPage: 5,
              type: "slide",
            },
            900: {
              perPage: 3,
              type: "loop",
            },
            768: {
              perPage: 3,
              type: "loop",
            },
            600: {
              perPage: 3,
              type: "loop",
            },
          },
        }}
      >
        <SplideTrack>
          {items &&
            items[0] &&
            items.map((item, index) => (
              <Box
                component={SplideSlide}
                key={index}
                sx={{
                  mx: {
                    xl: 0,
                    lg: 0,
                    md: "15px",
                    xs: "10px",
                  },
                }}
              >
                <DepartmentProduct item={item} />
              </Box>
            ))}
        </SplideTrack>
      </Box>
    </Box>
  );
}
