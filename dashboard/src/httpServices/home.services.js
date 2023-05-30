import axios from "axios";
import { baseURL } from "..";

    axios.defaults.headers.common['Authorization']=localStorage.getItem('token')

const HomeServices = {
    dailyUsers : async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    dailyOrders : async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    ordersHistory: async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    mostSelling: async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    deleteOrder: async function (endPoint) {
        const {data} = await axios.delete(`${baseURL}/${endPoint}`)
        if (data)
        return data;
    },
    orderById: async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    toggleStatus: async function (endPoint, updatedStatus) {
        const {data} = await axios.put(`${baseURL}/${endPoint}`, updatedStatus)
        if (data)
        return data;
    },
}

export default HomeServices;