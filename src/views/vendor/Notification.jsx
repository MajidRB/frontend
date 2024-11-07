import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';




function Notification() {

    const [notifications, setNotifications] = useState([])
    const [stats, setStats] = useState([])

    const fetchNoti = async () => {
        await apiInstance.get(`vendor/notification/${UserData()?.vendor_id}/`).then((res) => {
            setNotifications(res.data)
        })
    }


    const fetchNotiStats = async () => {
        await apiInstance.get(`vendor/notification-summary/${UserData()?.vendor_id}/`).then((res) => {
            setStats(res.data[0])
        })
    }

    useEffect(() => {
        fetchNoti()
        fetchNotiStats()
    }, [])



    const markAsSeen = async (notiId) => {
        await apiInstance.get(`vendor/notification-mark-seen/${UserData()?.vendor_id}/${notiId}/`).then((res) => {
            console.log(res.data);
            
            fetchNotiStats()
            fetchNoti()
        })
    }





    return (
        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>
                    <div style={styles.container}>
                        <Sidebar />
                        <div style={styles.pageContainer2}>
                            {/* Stats Section */}
                            <div style={styles.statsSection}>
                                <div style={styles.unreadNotification}>
                                    <h3>UN-READ NOTIFICATION</h3>
                                    <p>{stats.un_read_noti}</p>
                                </div>
                                <div style={styles.readNotification}>
                                    <h3>READ NOTIFICATION</h3>
                                    <p>{stats.read_noti}</p>
                                </div>
                                <div style={styles.allNotification}>
                                    <h3>ALL NOTIFICATION</h3>
                                    <p>{stats.all_noti}</p>
                                </div>
                            </div>
                            {/* Notifications Table */}
                            <div style={styles.tableSection}>
                                <h1>Notifications</h1>
                                <table style={styles.table}>
                                    <thead>
                                        <tr style={styles.tableHeader}>
                                            <th style={styles.tableHeaderCell}>Type</th>
                                            <th style={styles.tableHeaderCell}>Message</th>
                                            <th style={styles.tableHeaderCell}>Status</th>
                                            <th style={styles.tableHeaderCell}>Date</th>
                                            <th style={styles.tableHeaderCell}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notifications?.map((n, index) => (

                                            <tr key={index} style={styles.tableRow}>
                                                <td style={styles.tableCell}>New Order</td>
                                                <td style={styles.tableCell}>
                                                    You have got new order for: <b> {n.order_item?.product?.title} </b>
                                                </td>
                                                <td style={styles.tableCell}>
                                                    {n.seen === true &&
                                                        <>
                                                            Read
                                                        </>
                                                    }
                                                    {n.seen === false &&
                                                        <>
                                                            Unread
                                                        </>
                                                    }
                                                </td>
                                                <td style={styles.tableCell}>{moment(n.date).format("MMM DD YYYY")}</td>
                                                <td style={styles.tableCell}>
                                                    <button onClick={() => markAsSeen(n.id)} style={styles.buttonBlue}>
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* More rows can be added here */}
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
    pageContainer2: {
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f0f2f5',
        boxSizing: 'border-box',
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
        fontFamily: 'Arial, sans-serif',

    },
    statsSection: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',

    },
    unreadNotification: {
        backgroundColor: '#f28b82',
        borderRadius: '8px',
        margin: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
    },
    readNotification: {
        backgroundColor: '#81c995',
        borderRadius: '8px',
        margin: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
    },
    allNotification: {
        backgroundColor: '#a6caff',
        borderRadius: '8px',
        margin: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
    },
    tableSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#20232a',
        color: 'white',
    },
    tableHeaderCell: {
        padding: '12px',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #eee',
    },
    tableCell: {
        padding: '12px',
    },
    buttonBlue: {
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
    },
};


export default Notification
