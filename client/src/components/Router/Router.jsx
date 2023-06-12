import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import Home from "../../Pages/home/Home";
import ProductsListForCart_Saved from "../../Pages/ProductsListForCart_Saved/ProductsListForCart_Saved";
import Profile from "../../Pages/Profile/Profile";
import CheckoutPage from "../../Pages/checkout/CheckoutPage";
import Departments from "../../Pages/departments/Departments";
import SavedProducts from "../../Pages/savedProducts/SavedProducts";
import ContactUsPage from "../../Pages/contactUs/ContactUsPage";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "../../Pages/aboutUs/AboutUsPage";
import SingleProduct from "../../Pages/singleProduct/SingleProduct";
import SavedTest from "../../Pages/savedTest/SavedTest";
import CartTest from "../../Pages/cart/CartTest";
import CheckTest from "../../Pages/checkout/CheckTest";
import PrivacyPolicyPage from "../../Pages/privacyPolicy/PrivacyPolicyPage";
import CompletePaymentPage from "../../Pages/CompletePayment/CompletePaymentPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import ThanksOrderPage from "../../Pages/thanksOrder/ThanksOrderPage";
// import ProfileTest from "../../Pages/profileTest/ProfileTest";
const AppRoutes = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        {/* <Route path="/savedProducts" element={<ProductsListForCart_Saved />} /> */}
        {/* <Route path="/profile" element={<ProfileTest />} /> */}
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/cart" element={<CartTest />} />
        <Route path="/contactUs" element={<ContactUsPage />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:categoryId" element={<Departments />} />
        <Route path="/savedProducts" element={<SavedTest />} />
        {/* <Route path="/savedProducts" element={<SavedProducts />} /> */}
        <Route path="/productDetails/:productId" element={<SingleProduct />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/completePayment" element={<CompletePaymentPage />} />
        <Route element={<ProtectedRoutes condition={currentUser?.email} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckTest />} />

        </Route>
        <Route path="/thanksOrder" element={<ThanksOrderPage />} />
        <Route element={<ProtectedRoutes condition={!currentUser?.email} />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
export default AppRoutes;
