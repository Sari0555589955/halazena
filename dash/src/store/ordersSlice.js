import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    mostSellingItems: []
}

export const ordersSlice = createSlice({
    name:'orders',
    initialState,
    reducers: {
        allOrders: (state, action) => {
            state.orders = action.payload
        },
        mostSelling: (state, action) => {
            let newProductsObj={};
            let copyProducts=[...action.payload]
            let newProducts=[];
            copyProducts.forEach(({product},index)=>{
                if (!newProductsObj[product._id]) {
                    newProductsObj[product._id] = product
                    newProducts.push(product)
                    
                }})
                state.mostSellingItems=newProducts
            },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter(order => order._id !== action.payload)
        },
        toggle: (state, action) => {

          
            let copy=[...current(state.orders)]
            let target=action.payload;

             copy = copy.map(ord => ord._id === target._id ?target:ord)
            state.orders = copy
            

      
        },
     
    }
})

export const {allOrders, mostSelling, deleteOrder, toggle} = ordersSlice.actions
export default ordersSlice.reducer