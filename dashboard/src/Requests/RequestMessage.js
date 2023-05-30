import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import TechnicalSupportServices from '../httpServices/technicalSupport.services'
import Layout from '../Layout/Layout'
import { allRequests } from '../store/contactsSlice'
import i18n from '../Translation/i18n'

const RequestMessage = () => {

 
    const {requests} = useSelector(state => state.contacts)
    const params = useParams()
    const [message, setMessage] = useState()
    // useEffect(() => {
    //     if (requests.length === 0) {
    //         TechnicalSupportServices.getAll(`contact/getAll`).then((res) => {
    //             dispatch(
    //               allRequests(
    //                 res.contacts.filter(
    //                   (contact) => contact.contactType !== "customerService"
    //                 )
    //               )
    //             );
    //           });
    //         }
    //         setMessage(requests.find(contact => contact._id === params.id))
    //     }, [requests, dispatch, params])

        useEffect(() => {
              TechnicalSupportServices.getAll(`contact/getById/${params.id}`).then((res) => {
                setMessage(res?.contact)
                });
           
          }, [params.id,requests.length])
  return (
    <div>
        <Layout>
            <div className='row bg-white m-3 p-3 rounded'>
                <div className='my-3 col-lg-6'>
                <h5>{i18n.language === 'en' ? `Name` : `الإسم`}</h5>
                <div className='rounded p-3 border '>
                    {message?.name}
                </div>
                </div>
                <div className='my-3 col-lg-6'>
                <h5>{i18n.language === 'en' ? `Email` : `البريد الإلكتروني`}</h5>
                <div className='rounded p-3 border'>
                   {message?.email}
                </div>
                </div>
                <div className='my-3 col-lg-12'>
                <h5>{i18n.language === 'en' ? `Phone` : `رقم الجوال`}</h5>
                <div className='rounded p-3 border '>
                    {message?.phone}
                </div>
                </div>
                <div className='my-3 col-lg-12'>
                <h5>{i18n.language === 'en' ? `Message` : `الرسالة`}</h5>
                <div className='rounded p-3 border '>
                    {message?.message}
                </div>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default RequestMessage