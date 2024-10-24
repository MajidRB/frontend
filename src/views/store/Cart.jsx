import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom';
import CartID from '../plugin/CartID'
import UserData from '../plugin/UserData'
import GetCurrentAddress from '../plugin/UserCountry';
import Swal from 'sweetalert2'
import { CartContext } from '../plugin/Context';




const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    background: "#fafad2",
})


function Cart() {
    //GPT
    const [showShipping, setShowShipping] = useState(false);
    const toggleShippingAddress = () => {
        setShowShipping(!showShipping);
    };
    //GPT

    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState([])
    const [productQuantity, setProductQuantity] = useState('')

    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setaddress] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")

    const userData = UserData()
    const cart_id = CartID()
    const currentAddress = GetCurrentAddress()
    const navigate = useNavigate()


    const [cartCount, setCartCount] = useContext(CartContext)

    const fetchCartData = (cartId, userId) => {
        const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`
        apiInstance.get(url).then((res) => {
            setCart(res.data)
            setCartCount(res.data.length)
        })
    }
    const fetchCartTotal = (cartId, userId) => {
        const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`
        apiInstance.get(url).then((res) => {
            setCartTotal(res.data)
        })
    }
    if (cart_id !== null || cart_id !== undefined) {
        if (userData !== undefined) {
            useEffect(() => {
                fetchCartData(cart_id, userData?.user_id)
                fetchCartTotal(cart_id, userData?.user_id)
            }, [])

        } else {
            useEffect(() => {
                fetchCartData(cart_id, null)
                fetchCartTotal(cart_id, null)
            }, [])
        }
    }

    useEffect(() => {
        const initialQuantities = {}
        cart.forEach((c) => {
            initialQuantities[c.product?.id] = c.cart_qty
        })
        setProductQuantity(initialQuantities)
    }, [cart])

    const handleQtyChange = (event, product_id) => {
        const quantity = event.target.value

        setProductQuantity((prevQuantity) => ({
            ...prevQuantity,
            [product_id]: quantity
        }))

    }

    const updateCart = async (product_id, price, shipping_amount, color, size) => {
        const qtyValue = productQuantity[product_id]
        const formdata = new FormData()

        formdata.append("product_id", product_id)
        formdata.append("user_id", userData?.user_id)
        formdata.append("cart_id", cart_id)
        formdata.append("cart_qty", qtyValue)
        formdata.append("price", price)
        formdata.append("shipping_amount", shipping_amount)
        formdata.append("country", currentAddress.country)
        formdata.append("size", size)
        formdata.append("color", color)

        const response = await apiInstance.post(`cart-view/`, formdata)

        fetchCartData(cart_id, userData?.user_id)
        fetchCartTotal(cart_id, userData?.user_id)

        Toast.fire({
            icon: "success",
            title: response.data.message,
        })
    }

    const handleDeleteCartItem = async (itemId) => {
        const url = userData?.user_id
            ? `cart-delete/${cart_id}/${itemId}/${userData?.user_id}/`
            : `cart-delete/${cart_id}/${itemId}/`
        try {
            await apiInstance.delete(url)
            fetchCartData(cart_id, userData?.user_id)
            fetchCartTotal(cart_id, userData?.user_id)
            Toast.fire({
                icon: "success",
                title: "Item removed from the cart"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        
        switch (name) {
            case 'full_name':
                setFullName(value)
                break
            
            case 'phone':
                setPhone(value)
                break
        
            case 'email':
                setEmail(value)
                break
        
            case 'address':
                setaddress(value)
                break
            
            case 'country':
                setCountry(value)
                break
        
            case 'state':
                setState(value)
                break
        
            case 'city':
                setCity(value)
                break
        
            case 'zip_code':
                setZipCode(value)
                break
            
            default:
                break
        }

    }

    const createOrder = async () => {
        
        if(!fullName || !phone || !email || !address || !country || !state || !city || !zipCode) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields!!',
                text: 'All field are required before checkout'
            })
        } else {

            try {
                const formdata =  new FormData()
                formdata.append("full_name", fullName)
                formdata.append("phone", phone)
                formdata.append("email", email)
                formdata.append("address", address)
                formdata.append("country", country)
                formdata.append("state", state)
                formdata.append("city", city)
                formdata.append("zip_code", zipCode)
                formdata.append("cart_id", cart_id)
                formdata.append("user_id", userData ? userData?.user_id : 0)

                const response = await apiInstance.post(`create-order/`, formdata)
                console.log(response.data.message);

                navigate(`/checkout/${response.data.order_oid}/`)

            } catch (error) {
                console.log(error);
            }
        
        }
    }

    /* //GPT
    const handleIncrement = (index) => {
        const updatedCart = [...cart]; // ساخت نسخه‌ای از سبد خرید
        updatedCart[index].cart_qty += 1; // افزایش تعداد محصول خاص
        setCart(updatedCart); // ذخیره‌ی سبد به‌روز شده در state
    }; */

    return (
        <>
            {/* <!-- Cart Start --> */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        {/* Tabel of content */}
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '10px', minWidth: '10px', maxWidth: '15px' }}>rows</th>
                                    <th>Products</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle"   >
                                {cart?.map((c, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '10px', minWidth: '10px', maxWidth: '15px' }}> <p>{index + 1}</p> </td>
                                        <td className="align-middle" style={{ width: '200px', padding: '6px' }}>
                                            <Link to={`/detail/${c.product?.slug}/`}>
                                                <img
                                                    src={c.product?.image}
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '10px'
                                                    }} /></Link>
                                            <h6>{c.product?.title}</h6>
                                        </td>
                                        <td className="align-middle">{c.size}</td>
                                        <td className="align-middle">{c.color}</td>
                                        <td className="align-middle">${c.product?.price}</td>
                                        <td className="align-middle">
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm border-1"
                                                    style={{
                                                        width: '60px',
                                                        height: '30px',
                                                        padding: '2px 5px',
                                                        fontSize: '16px',
                                                        textAlign: 'center'
                                                    }}
                                                    defaultValue={productQuantity[c.product?.id] || c.cart_qty}
                                                    min={1}
                                                    onChange={(e) => handleQtyChange(e, c.product.id)}
                                                />
                                                <button
                                                    style={{
                                                        marginLeft: '5px',
                                                        padding: '2px 8px',
                                                    }}
                                                    onClick={() =>
                                                        updateCart(
                                                            c.product?.id,
                                                            c.product.price,
                                                            c.product.shipping_amount,
                                                            c.color,
                                                            c.size,)}
                                                    className='btn btn-primary ms-2'>
                                                    Update
                                                    <i className='fas fa-rotate-right ms-1'></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="align-middle">${c.product?.price * c.cart_qty}</td>
                                        <td className="align-middle">
                                            <button onClick={() => handleDeleteCartItem(c.id)} className="btn btn-sm btn-danger">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* end of table */}
                        {/* SHIPPING AND INFO */}
                        <div className="container-fluid">
                            <div className="row px-xl-5">
                                <div className="col-lg-8">
                                    <h5 className="section-title position-relative text-uppercase mb-3">
                                        <span className="bg-secondary pr-3">Billing Address</span>
                                    </h5>
                                    <div className="bg-light p-30 mb-5">
                                        <div className="row">
                                            <div className="col-md-6 form-group ">
                                                <label>Full Name</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="John"
                                                    onChange={handleChange}
                                                    name='full_name'
                                                    value={fullName}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>E-mail</label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="example@email.com"
                                                    onChange={handleChange}
                                                    name='email'
                                                    value={email}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Mobile No</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="+123 456 789"
                                                    onChange={handleChange}
                                                    name='phone'
                                                    value={phone}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Address Line 1</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="123 Street"
                                                    onChange={handleChange}
                                                    name='address'
                                                    value={address}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Country</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="United States"
                                                    onChange={handleChange}
                                                    name='country'
                                                    value={country}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>City</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="New York"
                                                    onChange={handleChange}
                                                    name='city'
                                                    value={city}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>State</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="New York"
                                                    onChange={handleChange}
                                                    name='state'
                                                    value={state}
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>ZIP Code</label>
                                                <input 
                                                className="form-control" 
                                                type="number" 
                                                placeholder="123"
                                                onChange={handleChange}
                                                    name='zip_code'
                                                    value={zipCode}
                                                />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="newaccount"
                                                    />
                                                    <label className="custom-control-label" htmlFor="newaccount">
                                                        Create an account
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="shipto"
                                                        onChange={toggleShippingAddress}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="shipto"
                                                    >
                                                        Ship to different address
                                                    </label>
                                                </div>
                                            </div>
                                            {showShipping && (
                                                <div className="mb-5" id="shipping-address">
                                                    <h5 className="section-title position-relative text-uppercase mb-3 mt-3">
                                                        <span className="bg-secondary pr-3">Shipping Address</span>
                                                    </h5>
                                                    <div className="bg-light p-30">
                                                        <div className="row">
                                                            <div className="col-md-6 form-group ">
                                                                <label>Full Name</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="John"
                                                                />
                                                            </div>

                                                            <div className="col-md-6 form-group">
                                                                <label>E-mail</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="example@email.com"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>Mobile No</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="+123 456 789"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>Address Line 1</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="123 Street"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>Address Line 2</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="123 Street"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>Country</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="United States"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>City</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="New York"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>State</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="New York"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label>ZIP Code</label>
                                                                <input className="form-control" type="text" placeholder="123" />
                                                            </div>
                                                            {/* Add the rest of your fields here */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* SHIPPING AND INFO END */}
                    </div>
                    {/* checkout info */}
                    <div className="col-lg-4">
                        
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Cart Summary</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${cartTotal.sub_total?.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${cartTotal.shipping?.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Tax fee</h6>
                                    <h6 className="font-weight-medium">${cartTotal.tax?.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">service fee:</h6>
                                    <h6 className="font-weight-medium">${cartTotal.service_fee?.toFixed(2)}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>${cartTotal.total?.toFixed(2)}</h5>
                                </div>
                                <button onClick={createOrder} className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                    {/* checkout info end */}
                </div>
            </div>

            {/* <!-- Cart End --> */}
        </>
    )
}

export default Cart
