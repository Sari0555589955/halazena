import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TechnicalSupportServices from "../httpServices/technicalSupport.services";
import Layout from "../Layout/Layout";
import { allRequests, deleteRequest } from "../store/contactsSlice";
import i18n from "../Translation/i18n";
import styles from "../Users/Users.module.css";
import {AiFillDelete} from 'react-icons/ai'
import { toast } from "react-toastify";

const Requests = () => {
  const { requests } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  useEffect(() => {
    TechnicalSupportServices.getAll(`contact/getAll`)
      .then((res) => {
        dispatch(
          allRequests(
            res.contacts.filter(
              (contact) => contact.contactType !== "customerService"
            )
          )
        );
      })
      .catch((e) => setErr(e.response.data));
  }, [dispatch]);
  const deleteReq = (id) => {
    TechnicalSupportServices.deleteContact(`contact/delete/${id}`).then((res) => {
      dispatch(deleteRequest(id));
      toast.success(i18n.language === "en" ? res.success_en : res.success_ar);
    });
  };
  return (
    <div>
      <Layout>
        <h3 className="m-3">{i18n.language === "en" ? `Requests` : `الطلبات`}</h3>
        <div className="bg-white rounded p-3 m-3">
          <div
            className={`d-flex justify-content-between my-3 p-3 border-bottom ${styles.Table}`}
          >
            {!err ? (
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
                      {i18n.language === "en" ? `Phone` : `رقم الجوال`}
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={request._id}>
                      <th scope="row">{index}</th>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.phone}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center align-items-center">
                        <Link
                          to={`/requests/${request._id}`}
                          className={`btn text-white ${
                            request.isOpened ? "btn-secondary" : "btn-success"
                          }`}
                        >
                          {i18n.language === "en"
                            ? `Open message`
                            : `إفتح الرسالة`}
                        </Link>
                          <div style={{padding:'5px', background:'#ff9999', borderRadius:'50%', cursor:'pointer'}}>
                          <AiFillDelete style={{color:'red', fontSize:'25px'}} onClick={()=>deleteReq(request._id)}/>

                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="text-danger fs-3">
                {i18n.language === "en" ? err.error_en : err.error_ar}
              </h3>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Requests;
