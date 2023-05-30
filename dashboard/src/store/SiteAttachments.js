import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    sliders: [],
}

export const SiteAttachments = createSlice({
    name: 'sliders',
    initialState,
    reducers: {
        getSliders: (state, action) => {
            state.sliders = action.payload;
        },
        deleteSlider: (state, action) => {
            state.sliders = state.sliders.filter((slider) => slider._id !== action.payload)            
        },
        addSlider: (state, action) => {
            state.sliders.push(action.payload)
        } 
       
    }
})

export const {getSliders, deleteSlider, addSlider} = SiteAttachments.actions
export default SiteAttachments.reducer