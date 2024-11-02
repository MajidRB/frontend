import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CartID from '../plugin/CartID'
import UserData from '../plugin/UserData'
import apiInstance from '../../utils/axios'
import { CartContext } from '../plugin/Context'



function StoreHeader() {


    const cartCount = useContext(CartContext)





/* 
    const [cart, setCart] = useState([])
    const cart_id = CartID()
    const userData = UserData()

    const fetchCartData = (cartId, userId) => {
        const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`
        apiInstance.get(url).then((res) => {
            setCart(res.data)
        })
    }

    useEffect(() => {
        if (cart_id != null) {
            if (userData !== undefined) {
                fetchCartData(cart_id, userData.user_id);
            } else {
                fetchCartData(cart_id, null);
            }
        }
    }, [cart_id]); // فقط به cart_id وابسته باشید
 */







    return (

        <div style={{ backgroundColor: '#f8f9fa', marginBottom: '30px' }} className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <button
                        style={{
                            height: '60px',
                            padding: '0 30px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            width: '100%',
                            border: 'none'
                        }}
                        onClick={() =>
                            document.getElementById('navbar-vertical').classList.toggle('collapse')}
                    >
                        <h6 style={{ margin: 0 }}>
                            <i className="fa fa-bars" style={{ marginRight: '10px' }}></i> Categories
                        </h6>
                        <i className="fa fa-angle-down text-light"></i>
                    </button>
                    <nav
                        className="collapse position-absolute navbar navbar-light align-items-start p-0"
                        id="navbar-vertical"
                        style={{ width: 'calc(100% - 30px)', zIndex: 999, backgroundColor: '#f8f9fa' }}
                    >
                        <div className="navbar-nav w-100">
                            <div className="nav-item dropdown dropright">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1"></i></a>
                                <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                    <a href="" className="dropdown-item">Men's Dresses</a>
                                    <a href="" className="dropdown-item">Women's Dresses</a>
                                    <a href="" className="dropdown-item">Baby's Dresses</a>
                                </div>
                            </div>
                            <a href="" className="nav-item nav-link">Shirts</a>
                            <a href="" className="nav-item nav-link">Jeans</a>
                            <a href="" className="nav-item nav-link">Swimwear</a>
                            <a href="" className="nav-item nav-link">Sleepwear</a>
                            <a href="" className="nav-item nav-link">Sportswear</a>
                            <a href="" className="nav-item nav-link">Jumpsuits</a>
                            <a href="" className="nav-item nav-link">Blazers</a>
                            <a href="" className="nav-item nav-link">Jackets</a>
                            <a href="" className="nav-item nav-link">Shoes</a>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0 px-0" style={{ backgroundColor: '#f8f9fa' }}>
                        <a href="" className="text-decoration-none d-block d-lg-none">
                            <span style={{
                                fontSize: '1.5rem',
                                textTransform: 'uppercase',
                                color: 'light',
                                backgroundColor: '#f8f9fa',
                                padding: '0 5px'
                            }}>Multi</span>
                            <span style={{
                                fontSize: '1.5rem',
                                textTransform: 'uppercase',
                                color: 'light',
                                backgroundColor: '#007bff',
                                padding: '0 5px',
                                marginLeft: '-5px'
                            }}>Shop</span>
                        </a>
                        <button
                            type="button"
                            style={{ border: 'none', backgroundColor: 'transparent' }}
                            onClick={() => document.getElementById('navbarCollapse').classList.toggle('collapse')}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <a href="/" className="nav-item nav-link active">Home</a>
                                <a href="/register" className="nav-item nav-link">Register</a>
                                <a href="/login" className="nav-item nav-link">Login</a>
                                <a href="/logout" className="nav-item nav-link">Logout</a>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages {/* <i className="fa fa-angle-down mt-1"></i> */}</a>
                                    <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                        <a href="cart.html" className="dropdown-item">Shopping Cart</a>
                                        <a href="checkout.html" className="dropdown-item">Checkout</a>
                                    </div>
                                </div>
                                <a href="contact.html" className="nav-item nav-link">Contact</a>
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                <Link to="/wishlist/" className="btn px-0">
                                    <i className="fas fa-heart text-primary"></i>
                                    <span className="badge text-secondary border border-secondary rounded-circle mx-2" style={{ paddingBottom: '2px' }}>0</span>
                                </Link>
                                <Link to="/cart/" className="btn px-0 ml-3">
                                    <i className="fas fa-shopping-cart text-primary"></i>
                                    <span className="badge text-secondary border border-secondary rounded-circle mx-2" style={{ paddingBottom: '2px' }}>{cartCount}</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>


    )
}

export default StoreHeader


