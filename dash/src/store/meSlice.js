import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    me: {},
}

export const meSlice = createSlice({
    name:'getME',
    initialState,
    reducers: {
        getMe: (state, action) => {
            state.me = action.payload
        },
        
      
    }
})

export const {getMe} = meSlice.actions
export default meSlice.reducer