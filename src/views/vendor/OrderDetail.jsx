import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';







function OrderDetail() {

    const [order, setOrder] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const param = useParams()

    useEffect(() => {
        apiInstance.get(`vendor/orders/${UserData()?.vendor_id}/${param.order_oid}/`).then((res) => {
            setOrder(res.data);
            setOrderItems(res.data.orderitem)
        })
    }, [])


    





    return (
        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>
                    <div style={styles.container}>

                        {/*Sidebar */}
                        <Sidebar />

                        {/*Main Content */}
                        <div style={styles.mainContent}>

                            {/* Cards Section */}
                            <div style={styles.cardsContainer}>
                                <div style={styles.cardOrder}>
                                    <h4>Total</h4>
                                    <p>${order.total}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Payment Status</h4>
                                    <p>{order?.payment_status?.toUpperCase()}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Order Status</h4>
                                    <p>{order?.order_status?.toUpperCase()}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Shipping Amount</h4>
                                    <p>${order.shipping_amount}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Tax Fee</h4>
                                    <p>${order.tax_fee}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Service Fee</h4>
                                    <p>${order.service_fee}</p>
                                </div>
                                <div style={styles.cardOrder}>
                                    <h4>Discount Fee</h4>
                                    <p className='text-success'>${order.saved || 0}</p>
                                </div>
                            </div>
                            {/* ORDERS TABLE  */}
                            <h3 className='mb-3 pb-3'>Order ID: <b>#{order.oid}</b> </h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems?.map((orderItems, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={orderItems.product?.image} alt="Product" style={styles.productImage} />
                                                {orderItems.product?.title}
                                            </td>
                                            <td>{moment(order.date).format("MMM D YYYY")}</td>
                                            <td>${orderItems.product?.price}</td>
                                            <td>{orderItems.cart_qty}</td>
                                            <td>${orderItems.sub_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const styles = {
    pageContainer: {
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
        boxSizing: 'border-box'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        minHeight: '90vh',
        fontFamily: 'Arial, sans-serif'
    },

    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f8f9fa'
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
    },
    cardOrder: {
        flex: '1 1 120px',
        backgroundColor: '#e6f7ff',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    statsContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
    },
    statsCardGreen: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#198754',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    statsCardRed: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#dc3545',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    statsCardBlue: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#0dcaf0',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    statsCardYellow: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#ffc107',
        color: 'black',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    statsLabel: {
        fontSize: '14px'
    },
    statsNumber: {
        fontSize: '32px'
    },
    chartSection: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    chartTitle: {
        margin: '0 0 20px 0'
    },
    chartArea: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888'
    },
    tableSection: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    productImage: {
        width: '80px',
        height: 'auto',
        verticalAlign: 'middle',
        marginRight: '8px',
    },
    tableNav: {
        marginBottom: '20px'
    },
    tableNavItem: {
        marginRight: '20px',
        color: '#666',
        cursor: 'pointer',
        padding: '5px 0',
        position: 'relative',
        ':hover': {
            color: '#000'
        }
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        backgroundColor: '#20232a',
        color: 'white'
    },
    tableHeaderCell: {
        padding: '12px',
        textAlign: 'left'
    },
    tableRow: {
        borderBottom: '1px solid #eee',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#f8f9fa'
        }
    },
    tableCell: {
        padding: '12px'
    },
    buttonBlue: {
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        marginRight: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#0b5ed7'
        }
    },
    buttonGreen: {
        backgroundColor: '#198754',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        marginRight: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#157347'
        }
    },
    buttonRed: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#bb2d3b'
        }
    }
};


export default OrderDetail
