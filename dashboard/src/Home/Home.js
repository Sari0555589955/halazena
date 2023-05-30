import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import styles from "./Home.module.css";
import i18n from "../Translation/i18n";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import dailyOrders from "../assists/dailyOrders.png";
import dailyGuests from "../assists/dailyGuests.png";
import dailySignup from "../assists/dailySignup.png";
import dailyIncome from "../assists/dailyIncome.png";
import HomeServices from "../httpServices/home.services";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  allOrders,
  deleteOrder,
  mostSelling,
  toggle,
} from "../store/ordersSlice";
import moment from "moment/moment";
import { imageURL } from "..";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);
  const { mostSellingItems } = useSelector((state) => state.orders);

  const [userNumbers, setUserNumbers] = useState();
  const [guestNumbers, setGuestNumbers] = useState();
  const [numOfOrderInADay, setNumOfOrderInADay] = useState();
  const [totalInDay, setTotalInDay] = useState();
  const [doneCount, setDoneCount] = useState();
  const [pendingCount, setPendingCount] = useState();
  const [monthlyDate, setMonthlyDate] = useState();
  const [ordersErr, setOrdersErr] = useState();
  const [topProductsErr, setTopProductsErr] = useState();
  useEffect(() => {
    HomeServices.dailyUsers(`user/getUserAndGuestInDay`).then((res) => {
      if (res) setUserNumbers(res.userNumbers);
      setGuestNumbers(res.guestNumbers);
    });

    HomeServices.dailyOrders(`order/howmanyInDay`).then((res) => {
      if (res) setNumOfOrderInADay(res.numOfOrderInADay);
      setTotalInDay(res.totalInDay);
      setMonthlyDate(Object.values(res.monthlyDate));
    });
    HomeServices.ordersHistory(`order/getAll`)
      .then((res) => {
        if (res) dispatch(allOrders(res.orders));
        setDoneCount(res.doneCount);
        setPendingCount(res.pendingCount);
      })
      .catch((e) => setOrdersErr(e.response.data));

    HomeServices.mostSelling(`product/getMostSelling`)
      .then((res) => {
        let copy = [...res.products].map((product) => {
          return {
            product: { ...product.product, Quantity: product.Quantity },
          };
        });
        if (res) dispatch(mostSelling(copy));
      })
      .catch((e) => setTopProductsErr(e.response.data));
  }, [dispatch]);
  const toggleStatus = (order) => {
    HomeServices.toggleStatus(`order/update/${order?._id}`, {
      orderStatus: order?.orderStatus,
    }).then((res) => {
      dispatch(toggle(res.order));
      setPendingCount(res.pendingCount);
      setDoneCount(res.doneCount);
    });
  };

  const delOrder = (order) => {
    HomeServices.deleteOrder(`order/delete/${order?._id}`).then((res) => {
      dispatch(deleteOrder(order._id));
      toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
    });
  };
  //------------------------- for pie chart
  ChartJS.register(ArcElement, Tooltip, Legend);

  //------------------------- for area chart
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  //--------------------------------------------- Pie chart data
  const pieData = {
    labels: i18n.language === "en" ? ["Pending", "Done"] : ["معلق", "تم"],
    datasets: [
      {
        //   label: '# of Votes',
        data: [pendingCount, doneCount],
        backgroundColor: ["#e0e0e0", "rgb(25, 135, 84,0.3)"],
        borderWidth: 0,
      },
    ],
  };
  //-----------------------------------------   area chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      //   title: {
      //     display: true,
      //     text: 'Chart.js Line Chart',
      //   },
    },
  };
  const labels =
    i18n.language === "en"
      ? [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
      : [
          "يناير",
          "فبراير",
          "مارس",
          "إبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "اغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ];

  const areaData = {
    labels,
    datasets: [
      {
        fill: true,
        label: i18n.language === "en" ? "Orders" : "طلبات",
        data: monthlyDate,
        borderColor: "#fa9e00",
        backgroundColor: "rgb(250, 142, 0, 0.5)",
        tension: 0.4,
        pointBorderColor: "#fa8e00",
      },
    ],
  };
  return (
    <Layout>
      <div className="row d-flex align-items-center p-2  justify-content-center justify-content-lg-start ">
        <div
          className={`col-lg-2 col-md-4 col-8 bg-white rounded shadow px-3 py-4 m-2 d-flex justify-content-between align-items-center`}
        >
          <div className="d-flex p-2 flex-column">
            <h6>
              {i18n.language === "en" ? `Daily Orders` : `الطلبات اليومية`}
            </h6>
            <p>{numOfOrderInADay}</p>
          </div>
          <img src={dailyOrders} width="20%" alt="orders" />
        </div>
        <div
          className={`col-lg-2 col-md-4 col-8 bg-white rounded shadow px-3 py-4 m-2 d-flex justify-content-between align-items-center`}
        >
          <div className="d-flex p-2 flex-column">
            <h6>
              {i18n.language === "en" ? `Daily Visitors` : `الزوار اليومين`}
            </h6>
            <p>{guestNumbers}</p>
          </div>
          <img src={dailyGuests} width="20%" alt="orders" />
        </div>
        <div
          className={`col-lg-2 col-md-4 col-8 bg-white rounded shadow px-3 py-4 m-2 d-flex justify-content-between align-items-center`}
        >
          <div className="d-flex p-2 flex-column">
            <h6>
              {i18n.language === "en" ? `Daily Signups` : `الإشتراكات اليومية`}
            </h6>
            <p>{userNumbers}</p>
          </div>
          <img src={dailySignup} width="20%" alt="orders" />
        </div>
        <div
          className={`col-lg-2 col-md-4 col-8 bg-white rounded shadow px-3 py-4 m-2 d-flex justify-content-between align-items-center`}
        >
          <div className="d-flex p-2 flex-column">
            <h6>
              {i18n.language === "en" ? `Daily Revenue` : `الإيرادات اليومية`}
            </h6>
            <p>{totalInDay}$</p>
          </div>
          <img src={dailyIncome} width="20%" alt="orders" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-11 shadow rounded mx-3 my-lg-0 my-3 p-4 d-flex flex-column align-items-center justify-content-center bg-white">
          <h3 className="align-self-start mx-2">
            {i18n.language === "en" ? `Sales report` : `تقرير المبيعات`}
          </h3>
          <hr style={{ width: "100%", color: "grey" }} />
          <Line options={options} data={areaData} />
        </div>
        <div className="col-lg-4 col-11 shadow rounded mx-3 p-5 d-flex flex-column align-items-center  bg-white">
          <h3 className="align-self-start mx-2">
            {i18n.language === "en" ? `Orders Status` : `حالة الطلبات`}
          </h3>
          <hr style={{ width: "100%", color: "grey" }} />
          <Pie data={pieData} />
        </div>
      </div>
      <div className="row my-5">
        <div
          className={`col-lg-8 col-12 shadow mx-3 my-lg-0 my-3 p-5 rounded d-flex flex-column  justify-content-start bg-white  ${styles.Table}`}
        >
          <h3 className="m-2 align-self-start">
            {i18n.language === "en" ? `Orders history` : `تاريخ الطلبات`}
          </h3>
          <hr />
          {orders ? (
            <table className={`table`}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {i18n.language === "en" ? `Name` : `الإسم`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Email` : `البريد الإلكتروني`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Items" : "العناصر"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Price` : `السعر`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Payment` : `طريقة الدفع`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Status` : `الحالة`}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? `Date` : "التاريخ"}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={order._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{order?.firstName + ' ' + order?.lastName}</td>
                    <td>{order?.email}</td>
                    <td>{order?.totalQuantity}</td>
                    <td>{order?.subTotal}</td>
                    <td>
                      {order?.payInCash
                        ? i18n.language === "en"
                          ? "Pay in delivery"
                          : "الدفع عند التوصيل"
                        : i18n.language === "en"
                        ? `Pay online`
                        : `اونلاين`}
                    </td>
                    <td>
                      <button
                        className={`btn`}
                        style={
                          order?.orderStatus === "pending"
                            ? {
                                backgroundColor: "#e0e0e0",
                                border: "none",
                                padding: "5px 13px",
                              }
                            : {
                                backgroundColor: "rgb(25, 135, 84,0.6)",
                                border: "none",
                                color: "white",
                                padding: "5px 21px",
                              }
                        }
                        onClick={() => toggleStatus(order)}
                      >
                        {order?.orderStatus}
                      </button>
                    </td>
                    <td>{moment(order?.createdAt).format("YYYY-MM-DD")}</td>
                    <td>
                      <div className="dropdown">
                        <BiDotsVerticalRounded
                          style={{ fontSize: "20px", cursor: "pointer" }}
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />

                        <ul className="dropdown-menu text-center">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/shopping/${order?._id}`}
                          >
                            <li
                              style={{ cursor: "pointer" }}
                              className="dropdown-item"
                            >
                              {i18n.language === "en"
                                ? `Show details`
                                : "عرض التفاصيل"}
                            </li>
                          </Link>
                          <li className="dropdown-divider"></li>

                          <li
                            style={{ cursor: "pointer" }}
                            className="dropdown-item"
                            onClick={() => delOrder(order)}
                          >
                            {i18n.language === "en" ? `Delete` : "حذف"}
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="fs-3 text-danger">
              {i18n.language === "en"
                ? ordersErr?.error_en
                : ordersErr?.error_ar}
            </h3>
          )}
        </div>
        <div className={`col-lg-3 col-11 d-flex mx-3 shadow flex-column p-4 bg-white rounded ${styles.MostSelling}`}>
          <h3 className="m-1 align-self-start">
            {i18n.language === "en" ? "Top products" : `الأكثر مبيعًا`}
          </h3>
          <hr style={{ width: "100%", color: "grey" }} />
          {mostSellingItems.length > 0 ? (
            mostSellingItems?.map((item, index) => (
              <div key={index} className="d-flex h-50">
                {item?.images && (
                  <img
                    className="rounded mx-3 w-25 h-50"
                    src={`${imageURL}/${item?.images[0]}`}
                    alt="product"
                  />
                )}
                <div className="w-100">
                  <div className="d-flex justify-content-between w-100 h-25 my-2">
                    <h6 className="">{item?.title}</h6>
                    <p
                      className="m-4"
                      style={{ fontSize: "11px", color: "grey" }}
                    >
                      {` ${item?.Quantity} `}
                      {i18n.language === "en" ? "sales " : "مبيعات "}
                    </p>
                  </div>
                  <p className="text-warning">
                    {item?.price * item?.sale}
                    <sup>
                      {item?.price !== item?.price * item?.sale && (
                        <del className="mx-2" style={{ color: "grey" }}>
                          {item?.price}
                        </del>
                      )}
                    </sup>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="fs-5 text-danger">
              {i18n.language === "en"
                ? topProductsErr?.error_en
                : topProductsErr?.error_ar}
            </h5>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
