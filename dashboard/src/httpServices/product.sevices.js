import axios from "axios";
import {baseURL} from '..'
axios.defaults.headers.common['Authorization']=localStorage.getItem('token')

const ProductServices = {
    getAll: async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    addProduct: async function (endPoint, productInfo) {
        const {data} = await axios.post(`${baseURL}/${endPoint}`,productInfo)
        if (data)
        return data
    },
    upload: async function (endPoint, image) {
        const {data} = await axios.post(`${baseURL}/${endPoint}`,image)
        if (data)
        return data
    },
    deleteProduct: async function (endPoint) {
        const {data} = await axios.delete(`${baseURL}/${endPoint}`)
        if (data)
        return data;
    },
   updateProduct: async function (endPoint, updatedProdcut) {
    const {data} = await axios.put(`${baseURL}/${endPoint}`, updatedProdcut)
    if (data)
    return data;
   }
}


export default ProductServices;