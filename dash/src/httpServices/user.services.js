import axios from 'axios'
import { baseURL } from '..'

if(localStorage.getItem('token')){

    axios.defaults.headers.common['Authorization']=localStorage.getItem('token')
}

const UserService = {
    login: async function (endPoint, loginData) {
            const { data } = await axios.post(`${baseURL}/${endPoint}`, loginData)
            if (data) {
                return data;
            }
    },
    getUsers: async function (endPoint) {
        const { data } = await axios.get(`${baseURL}/${endPoint}`)
        if (data) 
        return data;
    
    },
    addUser: async function (endPoint, userInfo) {
        const {data} = await axios.post(`${baseURL}/${endPoint}`, userInfo)
        if (data)
        return data;
    },
    addAdmin: async function (endPoint, userInfo) {
        const {data} = await axios.post(`${baseURL}/${endPoint}`, userInfo)
        if (data)
        return data;
    },
    deleteUser: async function (endPoint) {
        const {data} = await axios.delete(`${baseURL}/${endPoint}`)
        if (data)
        return data;
    },
    updateUser: async function (endPoint, updatedUser) {
        const {data} = await axios.put(`${baseURL}/${endPoint}`, updatedUser)
        if (data)
        return data;
    },

}

export default UserService