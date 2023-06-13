import axios from "axios";
import {baseURL} from '..'
axios.defaults.headers.common['Authorization']=localStorage.getItem('token')


const TechnicalSupportServices = {
 
   
    getAll : async function (endPoint) {
        const {data} = await axios.get(`${baseURL}/${endPoint}`)
        if (data)
        return data
    },
    deleteContact: async function (endPoint) {
        const {data} = await axios.delete(`${baseURL}/${endPoint}`)
        if (data)
        return data;
    },
  
}


export default TechnicalSupportServices;