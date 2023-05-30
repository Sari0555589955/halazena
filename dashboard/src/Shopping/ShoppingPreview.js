import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import HomeServices from "../httpServices/home.services";
import { useParams } from "react-router";
import { HiOutlineUser } from "react-icons/hi";
import i18n from "../Translation/i18n";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import styles from "./ShoppingPreview.module.css";

const ShoppingPreview = () => {
  const param = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    HomeServices.orderById(`order/getById/${param.id}`).then((res) => {
      setOrder(res.order);
    });
  }, [param]);
  return (
    <div>
      <Layout>
        <div className="p-3 m-3 bg-white rounded ">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-8 ">
              <div className="d-flex">
                <span className=" bg-warning rounded p-3 m-3 d-flex align-items-center  w-auto h-100">
                  <HiOutlineUser className="text-white fs-4" />
                </span>
                <span>
                  <h3 className="fs-4">
                    {i18n.language === "en" ? `Customer` : `العميل`}
                  </h3>
                  <p>
                    {i18n.language === "en" ? `Name: ` : `الإسم: `}
                    {order?.firstName + " " + order?.lastName}
                  </p>
                  <p>
                    {i18n.language === "en" ? `Email: ` : `البريد الإلكتروني: `}
                    {order?.email}
                  </p>
                  <p>
                    {i18n.language === "en" ? `Phone: ` : `رقم الجوال: `}
                    {order?.phoneNumber}
                  </p>
                </span>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-8">
              <div>
                <div className="d-flex">
                  <span className=" bg-warning rounded p-3 m-3 d-flex align-items-center  w-auto h-100">
                    <AiOutlineShoppingCart className="text-white fs-4" />
                  </span>
                  <span>
                    <h3 className="fs-4">
                      {i18n.language === "en" ? `Order info` : `تفاصيل الطلب`}
                    </h3>
                    <p>
                      {i18n.language === "en" ? `Payment: ` : `طريقة الدفع: `}
                      {order?.payInCash
                        ? i18n.language === "en"
                          ? "Cash on delivery"
                          : "الدفع عند الإستلام"
                        : i18n.language === "en"
                        ? "Pay online"
                        : "دفع اونلاين"}
                    </p>
                    <p>
                      {i18n.language === "en" ? `Status: ` : `الحالة: `}
                      {order?.orderStatus === "pending"
                        ? i18n.language === "en"
                          ? "Pending"
                          : "معلق"
                        : i18n.language === "en"
                        ? "Done"
                        : "تم"}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-8">
              <div>
                <div className="d-flex">
                  <span className=" bg-warning rounded p-3 m-3 d-flex align-items-center  w-auto h-100">
                    <BiPaperPlane className="text-white fs-4" />
                  </span>
                  <span>
                    <h3 className="fs-4">
                      {i18n.language === "en" ? `Shipping` : `التوصيل`}
                    </h3>
                    <p>
                      {i18n.language === "en" ? `Address: ` : `العنوان: `}
                      {order?.address}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 col-8">
              {!order?.payInCash && (
                <div>
                  <div className="d-flex">
                    <span className=" bg-warning rounded p-3 m-3 d-flex align-items-center  w-auto h-100">
                      <BiPaperPlane className="text-white fs-4" />
                    </span>
                    <span>
                      <h3 className="fs-4">
                        {i18n.language === "en"
                          ? `Payment info`
                          : `معلومات الدفع`}
                      </h3>
                      <p>
                        {i18n.language === "en" ? `Credit card: ` : `البطاقة: `}
                        *******
                        {order?.creditCard.toString().slice(7)}
                      </p>
                      <p>
                        {i18n.language === "en" ? `Business name: ` : `الإسم: `}
                        {order?.formalName}
                      </p>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <h5>{i18n.language === "en" ? `Products` : `المنتجات`}</h5>
          <div className={`${styles.TableContainer} row`}>
            <table className={`${styles.Table} table`}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {i18n.language === "en" ? "Name" : "الإسم"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Quantity` : `الكمية`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Price" : "السعر"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Total" : "الإجمالي"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product, index) => (
                  <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product?.product?.title}</td>
                    <td>{product?.Quantity}</td>
                    <td>{product?.product?.price}</td>
                    <td>{product?.product?.price * product?.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ShoppingPreview;
