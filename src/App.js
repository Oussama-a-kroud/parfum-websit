import Footer from "./Components/Utility/Footer";
import NavBarLogin from "./Components/Utility/NavBarLogin";
import AnnouncementBar from "./Components/Utility/AnnouncementBar";
import HomePage from "./Page/Home/HomePage";
import LoginPage from "./Page/auth/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Page/auth/RegisterPage";
import ForgotPasswordPage from "./Page/auth/ForgotPasswordPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetalisPage from "./Page/Products/ProductDetailsPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethodPage from "./Page/Checkout/ChoosePayMethodPage";
import PackPage from "./Page/Pack/PackPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminOrderDetailsPage from "./Page/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./Page/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddProductsPage from "./Page/Admin/AdminAddProduct";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductsPage";
import UserAllOrdersPage from "./Page/User/UserAllOedersPage";
import UserFavoriteProductsPage from "./Page/User/UserFavoriteProductsPage";
import UserAllAddresPage from "./Page/User/UserAllAddresPage";
import UserAddAddressPage from "./Page/User/UserAddAdressPage";
import UserEditAddressPage from "./Page/User/UserEditAddressPage";
import UserProfilePage from "./Page/User/UserProfilePage";

function App() {
  return (
    <div className="font d-flex flex-column min-vh-100">
      <BrowserRouter basename="/parfum-websit">
        {/* Announcement Bar */}
        <AnnouncementBar />
        {/* NavBar */}
        <NavBarLogin />
        
        {/* Main Content Area Pushing Footer to Bottom */}
        <div className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/pack" element={<PackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/allCategory" element={<AllCategoryPage />} />
            <Route path="/allbrand" element={<AllBrandPage />} />
            <Route path="/products" element={<ShopProductsPage />} />
            <Route path="/products/:id" element={<ProductDetalisPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order/paymethoud" element={<ChoosePayMethodPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
            <Route path="/admin/addproduct" element={<AdminAddProductsPage />} />
            <Route path="/admin/editproduct/:id" element={<AdminEditProductsPage />} />
            
            {/* User Routes */}
            <Route path="/user/allorders" element={<UserAllOrdersPage />} />
            <Route path="/user/favoriteproducts" element={<UserFavoriteProductsPage />} />
            <Route path="/user/addresses" element={<UserAllAddresPage />} />
            <Route path="/user/add-address" element={<UserAddAddressPage />} />
            <Route path="/user/edit-address" element={<UserEditAddressPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Routes>
        </div>
        
        {/* Sticky Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;