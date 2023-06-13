import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TechnicalSupportServices from "../httpServices/technicalSupport.services";
import Layout from "../Layout/Layout";
import { allCustContacts } from "../store/contactsSlice";
import i18n from "../Translation/i18n";

const TechnicalSupport = () => {
  const { customerService } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [err, setErr] = useState()
  useEffect(() => {
    TechnicalSupportServices.getAll(`contact/getAll/customerService`).then(
      (res) => {
        dispatch(allCustContacts(res.contacts));
      }
    ).catch(e => setErr(e.response.data));
  }, [dispatch]);

  return (
    <div>
      <Layout>
        <div className=" m-3 p-3  rounded">
          <h3>
            {i18n.language === "en" ? `Technical support` : `دعم فني`}
          </h3>

              {!err ?
            <div className="row">
              {customerService.map((cust) => (
              <div key={cust._id} className="col-lg-4 m-3 p-5 shadow col-md-6 col-10 d-flex flex-column bg-white rounded">
                <h4>{cust.name}</h4>
                <p className="text-wrap">Email: {cust.email}</p>
                <p>phone: {cust.phone}</p>
                <Link to={`/technicalSupport/${cust._id}`} className="btn btn-warning text-white align-self-end">
                    {i18n.language === 'en' ? `Open message` : `إفتح الرسالة`}
                </Link>
              </div>
              
            ))}
            </div>
          : <h3 className='fs-3 text-danger'>{i18n.language === 'en' ? err.error_en : err.error_ar}</h3>
            } 
        </div>
      </Layout>
    </div>
  );
};

export default TechnicalSupport;
