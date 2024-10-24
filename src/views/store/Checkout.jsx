import React, { useState, useEffect } from 'react'
import apiInstance from '../../utils/axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SERVER_URL } from '../../utils/constants'



function Checkout() {

    const [order, setOrder] = useState([])
    const [couponCode, setCouponCode] = useState("")
    const param = useParams()
    const [paymentLoading, setPaymentLoading] = useState(false)

    const fetchOrderData = () => {
        apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
            setOrder(res.data)
        })
    }

    useEffect(() => {
        fetchOrderData()
    }, [])
    console.log("###order is order", order);



    const applyCoupon = async () => {

        const formdata = new FormData()
        formdata.append("order_oid", order.oid)
        formdata.append("coupon_code", couponCode)

        try {
            const response = await apiInstance.post("coupon/", formdata)
            console.log("response data message:", response.data.message);
            Swal.fire({
                icon: response.data.icon,
                title: response.data.message
            })
            fetchOrderData()

        } catch (error) {
            console.log(error);
        }
    }

    const payWithStripe = (event) => {
        setPaymentLoading(true)
        event.target.form.submit()

    }



    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5 ">
                    <div className="col-lg-8 ">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Billing Address</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>First Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={order.full_name}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={order.email}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={order.phone}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Address</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={order.address}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Country</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={order.country}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>City</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={order.city}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>State</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={order.state}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>ZIP Code</label>
                                    <input className="form-control" type="text" value={order.zip_code} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 shadow rounded-3 ">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Order Total</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div>
                                {order?.orderitem && Array.isArray(order.orderitem) ? (
                                    order.orderitem.map((item, index) => (
                                        <div key={index}>
                                            {/* Display relevant information from each item */}
                                            <p>{item.product.title} $ {item.price} qty: {item.cart_qty}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items found in the order.</p>
                                )}
                            </div>
                            <div className="border-bottom pt-3 pb-2  ">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${order.sub_total}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${order.shipping_amount}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>${order.total}</h5>
                                </div>
                            </div>
                            {order.saved !== "0.00" &&
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Saved:</h5>
                                        <h5>-${order?.saved}</h5>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="mb-5 ">
                            <div className='m-6'>
                                <section className='shadow rounded-3 car p-1'>
                                    <h5 className='mb-4'></h5>
                                    <div className='d-flex align-items-center ' >
                                        <input
                                            className='form-control rounded me-4'
                                            type="text" placeholder='promo code'
                                            onChange={(e) => setCouponCode(e.target.value)} />
                                        <button className='btn btn-success btn-rounded ' onClick={applyCoupon}>
                                            Apply Code
                                        </button>
                                    </div>
                                </section>
                            </div>
                            <h5 className="section-title position-relative text-uppercase mb-3 mt-5">
                                <span className="bg-secondary pr-3">Payment</span>
                            </h5>
                            <div className="bg-light p-30">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            id="paypal"
                                        />
                                        <label className="custom-control-label" htmlFor="paypal">
                                            Paypal
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            id="directcheck"
                                        />
                                        <label className="custom-control-label" htmlFor="directcheck">
                                            Direct Check
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            className="custom-control-input"
                                            name="payment"
                                            id="banktransfer"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="banktransfer"
                                        >
                                            Bank Transfer
                                        </label>
                                    </div>
                                </div>
                                {paymentLoading === true &&
                                    <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`}>
                                        <button
                                            onClick={payWithStripe}
                                            disabled
                                            type='submit'
                                            className="btn btn-block btn-primary font-weight-bold py-3"
                                        >
                                            Proccessing... <i className='fas fa-spinner fa-spin'></i>
                                        </button>
                                    </form>
                                }
                                {paymentLoading === false &&
                                    <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`} method='POST'>
                                        <button
                                            onClick={payWithStripe}
                                            type='submit'
                                            className="btn btn-block btn-primary font-weight-bold py-3"
                                        >
                                            Pay With Stripe <i className='fas fa-credit-card'></i>
                                        </button>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
