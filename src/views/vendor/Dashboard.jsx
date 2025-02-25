import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import userData from '../plugin/UserData'
import { Line, Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [stats, setStats] = useState({})
    const [orderChartData, setOrderChartData] = useState([])
    const [productsChartData, setProductsChartData] = useState([])

    const [products, setProducts] = useState([])

    useEffect(() => {
        apiInstance.get(`vendor/stats/${userData()?.vendor_id}/`).then((res) => {
            setStats(res.data[0])

        })

        apiInstance.get(`vendor/products/${UserData()?.vendor_id}/`).then((res) => {
            setProducts(res.data)

        })
    }, [])



    const fetchChartData = async () => {
        const order_chart_response = await apiInstance.get(`vendor-orders-chart/${userData()?.vendor_id}/`)
        setOrderChartData(order_chart_response.data)

        const order_products_response = await apiInstance.get(`vendor-product-chart/${userData()?.vendor_id}/`)
        setProductsChartData(order_products_response.data)

    }

    useEffect(() => {
        fetchChartData()
    }, [])

    const order_month = orderChartData?.map(item => item.month)
    const order_counts = orderChartData?.map(item => item.orders)

    const product_month = productsChartData?.map(item => item.month)
    const product_counts = productsChartData?.map(item => item.products)


    const order_data = {
        labels: order_month,
        datasets: [
            {
                label: "Total Orders",
                data: order_counts,
                fill: true,
                backgroundColor: 'green',
                borderColor: 'green',
            }
        ]
    }

    const product_data = {
        labels: product_month,
        datasets: [
            {
                label: "Total Products",
                data: product_counts,
                fill: true,
                backgroundColor: 'blue',
                borderColor: 'blue',
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
                            {/*Stats Cards */}
                            <div style={styles.statsContainer}>
                                <div style={styles.statsCardGreen}>
                                    <div style={styles.statsLabel}>PRODUCTS</div>
                                    <div style={styles.statsNumber}>{stats?.products}</div>
                                </div>
                                <div style={styles.statsCardRed}>
                                    <div style={styles.statsLabel}>ORDERS</div>
                                    <div style={styles.statsNumber}>{stats?.orders}</div>
                                </div>
                                <div style={styles.statsCardBlue}>
                                    <div style={styles.statsLabel}>CUSTOMERS</div>
                                    <div style={styles.statsNumber}>###</div>
                                </div>
                                <div style={styles.statsCardYellow}>
                                    <div style={styles.statsLabel}>REVENUE</div>
                                    <div style={styles.statsNumber}>${stats?.revenue}</div>
                                </div>
                            </div>

                            {/*Chart Section */}
                            <div style={styles.chartSection}>
                                <h2 style={styles.chartTitle}>Chart Analytics</h2>
                                <div style={styles.chartArea}>
                                    <Line data={order_data} style={{ height: 300 }} />
                                    <Line data={product_data} style={{ height: 300 }} />
                                </div>
                            </div>


                            {/*Products Table */}
                            <div style={styles.tableSection}>
                                <div style={styles.tableNav}>
                                    <span style={styles.tableNavItem}>Products</span>
                                    <span style={styles.tableNavItem}>Orders</span>
                                </div>
                                <table style={styles.table}>
                                    <thead>
                                        <tr style={styles.tableHeader}>
                                            <th style={styles.tableHeaderCell}>image</th>
                                            <th style={styles.tableHeaderCell}>Name</th>
                                            <th style={styles.tableHeaderCell}>Price</th>
                                            <th style={styles.tableHeaderCell}>Quantity</th>
                                            <th style={styles.tableHeaderCell}>Orders</th>
                                            <th style={styles.tableHeaderCell}>Status</th>
                                            <th style={styles.tableHeaderCell}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((p, index) => (
                                            <tr style={styles.tableRow} key={index}>
                                                <td style={styles.tableCell}> <img src={p.image} style={{ borderRadius: '5px', width: '30px', height: '30px' }} /> </td>
                                                <td style={styles.tableCell}>{p.title}</td>
                                                <td style={styles.tableCell}>${p.price}</td>
                                                <td style={styles.tableCell}>{p.stock_qty}</td>
                                                <td style={styles.tableCell}>{p.orders}</td>
                                                <td style={styles.tableCell}>{p.status.toUpperCase()}</td>
                                                <td style={styles.tableCell}>
                                                    <Link>
                                                    <button style={styles.buttonBlue}>
                                                        View
                                                    </button>
                                                    </Link>
                                                    <Link>
                                                    <button style={styles.buttonGreen}>
                                                        Edit
                                                    </button>
                                                    </Link>
                                                    <Link>
                                                    <button style={styles.buttonRed}>
                                                        Delete
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


export default Dashboard
