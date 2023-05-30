import React, { useEffect } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout/Layout'
import moment from 'moment/moment'
import styles from './Shopping.module.css'
import { allOrders, deleteOrder, toggle } from '../store/ordersSlice'
import HomeServices from '../httpServices/home.services'
import i18n from '../Translation/i18n'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Shopping = () => {

    const { orders } = useSelector(state => state.orders) 
    const dispatch = useDispatch()
    useEffect(() => {
        HomeServices.ordersHistory(`order/getAll`).then((res) => {
            if (res) dispatch(allOrders(res.orders));
          
          });
    }, [dispatch])

    const delOrder = (order) => {
      HomeServices.deleteOrder(`order/delete/${order?._id}`).then(res => {
        dispatch(deleteOrder(order._id))
        toast.success(i18n.language === 'en' ? res.success_en : res.success_ar);
      })
    }
    const toggleStatus = (order) => {
      HomeServices.toggleStatus(`order/update/${order?._id}`, {orderStatus:order?.orderStatus}).then(res => {
        dispatch(toggle(res.order))
      
      })
    }
    
      return (
    <Layout>
        <div className={`${styles.Table} bg-white m-3 rounded p-3`}>
            <h3>{i18n.language === 'en' ? `Order history` : `تاريخ الطلبات`}</h3>
            <hr/>
        <table className={`table`}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{i18n.language === "en" ? `Name` : `الإسم`}</th>
                <th scope="col">
                  {i18n.language === "en" ? `Email` : `البريد الإلكتروني`}
                </th>
                <th scope="col">{i18n.language === "en" ? "Items" : "العناصر"}</th>
                <th scope="col">{i18n.language === "en" ? `Price` : `السعر`}</th>
                <th scope="col">{i18n.language === "en" ? `Payment` : `طريقة الدفع`}</th>
                <th scope="col">{i18n.language === "en" ? `Status` : `الحالة`}</th>
                <th scope="col">{i18n.language === "en" ? `Date` : "التاريخ"}</th>
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
                    {order.payInCash
                      ? i18n.language === "en"
                        ? "Pay in delivery"
                        : "الدفع عند التوصيل"
                      : i18n.language === "en"
                      ? `Online`
                      : `اونلاين`}
                  </td>
                  <td><button 
                  className={`btn`}
                  style={order?.orderStatus === 'pending' ? {backgroundColor:'#e0e0e0', border:'none', padding:'5px 13px'} : {backgroundColor:'rgb(25, 135, 84,0.6)', border:'none', color:'white', padding:'5px 21px'}}
                  
                  onClick={()=>toggleStatus(order)}>
                  {order?.orderStatus}
                  </button></td>
                  <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>
                  <td>
                    <div className="dropdown">
                      <BiDotsVerticalRounded
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />

                      <ul className="dropdown-menu text-center">
                        <Link style={{textDecoration:'none'}} to={`/shopping/${order?._id}`}>
                        <li style={{cursor:'pointer'}} className="dropdown-item">
                            {i18n.language === "en" ? `Show details` : "عرض التفاصيل"}
                        </li>
                        </Link>
                        <li className="dropdown-divider"></li>
                        
                        <li style={{cursor:'pointer'}} className="dropdown-item" onClick={()=>delOrder(order)}>
                            {i18n.language === "en" ? `Delete` : "حذف"}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
    </Layout>
  )
}

export default Shopping