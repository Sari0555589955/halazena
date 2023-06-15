import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAll: (state, Action) => {
      state.products = Action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    mostSelling: (state, action) => {
      let newProductsObj = {};
      let copyProducts = [...action.payload];
      let newProducts = [];
      copyProducts.forEach((product) => {
        if (!newProductsObj[product?._id]) {
          newProductsObj[product._id] = product;
          newProducts.push(product);
        }
      });
      state.products = newProducts;
    },
  },
});

export const { getAll, deleteProduct, mostSelling } = productSlice.actions;

export default productSlice.reducer;
