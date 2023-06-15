import "./App.css";
import Nav from "./components/nav/Nav";
import NavTest from "./components/nav/NavTest";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Router/Router";
import Cards from "./components/cards/Cards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLazyCreateGuestUserQuery } from "./APIs/gestUserApi";
import Footer from "./components/footer/Footer";

import useFetchCart from "./Pages/cart/useFetchCart";
import useFetchSavedProducts from "./Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import ScrollingUpDuringRouting from "./ScrollingUp";
import { useLazyGetMeQuery } from "./APIs/UserApis";
import { setCurrentUser } from "./APIs/userSlice";
import { useDispatch } from "react-redux";
function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { getSaved } = useFetchSavedProducts();
  const { getCarts } = useFetchCart();
  const dispatch = useDispatch();
  useEffect(() => {
    getSaved();
    getCarts();
  }, []);
  const [getGuestUser] = useLazyCreateGuestUserQuery();
  const changeDefaultLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    changeDefaultLanguage("ar");
  }, []);
  useEffect(() => {
    const sessionState = sessionStorage.getItem("token");
    if (!sessionState) {
      getGuestUser().then(({ data, error }) => {
        if (data.token) {
          sessionStorage.setItem("token", data.token);
        }
      });
    }
  }, [sessionStorage.getItem("token")]);
  const [getMe] = useLazyGetMeQuery();
  useEffect(() => {
    getMe().then(({ data }) => {
      dispatch(setCurrentUser(data?.user));
    });
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavTest />
      <AppRoutes />
      <Footer />
      <ScrollingUpDuringRouting />
    </BrowserRouter>
  );
}

export default App;
