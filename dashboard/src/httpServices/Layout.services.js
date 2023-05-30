import axios from "axios";
import { baseURL } from "..";
axios.defaults.headers.common['Authorization']=localStorage.getItem('token')

const LayoutServices = {
    getMe : async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
   
}

export default LayoutServices;