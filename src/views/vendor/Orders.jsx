import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';




function Orders() {

    const [orders, setOrders] = useState([])


    useEffect(() => {
        apiInstance.get(`vendor/orders/${UserData()?.vendor_id}/`).then((res) => {
            setOrders(res.data);
        })
    }, [])




    const handleFilterOrders = async (filter) => {
        const response = await apiInstance.get(`/vendor/orders/filter/${UserData()?.vendor_id}?filter=${filter}`)
        setOrders(response.data)




    }



    return (
        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>
                    <div style={styles.container}>

                        {/*Sidebar */}
                        <Sidebar />

                        {/*Main Content */}
                        <div style={styles.mainContent}>
                            {/* button filter */}
                            <div className='btn-group'>
                                <button
                                    className='btn btn-primary dropdown-toggle'
                                    type='button'
                                    id='dropdownMenuClickable'
                                    data-bs-toggle='dropdown'
                                    data-bs-auto-close='true'
                                    aria-expanded='false'
                                >
                                    Filter By:
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuClickable'>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("all")}>
                                            ALL
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("paid")}>
                                            Payment Status: paid
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("pending")}>
                                            Payment Status: pending
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("processing")}>
                                            Payment Status: processing
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("cancelled")}>
                                            Payment Status: cancelled
                                        </a>
                                    </li>
                                    <li>
                                        <hr />
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("latest")}>
                                            Date: latest
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("oldest")}>
                                            Date: oldest
                                        </a>
                                        <hr />
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("pending")}>
                                            Order Status: pending
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("fulfilled")}>
                                            Order Status: fulfilled
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => handleFilterOrders("cancelled")}>
                                            Order Status: cancelled
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* ORDERS TABLE  */}
                            <div style={styles.tableSection}>
                                <h1 className='pb-2'> Orders <i className='fas fa-order'></i></h1>
                                <table style={styles.table}>
                                    <thead>
                                        <tr style={styles.tableHeader}>
                                            <th style={styles.tableHeaderCell}>Order ID</th>
                                            <th style={styles.tableHeaderCell}>Total</th>
                                            <th style={styles.tableHeaderCell}>Payment Status</th>
                                            <th style={styles.tableHeaderCell}>Order Status</th>
                                            <th style={styles.tableHeaderCell}>Date</th>
                                            <th style={styles.tableHeaderCell}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((o, index) => (
                                            <tr style={styles.tableRow} key={index}>
                                                <td style={styles.tableCell}>{o?.oid}</td>
                                                <td style={styles.tableCell}>$ {o?.total}</td>
                                                <td style={styles.tableCell}>{o.payment_status?.toUpperCase()}</td>
                                                <td style={styles.tableCell}>{o.order_status?.toUpperCase()}</td>
                                                <td style={styles.tableCell}>{moment(o.date).format("MMM DD YYYY")}</td>
                                                <td style={styles.tableCell}>
                                                    <Link to={`/vendor/orders/${UserData()?.vendor_id}/${o.oid}/`}>
                                                        <button style={styles.buttonBlue}>
                                                            View <i className='fas fa-eye ms-1'></i>
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
    dropdownContainer: {
        position: 'relative',
        display: 'inline-block',
    },
    dropdownButton: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    dropdownMenu: {
        display: 'flex',
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        zIndex: 1,
    },
    dropdownItem: {
        padding: '10px 15px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    tableSection: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    tableNav: {
        marginBottom: '20px'
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
};



export default Orders
