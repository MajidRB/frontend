import { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';




function Orders() {

    const [orders, setOrders] = useState([])
    const userData = UserData()

    useEffect(() => {
        apiInstance.get(`customer/orders/${userData?.user_id}/`).then((res) => {
            setOrders(res.data)
        })
    }, [])

    const statusCounts = orders.reduce((counts, order) => {
        const status = order.order_status
        counts[status] = (counts[status] || 0) + 1
        return counts

    }, {})


    return (


        <div className='card p-3 rounded-3 shadow'>
            <h2>Your Orders <i className='fas fa-shopping-cart'></i> </h2>
            <div className="card-container" style={styles.cardContainer}>
                <div style={styles.card}>
                    <h3>Orders</h3>
                    <p>{orders.length || 0}</p> {/* تعداد کل سفارش‌ها */}
                </div>
                <div style={styles.card} >
                    <h3>Pending Delivery</h3>
                    <p> {statusCounts.pending || 0}   {/* {orders.filter(order => order.order_status === 'pending').length} */}</p> {/* تعداد سفارش‌های در حال انجام */}
                </div>
                <div style={styles.card}>
                    <h3>Fulfilled Orders</h3>
                    <p> {statusCounts.fulfilled || 0}    {/* {orders.filter(order => order.order_status === 'fulfilled').length} */}</p> {/* تعداد سفارش‌های تکمیل شده */}
                </div>
            </div>
            <table style={styles.table}>
                <thead style={styles.th}>
                    <tr>
                        <th>Order ID</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr style={styles.td} key={order.id}>
                            <td> <b>#{order.oid}</b> </td>
                            <td>{order.payment_status.toUpperCase()}</td>
                            <td>{order.order_status.toUpperCase()}</td>
                            <td>$ {order.total}</td>
                            <td>{moment(order.date).format("MMM D YYYY")}</td>
                            <td> <Link to={`/customer/orders/${order.oid}/`} >  View <i className='fas fa-eye '> </i> </Link> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {

    cardContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    card: {
        flex: '1',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#e6e6e6', 
        textAlign: 'center',
        margin: '0 10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },


    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '30px',
        marginBottom: '20px',
    },
    th: {
        backgroundColor: '#e6e6e6',
        padding: '10px',
        borderBottom: '15px solid #e6e6e6',


    },
    td: {
        padding: '10px',
        borderBottom: '25px solid #FFFFFF',


    },
};

export default Orders;
