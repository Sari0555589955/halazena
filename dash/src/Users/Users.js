import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./Users.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import UserService from "../httpServices/user.services";
import { useDispatch, useSelector } from "react-redux";
import {  getUsers, deleteUser } from "../store/UsersSlice";
import moment from "moment/moment";
import i18n from "../Translation/i18n";
import { toast } from "react-toastify";

const Users = () => {
  const [state, setState] = useState("");
  const [copy, setCopy] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    setState(e.target.value);
    let filteredData = users.filter((user) =>
      (user.firstName + user.lastName).includes(e.target.value)
    );
    setCopy(filteredData);
  };
  useEffect(() => {
    UserService.getUsers(`user/getAll`).then((res) => {
      if (res) {
        dispatch(
          getUsers(
            Object.values(res.users).map((user) => {
              return { ...user.user, totalRevinue: user.totalRevinue };
            })
          )
        );
      }
    });
  }, [dispatch]);
  const deleteHandler = (user) => {
    UserService.deleteUser(`user/delete/${user._id}`).then((res) => {
      dispatch(deleteUser(user._id));
      toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
    });
  };
  return (
    <Layout>
      <div className="m-1 w-100">
        <h4 className="m-4">
          {i18n.language === "en" ? "Users" : "المستخدمين"}
        </h4>
        <div className={styles.Container}>
          <div className={`${styles.SearchContainer}`}>
            <span>
              <AiOutlineSearch className="d-none d-lg-inline" />
            </span>
            <input
              className={styles.Search}
              type="search"
              onChange={handleInputChange}
              placeholder={i18n.language === "en" ? "Search..." : "بحث ..."}
            />
          </div>
          <div className={styles.Table}>
            <table className={`table mt-5`}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {i18n.language === "en" ? "Name" : "الإسم"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Phone" : "رقم الجوال"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Email" : "البريد الإلكتروني"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en"
                      ? "Total purchases amount"
                      : "إجمالي مبلغ المشتريات"}
                  </th>
                  <th scope="col">
                    {i18n.language === "en" ? "Join date" : "تاريخ الإنضمام"}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {state !== ""
                  ? copy.length > 0 &&
                    copy.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {user?.firstName?.charAt(0)?.toUpperCase() +
                            user?.firstName?.slice(1)}
                          {user?.lastName?.charAt(0)?.toUpperCase() +
                            user?.lastName?.slice(1)}
                        </td>
                        <td>{user?.phone}</td>
                        <td>{user?.email}</td>
                        <td>{user?.totalRevinue}$</td>
                        <td>{moment(user?.createdAt).format("YYYY-MM-DD")}</td>
                        <td>
                          <RiDeleteBinLine
                            className={styles.Delete}
                            onClick={() => deleteHandler(user)}
                          />
                        </td>
                      </tr>
                    ))
                  : users.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {user?.firstName?.charAt(0)?.toUpperCase() +
                            user?.firstName?.slice(1)}
                          {user?.lastName?.charAt(0)?.toUpperCase() +
                            user?.lastName?.slice(1)}
                        </td>
                        <td>{user?.phone}</td>
                        <td>{user?.email}</td>
                        <td>{user?.totalRevinue}$</td>
                        <td>{moment(user?.createdAt).format("YYYY-MM-DD")}</td>
                        <td>
                          <RiDeleteBinLine
                            className={styles.Delete}
                            onClick={() => deleteHandler(user)}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
