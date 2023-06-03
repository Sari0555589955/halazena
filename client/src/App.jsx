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
import Copyright from "./components/copyright/Copyright";
import useFetchCart from "./Pages/cart/useFetchCart";
import useFetchSavedProducts from "./Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import { useAddToCartMutation } from "./APIs/cartApi";
import ScrollingUpDuringRouting from "./ScrollingUp";
import { useLazyGetMeQuery } from "./APIs/UserApis";
import { setCurrentUser } from "./APIs/userSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { currentUser } = useSelector((state) => state);
  const { getSaved } = useFetchSavedProducts();
  const { getCarts } = useFetchCart();
  const dispatch = useDispatch();
  useEffect(() => {
    getSaved();
    getCarts();
  }, []);

  let token = sessionStorage.getItem("token");
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
      console.log("sessionStorage: ", sessionState);
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
