import React, { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router-dom';









function Invoice() {

    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const userData = UserData()
    const param = useParams()

    useEffect(() => {
        apiInstance.get(`customer/order/${userData?.user_id}/${param.order_oid}/`).then((res) => {
            setOrder(res.data)
            setOrderItems(res.data.orderitem)
        })
    }, [])

    console.log("order:", order);





    return (
        <div className="container my-5 card p-3 rounded-3 shadow">
            <div className="row mb-4">
                {/* اطلاعات فروشنده */}
                <div className="col-md-6">
                    <h3>Desphixs</h3>
                    <p><strong>+1 3649-6589</strong></p>
                    <p>company@gmail.com</p>
                    <p>123 Main Street</p>
                </div>

                {/* اطلاعات مشتری */}
                <div className="col-md-6 text-end">
                    <h5>Customer Details</h5>
                    <p><strong>{order.full_name}</strong></p>
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                    <p>INVOICE ID #{order.oid}</p>
                </div>
            </div>

            {/* جدول محصولات */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Sub Total</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems?.map((orderItems, index) => (
                        <tr key={index}>
                            <td>{orderItems.product?.title}</td>
                            <td>${orderItems.price}</td>
                            <td>{orderItems.cart_qty}</td>
                            <td>${orderItems.sub_total}</td>
                            <td>${orderItems.saved}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row">
                {/* خلاصه پرداخت */}
                <div className="col-md-6 offset-md-6">
                    <h5>Summary</h5>
                    <p>Sub Total: <span className="float-end">${order.sub_total}</span></p>
                    <p>Shipping: <span className="float-end">${order.shipping_amount}</span></p>
                    <p>Tax: <span className="float-end">${order.tax_fee}</span></p>
                    <p>Service Fee: <span className="float-end">${order.service_fee}</span></p>
                    <hr />
                    <p><strong>Total: <span className="float-end">${order.total}</span></strong></p>
                </div>
            </div>

            {/* دکمه پرینت */}
            <div className="text-center mt-4">
                <button className="btn btn-dark" onClick={() => window.print()}>
                    <i className="fas fa-print"></i> Print
                </button>
            </div>
        </div>
    )
}

export default Invoice
