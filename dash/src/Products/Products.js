import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ProductServices from "../httpServices/product.sevices";
import { getAll, deleteProduct, mostSelling } from "../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { imageURL } from "..";
import styles from "./Products.module.css";
import { AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { IoIosEye } from "react-icons/io";
import CategoriesServices from "../httpServices/categories.services";
import { getSections, getSubSections } from "../store/sectionsSlice";
import { Link } from "react-router-dom";
import i18n from "../Translation/i18n";

const Products = () => {
  const [state, setState] = useState("");
  const [copy, setCopy] = useState([]);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { sections } = useSelector((state) => state.sections);
  const [subs, setSubs] = useState();

  useEffect(() => {
    if (sections?.length === 0) {
      CategoriesServices.allSections(`category/getAll`).then((res) => {
        dispatch(getSections(res.categories));
      });
    }
  }, [dispatch, sections?.length]);

  // useEffect(()=>{
  //   CategoriesServices.allSections(`category/getAllSub/${}`).then((res) => {
  //     setSubs(res.subCategories)
  //   });
  // },[])
  const getProductFilter = (option = undefined) => {
    ProductServices.getAll(`product/getAll/${option ? option : ""}`)
      .then((res) => {
        dispatch(getAll(res.products.products));
        CategoriesServices.allSections(`category/getAllSub/${option}`).then(
          (res) => {
            setSubs(res.subCategories);
          }
        );
      })
      .catch((e) => {
        dispatch(getAll([]));
        setErr(e.response.data);
        setCopy((_) => []);
        dispatch();
      });
  };
  // START of Subs filter
  const getSubsFilter = (option = undefined) => {
    ProductServices.getAll(`product/getAll?sub=${option ? option : ""}`)
      .then((res) => {
        dispatch(getAll(res.products.products));
      })
      .catch((e) => {
        dispatch(getAll([]));
        setErr(e.response.data);
        setCopy((_) => []);
        dispatch();
      });
  };
  // END of subs filter
  useEffect(() => {
    getProductFilter();
  }, []);
  const deleteHandler = (product) => {
    ProductServices.deleteProduct(`product/delete/${product._id}`).then((_) => {
      dispatch(deleteProduct(product._id));
    });
  };
  const handleInputChange = (e) => {
    setState(e.target.value);
    let filteredData = products.filter((product) =>
      product[`title_${i18n.language}`]?.includes(e.target.value)
    );
    setCopy(filteredData);
  };
  console.log("copy", copy);
  const mostSellingHandler = () => {
    ProductServices.getAll(`product/getMostSelling`)
      .then((res) => {
        let products = res.products.map(({ product }) => product);
        dispatch(mostSelling(products));
      })
      .catch((e) => {
        setErr(e.response.data);
        dispatch(mostSelling([]));
      });
  };

  const latestHandler = () => {
    ProductServices.getAll(`product/getNewiest`).then((res) => {
      dispatch(getAll(res.products));
    });
  };

  const lowestHandler = () => {
    ProductServices.getAll(`product/filterByPrice/lowest`).then((res) => {
      dispatch(getAll(res.products));
    });
  };
  const highestHandler = () => {
    ProductServices.getAll(`product/filterByPrice/highest`).then((res) => {
      dispatch(getAll(res.products));
    });
  };
  return (
    <Layout>
      <div className="m-3 bg-white p-3">
        <div className="row p-3 d-flex justify-content-lg-between justify-content-lg-between flex-md-row flex-column w-100">
          <div className={`m-1 ${styles.SearchContainer}`}>
            <span>
              <AiOutlineSearch className="d-none d-lg-inline" />
            </span>
            <input
              className={`${styles.Search}`}
              type="search"
              onChange={handleInputChange}
              placeholder={i18n.language === "en" ? "Search..." : "بحث ..."}
            />
          </div>
          <div className=" d-flex flex-lg-row w-auto flex-column">
            <div className="dropdown m-1">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "#FFFAED",
                  color: "#f8b407",
                  padding: "5px 20px",
                }}
              >
                {i18n.language === "en" ? `Categories` : "الفئات"}
              </button>
              <ul className="dropdown-menu">
                {sections?.map((section) => (
                  <li
                    key={section._id}
                    onClick={() => getProductFilter(section._id)}
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    {section[`name_${i18n.language}`]}
                  </li>
                ))}
                <li
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => getProductFilter()}
                >
                  {i18n.language === "en" ? `Get all` : " الحصول على الكل"}
                </li>
              </ul>
            </div>
            {/* start of subs */}
            {subs?.length > 0 && (
              <div className="dropdown m-1">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#FFFAED",
                    color: "#f8b407",
                    padding: "5px 20px",
                  }}
                >
                  {i18n.language === "en" ? `Sub sections` : "الأقسام الفرعيه"}
                </button>
                <ul className="dropdown-menu">
                  {subs?.map((sub) => (
                    <li
                      key={sub._id}
                      onClick={() => getSubsFilter(sub._id)}
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                    >
                      {sub[`name_${i18n.language}`]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* end of subs */}
            <div className="dropdown m-1">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "#FFFAED",
                  color: "#f8b407",
                  padding: "5px 20px",
                }}
              >
                <FiFilter /> {i18n.language === "en" ? `Filter` : "تصنيف حسب"}
              </button>
              <ul className="dropdown-menu">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={mostSellingHandler}
                  className="dropdown-item"
                >
                  {i18n.language === "en" ? `Top products` : `الأكثر مبيعًا`}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={latestHandler}
                  className="dropdown-item"
                >
                  {i18n.language === "en" ? `Latest` : `الأحدث`}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={lowestHandler}
                  className="dropdown-item"
                >
                  {i18n.language === "en" ? `Lowest price` : `الأقل سعرًا`}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={highestHandler}
                  className="dropdown-item"
                >
                  {i18n.language === "en" ? `Highest price` : `الأكثر سعرًا`}
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => getProductFilter()}
                  className="dropdown-item"
                >
                  {i18n.language === "en" ? `Get all` : `الحصول على الكل`}
                </li>
              </ul>
              <Link
                to="/products/addProduct"
                className="btn btn-warning text-white mx-3 "
              >
                {i18n.language === "en" ? `Add product` : `إضافة منتج`}
              </Link>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-lg-start justify-content-center p-2">
          {state !== "" ? (
            copy.length > 0 ? (
              copy.map((product) => (
                <div
                  className={`card-group col-xl-2 col-lg-3 col-md-4 col-8 m-3 ${styles.Card}`}
                  key={product._id}
                >
                  <div className={styles.Hover}>
                    <div className="d-flex bg-light flex-column" style={{}}>
                      <Link to={`/products/edit/${product._id}`}>
                        <TbEdit className="my-1 rounded-circle bg-white text-primary fs-6" />
                      </Link>
                      <AiFillDelete
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteHandler(product)}
                        className="my-1 rounded-circle bg-white text-danger fs-6"
                      />
                      <Link to={`/products/${product._id}`}>
                        <IoIosEye className="my-1 rounded-circle bg-white text-info w-100 fs-6" />
                      </Link>
                    </div>
                  </div>
                  <div className="card w-0">
                    <Link
                      to={`/products/${product._id}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={`${imageURL}/${product.images[0]}`}
                        className="card-img-top"
                        alt="Product"
                      />
                      <div className="card-body">
                        <p className="card-text">
                          {product[`title_${i18n.language}`]}{" "}
                        </p>
                        <p className="card-text">
                          <small className="text-warning">
                            {product.price}$
                          </small>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="fs-3 text-danger text-center">
                {i18n.language === "en" ? err.error_en : err.error_ar}
              </h3>
            )
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                className={`card-group col-xl-2 col-lg-3 col-md-4 col-8 m-3 ${styles.Card}`}
                key={product._id}
              >
                <div className={styles.Hover}>
                  <div className="d-flex bg-light flex-column" style={{}}>
                    <Link to={`/products/edit/${product._id}`}>
                      <TbEdit className="my-1 text-primary fs-6" />
                    </Link>
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteHandler(product)}
                      className="my-1 text-danger fs-6"
                    />
                    <Link to={`/products/${product._id}`}>
                      <IoIosEye className="my-1 text-info w-100 fs-6" />
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      src={`${imageURL}/${product.images[0]}`}
                      className="card-img-top"
                      alt="Product"
                      style={{
                        height: "200px",
                      }}
                    />
                    <div className="card-body">
                      <p className="card-text">
                        {product[`title_${i18n.language}`]}
                      </p>
                      <p className="card-text">
                        <small className="text-warning">{product.price}$</small>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h3 className="fs-3 text-danger text-center">
              {i18n.language === "en" ? err.error_en : err.error_ar}
            </h3>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
