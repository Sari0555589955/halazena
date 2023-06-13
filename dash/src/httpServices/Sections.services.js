import axios from "axios";
import { baseURL } from "..";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
const SectionsServices = {
  getAllSections: async (endpoint) => {
    const { data } = await axios.get(`${baseURL}/${endpoint}`);
    if (data) return data;
  },
  getSingleSection: async (endpoint, sectionId) => {
    const { data } = await axios.get(`${baseURL}/${endpoint}/${sectionId}`);
    if (data) return data;
  },
  addSection: async (endpoint, values) => {
    const { data } = await axios.post(`${baseURL}/${endpoint}`, values);
    if (data) return data;
  },
  updateSection: async (endpoint, sectionId, values) => {
    const { data } = await axios.put(
      `${baseURL}/${endpoint}/${sectionId}`,
      values
    );
    if (data) return data;
  },
  deleteSection: async (endpint, sectionId) => {
    const data = await axios.delete(`${baseURL}/${endpint}/${sectionId}`);
    return data;
  },
  upload: async function (endPoint, image) {
    const { data } = await axios.post(`${baseURL}/${endPoint}`, image);
    if (data) return data;
  },
};

export default SectionsServices;
