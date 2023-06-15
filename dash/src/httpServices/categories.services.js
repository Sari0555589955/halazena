import axios from "axios";
import { baseURL } from "..";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
const CategoriesServices = {
  allSections: async function (endPoint) {
    const { data } = await axios.get(`${baseURL}/${endPoint}`);
    if (data) return data;
  },
  deleteSection: async function (endPoint) {
    const { data } = await axios.delete(`${baseURL}/${endPoint}`);
    if (data) return data;
  },
  addSection: async function (endPoint, newSection) {
    const { data } = await axios.post(`${baseURL}/${endPoint}`, newSection);
    if (data) return data;
  },
  getCategoryById: async (endpoint, id) => {
    const { data } = await axios.get(`${baseURL}/${endpoint}/${id}`);
    if (data) return data;
  },
  updateCategory: async (categoryId, values) => {
    const { data } = await axios.put(
      `${baseURL}/category/update/${categoryId}`,
      values
    );
    if (data) return data;
  },
};

export default CategoriesServices;
