import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Users from "./Users/Users";
import Home from "./Home/Home";
import Categories from "./categories/Categories";
import Sections from "./sections/Sections";
import Products from "./Products/Products";
import Product from "./Products/Product/Product";
import SiteAttachments from "./SiteAttachments/SiteAttachments";
import AddProduct from "./Products/AddProduct/AddProduct";
import Shopping from "./Shopping/Shopping";
import TechnicalSupport from "./TechnicalSupport/TechnicalSupport";
import TechnicalSupportMessage from "./TechnicalSupport/TechnicalSupportMessage";
import Requests from "./Requests/Requests";
import RequestMessage from "./Requests/RequestMessage";
import EditProduct from "./Products/EditProduct/EditProduct";
import Private from "./Private";
import Public from "./Public";
import { useTranslation } from "react-i18next";
import Profile from "./Profile/Profile";
import ShoppingPreview from "./Shopping/ShoppingPreview";
import Admins from "./Admins/Admins";
import SingleSectionPage from "./singeSection/SingleSectionPage";
import EditSectionPage from "./editSection/EditSectionPage";
import AddSectionPage from "./addSection/AddSectionPage";
const App = () => {
  const { i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/sections/:sectionId" element={<SingleSectionPage />} />
          <Route
            path="/sections/edit/:sectionId"
            element={<EditSectionPage />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/siteAttachments" element={<SiteAttachments />} />
          <Route path="/products/addProduct" element={<AddProduct />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shopping/:id" element={<ShoppingPreview />} />
          <Route path="/technicalSupport" element={<TechnicalSupport />} />
          <Route path="/sections/add" element={<AddSectionPage />} />
          <Route path="/technicalSupport/:" element={<TechnicalSupport />} />
          <Route path="/admins/" element={<Admins />} />
          <Route
            path="/technicalSupport/:id"
            element={<TechnicalSupportMessage />}
          />
          <Route path="/requests" element={<Requests />} />
          <Route path="/requests/:id" element={<RequestMessage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
