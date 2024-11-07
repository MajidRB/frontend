
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'
import { CartContext } from './views/plugin/Context'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import MainWrapper from './layout/MainWrapper'
import PrivateRoute from './layout/PrivateRoute'

import apiInstance from './utils/axios'
import CartID from './views/plugin/CartID'
import UserData from './views/plugin/UserData'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import StoreFooter from './views/base/StoreFooter'
import TopBar from './views/base/TopBar'
import Product from './views/store/Product'
import ProductDetail from './views/store/ProductDetail'
import Cart from './views/store/Cart'
import Checkout from './views/store/Checkout'
import PaymentSuccess from './views/store/PaymentSuccess'
import Search from './views/store/Search'
import Account from './views/Customer/Account'
import Orders from './views/Customer/Orders'
import OrderDetail from './views/Customer/OrderDetail'
import Wishlist from './views/Customer/Wishlist'
import CustomerNotification from './views/Customer/CustomerNotification'
import CustomerSettings from './views/Customer/Settings'
import Invoice from './views/Customer/Invoice'
import VendorDashboard from './views/vendor/Dashboard'
import VendorProduct from './views/vendor/Products'
import VendorOrders from './views/vendor/Orders'
import VendorOrderDetail from './views/vendor/OrderDetail'
import VendorEarning from './views/vendor/Earning'
import VendorReviews from './views/vendor/Reviews'
import VendorReviewDetail from './views/vendor/ReviewDetail'
import VendorCoupon from './views/vendor/Coupon'
import VendorCouponEdit from './views/vendor/EditCoupon'
import VendorNotification from './views/vendor/Notification'
import VendorSettings from './views/vendor/VendorSettings';
import VendorShop from './views/vendor/Shop';
import VendorAddProduct from './views/vendor/AddProduct';
import VendorUpdateProduct from './views/vendor/UpdateProduct';
//APP.jsx is place that all components meet each other 

function App() {

  //const [count, setCount] = useState(0)
  const [cartCount, setCartCount] = useState()

  const cart_id = CartID()
  const userData = UserData()

  useEffect(() => {
    const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    })
  })



//GPT

  const Layout = ({ children }) => {
    const location = useLocation();
    const isVendorRoute = location.pathname.startsWith('/vendor'); 

    return (
      <>
        
        {!isVendorRoute && (
          <>
            <StoreHeader />
          </>
        )}
        <MainWrapper>{children}</MainWrapper> 
        <StoreFooter /> 
      </>
    );
  };

  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

//GPT



  
  return (


    <CartContext.Provider value={[cartCount, setCartCount]} >

      <BrowserRouter>
        <TopBar />
        <Layout> {/* GPT */}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/create-new-password' element={<CreatePassword />} />
            {/* Store Components */}
            <Route path='/' element={< Product />} />
            <Route path='/detail/:slug/' element={< ProductDetail />} />     {/* :slug in react  /// <slug>  in django */}
            <Route path='/cart/' element={< Cart />} />
            <Route path='/checkout/:order_oid/' element={< Checkout />} />
            <Route path='/payment-success/:order_oid/' element={< PaymentSuccess />} />
            <Route path='/search/' element={< Search />} />
            {/* Account Components */}
            <Route path='/customer/account/' element={<PrivateRoute> < Account /> </PrivateRoute>} />
            <Route path='/customer/orders/' element={<PrivateRoute> < Orders /> </PrivateRoute>} />
            <Route path='/customer/orders/:order_oid/' element={<PrivateRoute> < OrderDetail /> </PrivateRoute>} />
            <Route path='/customer/wishlist/' element={<PrivateRoute> < Wishlist /> </PrivateRoute>} />
            <Route path='/customer/notifications/' element={<PrivateRoute> < CustomerNotification /> </PrivateRoute>} />
            <Route path='/customer/settings/' element={<PrivateRoute> < CustomerSettings /> </PrivateRoute>} />
            <Route path='/customer/invoice/:order_oid/' element={<PrivateRoute> < Invoice /> </PrivateRoute>} />
            {/* Vendor Components */}
            <Route path='/vendor/dashboard/' element={<PrivateRoute> < VendorDashboard /> </PrivateRoute>} />
            <Route path='/vendor/products/' element={<PrivateRoute> < VendorProduct /> </PrivateRoute>} />
            <Route path='/vendor/orders/' element={<PrivateRoute> < VendorOrders /> </PrivateRoute>} />
            <Route path='/vendor/orders/:vendor_id/:order_oid/' element={<PrivateRoute> < VendorOrderDetail /> </PrivateRoute>} />
            <Route path='/vendor/earning/' element={<PrivateRoute> < VendorEarning /> </PrivateRoute>} />
            <Route path='/vendor/reviews/' element={<PrivateRoute> < VendorReviews /> </PrivateRoute>} />
            <Route path='/vendor/reviews/:review_id/' element={<PrivateRoute> < VendorReviewDetail /> </PrivateRoute>} />
            <Route path='/vendor/coupon/' element={<PrivateRoute> < VendorCoupon /> </PrivateRoute>} />
            <Route path='/vendor/coupon/:coupon_id/' element={<PrivateRoute> < VendorCouponEdit /> </PrivateRoute>} />
            <Route path='/vendor/notifications/' element={<PrivateRoute> < VendorNotification /> </PrivateRoute>} />
            <Route path='/vendor/settings/' element={<PrivateRoute> < VendorSettings /> </PrivateRoute>} />
            <Route path='/vendor/:slug/' element={<PrivateRoute> < VendorShop /> </PrivateRoute>} />
            <Route path='/vendor/add-product/' element={<PrivateRoute> < VendorAddProduct /> </PrivateRoute>} />
            <Route path='/vendor/product/update/:pid/' element={<PrivateRoute> < VendorUpdateProduct /> </PrivateRoute>} />

          </Routes>

        </Layout>
      </BrowserRouter>
    </CartContext.Provider >
  )
}

export default App
