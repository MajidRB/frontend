import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';




function Earning() {

    const [earningStats, setEarningStats] = useState({})
    const [earningStatsTracker, setEarningStatsTracker] = useState([])
    const [earningChart, setEarningChart] = useState([])

    useEffect(() => {
        apiInstance.get(`vendor/earning/${UserData()?.vendor_id}/`).then((res) => {
            setEarningStats(res.data[0]);
        })
        apiInstance.get(`vendor/monthly-earning/${UserData()?.vendor_id}/`).then((res) => {
            setEarningStatsTracker(res.data);
            setEarningChart(res.data)

        })
    }, [])


    const months = earningChart?.map(item => item.month)
    const revenue = earningChart?.map(item => item.total_earning)

    const revenue_data = {
        labels: months,
        datasets: [
            {
                label: "Total Sales Revenue",
                data: revenue,
                fill: true,
                backgroundColor: 'green',
                borderColor: 'green',
            }
        ]
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
                            {/* Cards Section */}
                            <div style={styles.cardsContainer}>
                                <div style={styles.cardTotal}>
                                    <h4>Total Sale:</h4>
                                    <b>${earningStats.total_revenue}</b>
                                </div>
                                <div style={styles.cardMonthly}>
                                    <h4>Monthly Earnings:</h4>
                                    <b>{earningStats.monthly_revenue}</b>
                                </div>
                            </div>
                            {/* ORDERS TABLE  */}
                            <h3 className='mb-3 pb-3'>Revenue Tracker: </h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeader}>
                                        <th>Month</th>
                                        <th>Orders</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {earningStatsTracker?.map((e, index) => (
                                        <tr key={index} style={styles.tableRow} >
                                            {e.month === 1 && <td> January </td>}
                                            {e.month === 2 && <td> February </td>}
                                            {e.month === 3 && <td> March </td>}
                                            {e.month === 4 && <td> April </td>}
                                            {e.month === 5 && <td> May </td>}
                                            {e.month === 6 && <td> June </td>}
                                            {e.month === 7 && <td> July </td>}
                                            {e.month === 8 && <td> August </td>}
                                            {e.month === 9 && <td> September </td>}
                                            {e.month === 10 && <td> October </td>}
                                            {e.month === 11 && <td> November </td>}
                                            {e.month === 12 && <td> December </td>}
                                            <td>{e.sales_count}</td>
                                            <td>
                                                <Link>
                                                    <i className='fas fa-eye'></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/*Chart Section */}
                            <div style={styles.chartSection}>
                                <h2 style={styles.chartTitle}>Chart Analytics</h2>
                                <div style={styles.chartArea}>
                                    <Line data={revenue_data} style={{ height: 300 }} />
                                </div>
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
    cardsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
    },
    cardTotal: {
        flex: '1 1 120px',
        backgroundColor: '#aaff7f',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    cardMonthly: {
        flex: '1 1 120px',
        backgroundColor: '#7fffe3',
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
    chartSection: {
        backgroundColor: 'white',
        padding: '20px',
        border: '10px',
        borderRadius: '8px',
        marginBottom: '30px',
        marginTop: '50px',
        boxShadow: '1px 1px 5px 5px rgba(0, 0, 0, 0.2)'
    },
    chartTitle: {
        margin: '0 0 20px 0'
    },
    chartArea: {
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888'
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

export default Earning
