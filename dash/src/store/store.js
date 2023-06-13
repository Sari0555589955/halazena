import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './UsersSlice'
import OrdersReducer from './ordersSlice'
import SectionsReducer from './sectionsSlice'
import productsReducer from './ProductSlice'
import contactsReducer from './contactsSlice'
import SiteAttachmentsReducer from './SiteAttachments'
import getMeReducer from './meSlice'
export const store = configureStore({
  reducer: {
    users: usersReducer,
    orders: OrdersReducer,
    sections: SectionsReducer,
    products: productsReducer,
    contacts: contactsReducer,
    siteAttachments: SiteAttachmentsReducer,  
    getMe: getMeReducer
  },
  devTools: process.env.NODE_ENV !== 'production',

})