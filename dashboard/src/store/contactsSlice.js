import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    customerService: [],
    requests: []
}

export const contactsSlice = createSlice({
    name:'customerService',
    initialState,
    reducers: {
        allCustContacts: (state, action) => {
            state.customerService = action.payload
        },
        allRequests: (state, action) => {
            state.requests = action.payload
        },
        deleteRequest: (state, action) => {
            state.requests = state.requests.filter((request) => request._id !== action.payload)            
        }
      
    }
})

export const {allCustContacts, allRequests, deleteRequest} = contactsSlice.actions
export default contactsSlice.reducer