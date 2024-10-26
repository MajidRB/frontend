
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import MainWrapper from './layout/MainWrapper'
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
import { CartContext } from './views/plugin/Context'
import { useEffect, useState } from 'react'
import CartID from './views/plugin/CartID'
import UserData from './views/plugin/UserData'
import apiInstance from './utils/axios'
import Account from './views/Customer/Account'
import PrivateRoute from './layout/PrivateRoute'
import Orders from './views/Customer/Orders'
import OrderDetail from './views/Customer/OrderDetail'


//APP.jsx is place that all components meet each other 

function App() {

  //const [count, setCount] = useState(0)
  const [cartCount, setCartCount] = useState()

  const cart_id = CartID()
  const userData= UserData()
  
  useEffect(() => {
    const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    })
  })

  return (
    <CartContext.Provider value={[cartCount, setCartCount]} >

    <BrowserRouter>
    <TopBar />
    <StoreHeader />
    <MainWrapper>
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/logout' element = {<Logout />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/forgot-password' element = {<ForgotPassword />} />
        <Route path='/create-new-password' element = {<CreatePassword />} />
        {/* Store Components */}
        <Route path='/' element = {< Product />} />
        <Route path='/detail/:slug/' element = {< ProductDetail />} />     {/* :slug in react  /// <slug>  in django */}
        <Route path='/cart/' element = {< Cart />} />
        <Route path='/checkout/:order_oid/' element = {< Checkout />} />
        <Route path='/payment-success/:order_oid/' element = {< PaymentSuccess />} />
        <Route path='/search/' element = {< Search />} />
        {/* Account Components */}
        <Route path='/customer/account/' element = {<PrivateRoute> < Account /> </PrivateRoute>} />
        <Route path='/customer/orders/' element = {<PrivateRoute> < Orders /> </PrivateRoute>} />
        <Route path='/customer/orders/:order_oid/' element = {<PrivateRoute> < OrderDetail /> </PrivateRoute>} />
      </Routes>
      <StoreFooter/>
    </MainWrapper>
    </BrowserRouter>

    </CartContext.Provider>
  )
}

export default App
