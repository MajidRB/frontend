import React ,{ useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router-dom';





function OrderDetail() {



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

    console.log( "order:", order);
    



    return (



        <div style={styles.container}>
            <h2>#{order.oid}</h2>

            {/* Cards Section */}
            <div style={styles.cardsContainer}>
                <div style={styles.card}>
                    <h4>Total</h4>
                    <p>${order.total}</p>
                </div>
                <div style={styles.card}>
                    <h4>Payment Status</h4>
                    <p>{order?.payment_status?.toUpperCase()}</p>
                </div>
                <div style={styles.card}>
                    <h4>Order Status</h4>
                    <p>{order?.order_status?.toUpperCase()}</p>
                </div>
                <div style={styles.card}>
                    <h4>Shipping Amount</h4>
                    <p>${order.shipping_amount}</p>
                </div>
                <div style={styles.card}>
                    <h4>Tax Fee</h4>
                    <p>${order.tax_fee}</p>
                </div>
                <div style={styles.card}>
                    <h4>Service Fee</h4>
                    <p>${order.service_fee}</p>
                </div>
                <div style={styles.card}>
                    <h4>Discount Fee</h4>
                    <p className='text-success'>${order.saved || 0}</p>
                </div>
            </div>

            {/* Order Table */}
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



    )
}


const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
    },
    card: {
        flex: '1 1 120px',
        backgroundColor: '#e6f7ff',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    productImage: {
        width: '80px',
        height: 'auto',
        verticalAlign: 'middle',
        marginRight: '8px',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
    tableCell: {
        padding: '12px',
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
    },
};


export default OrderDetail
