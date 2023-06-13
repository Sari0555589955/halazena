import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import TechnicalSupportServices from '../httpServices/technicalSupport.services'
import Layout from '../Layout/Layout'
import { allCustContacts } from '../store/contactsSlice'
import i18n from '../Translation/i18n'

const TechnicalSupportMessage = () => {

 
    const {customerService} = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const params = useParams()
    const [message, setMessage] = useState()
    useEffect(() => {
        if (customerService.length === 0) {
            TechnicalSupportServices.getAll(`contact/getAll/customerService`).then(
                (res) => {
                  dispatch(allCustContacts(res.contacts));
                }
                );
            }
            setMessage(customerService.find(contact => contact._id === params.id))
        }, [customerService, dispatch, params])

       
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
                <div className='rounded p-3 border '>
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

export default TechnicalSupportMessage