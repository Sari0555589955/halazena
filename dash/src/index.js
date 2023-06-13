import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import i18n from "./Translation/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
// export const baseURL = "https://www.saritest.store:8080/unStore/api/v1";
// export const imageURL = `https://www.saritest.store:8080/uploads`;
export const baseURL = "https://saritest.store:4200/unStore/api/v1";
export const imageURL = `https://saritest.store:4200/uploads`;
axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
root.render(
  <Provider store={store}>
    <ToastContainer rtl={i18n.language === 'en' ? false : true} />

    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
