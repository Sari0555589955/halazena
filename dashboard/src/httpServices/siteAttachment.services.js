    import axios from "axios";
    import {baseURL} from '..'
    axios.defaults.headers.common['Authorization']=localStorage.getItem('token')

    const SiteAttachmentsServices = {
    
        upload: async function (endPoint, image) {
            const {data} = await axios.post(`${baseURL}/${endPoint}`,image)
            if (data)
            return data
        },
        getAll : async function (endPoint) {
            const {data} = await axios.get(`${baseURL}/${endPoint}`)
            if (data)
            return data
        },
        addSection: async function (endPoint, section) {
            const {data} = await axios.post(`${baseURL}/${endPoint}`,section)
            if (data)
            return data
        },
        updateSection: async function (endPoint, updatedSection) {
            const {data} = await axios.put(`${baseURL}/${endPoint}`, updatedSection)
            if (data)
            return data
        },
        deleteSection: async function (endPoint) {
            const {data} = await axios.delete(`${baseURL}/${endPoint}`)
            if (data)
            return data;
        },
    
    }


    export default SiteAttachmentsServices;