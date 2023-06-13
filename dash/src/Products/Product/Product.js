import React, { useEffect, useState, useRef } from "react";
import Layout from "../../Layout/Layout";
import "./styles.css";
import ProductServices from "../../httpServices/product.sevices";
import { useParams } from "react-router";
import { imageURL } from "../..";
import ReactStars from "react-stars";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import i18n from "../../Translation/i18n";

const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    ProductServices.getAll(`product/getById/${param.id}`).then((res) => {
      setProduct(res.product);
    });
  }, [param.id]);

  const mainRef = useRef(<Splide></Splide>);
  const thumbsRef = useRef(<Splide></Splide>);
  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);
  const parser = new DOMParser();
  const description = parser.parseFromString(product?.description, "text/html");
  const per = document.getElementById("dive");
  const chaild = description?.lastChild.lastChild;
  chaild.classList.add("h-25");
  per?.insertBefore(chaild, per.childNodes[2]);
  return (
    <Layout>
      <div className="bg-white m-3 p-3 rounded">
        <h4>{i18n.language === "en" ? `Product details` : `تفاصيل المنتج`}</h4>
        <hr />
        <div className="row" style={{ height: "80vh" }}>
          <div className=" col-lg-6 col-12 ">
            <Splide
              aria-label="Product"
              ref={mainRef}
              options={{
                type: "slide",
                arrows: false,
                pagination: false,
                direction: i18n.language === "en" ? "ltr" : "rtl",
                rewind: true,
              }}
            >
              {product?.images &&
                product?.images.map((img) => (
                  <SplideSlide className="d-flex justify-content-center">
                    <img src={`${imageURL}/${img}`} width="50%" alt="product" />
                  </SplideSlide>
                ))}
            </Splide>
            <Splide
              options={{
                type: "slide",
                rewind: true,
                gap: "1rem",
                pagination: false,
                cover: true,
                focus: "center",
                isNavigation: true,
                fixedHeight: 70,
                direction: i18n.language === "en" ? "ltr" : "rtl",
                fixedWidth: 50,
              }}
              ref={thumbsRef}
            >
              {product?.images &&
                product?.images.map((img) => (
                  <SplideSlide className="d-flex justify-content-center">
                    <img src={`${imageURL}/${img}`} width="50%" alt="product" />
                  </SplideSlide>
                ))}
            </Splide>
          </div>
          <div className="col-6 py-5" id="dive">
            <div className="d-flex justify-content-end px-3">
              <h4
                style={{
                  wordBreak: "break-word",
                  backgroundColor: "#C0924D",
                  color: "#fff",
                  padding: "10px 10px",
                }}
              >
                {i18n.language === "en"
                  ? product?.category.name_en
                  : product?.category.name_ar}
              </h4>
            </div>

            <h4 style={{ wordBreak: "break-word" }}>
              {i18n.language === "en" ? product?.title_en : product?.title_ar}{" "}
            </h4>

            <p style={{ wordBreak: "break-word" }}>
              {i18n.language === "en"
                ? product?.smallDesc_en
                : product?.smallDesc_ar}
            </p>
            {product?.attributes &&
              product?.attributes.map(
                (attr) =>
                  attr.values.length > 0 && (
                    <div className="d-flex gap-2 my-3">
                      <h5>
                        {i18n.language === "en" ? attr.key_en : attr.key_ar}
                      </h5>
                      {attr.values.map((val) => (
                        <div className="border rounded p-2">
                          {i18n.language === "en" ? val.en : val.ar}
                        </div>
                      ))}
                    </div>
                  )
              )}
            <div className="d-flex">
              {product?.avgRating === 0 ? (
                <ReactStars
                  count={5}
                  size={24}
                  edit={false}
                  color2={"#ffd700"}
                />
              ) : (
                <ReactStars
                  value={product?.avgRating}
                  count={5}
                  edit={false}
                  size={24}
                  color2={"#ffd700"}
                />
              )}
            </div>
            <hr />
            <p className="text-warning">
              {product?.price} {i18n.language === "en" ? `Pound` : "جنيه"}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
