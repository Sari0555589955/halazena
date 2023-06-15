import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    sliders: [],
    banners:[]
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
        },
        getBanners: (state, action) => {
            state.banners = action.payload;
        },
        deleteBanner: (state, action) => {
            state.banners = state.banners.filter((banner) => banner._id !== action.payload)            
        },
       
    }
})

export const {getSliders, deleteSlider, addSlider, getBanners,deleteBanner} = SiteAttachments.actions
export default SiteAttachments.reducer