import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


function Coupon() {

    const [stats, setStats] = useState([])
    const [coupons, setCoupons] = useState([])
    const [createCoupon, setCreateCoupon] = useState({
        code: "",
        discount: "",
        active: true
    })


    const fetchCouponData = async () => {
        await apiInstance.get(`vendor/coupon-stats/${UserData()?.vendor_id}/`).then((res) => {
            setStats(res.data[0]);
        })
        await apiInstance.get(`vendor/coupon-list/${UserData()?.vendor_id}/`).then((res) => {
            setCoupons(res.data);
        })
    }


    useEffect(() => {
        fetchCouponData()
    }, [])


    const handleDeleteCoupon = async (couponId) => {
        await apiInstance.delete(`vendor/coupon-detail/${UserData()?.vendor_id}/${couponId}/`)
        fetchCouponData()
        Swal.fire({
            icon: 'success',
            title: 'coupon deleted successfully'
        })
    }


    const handleCouponChange = (event) => {
        setCreateCoupon({
            ...createCoupon,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
        console.log(createCoupon.code);
        console.log(createCoupon.discount);
        console.log(createCoupon.active);
    }


    const handleCreateCoupon = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('vendor_id', UserData()?.vendor_id)
        formdata.append('code', createCoupon.code)
        formdata.append('discount', createCoupon.discount)
        formdata.append('active', createCoupon.active)

        await apiInstance.post(`vendor/coupon-list/${UserData()?.vendor_id}/`, formdata).then((res) => {
            console.log(res.data);
        })
        fetchCouponData()
        Swal.fire({
            icon: 'success',
            title: 'coupon added successfully'
        })
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
                                    <h4>Total Coupons:</h4>
                                    <b>there is {stats.total_coupons} coupon</b>
                                </div>
                                <div style={styles.cardMonthly}>
                                    <h4> Active Coupons:</h4>
                                    <b>{stats.active_coupons} coupon is active</b>
                                </div>
                            </div>
                            {/* ORDERS TABLE  */}
                            <h3 className='mb-3 pb-3'>Revenue Tracker: </h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeader}>
                                        <th>Code</th>
                                        <th>Type</th>
                                        <th>Discount</th>
                                        <th>status</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons?.map((c, index) => (
                                        <tr key={index} style={styles.tableRow} >
                                            <td> {c.code} </td>
                                            <td>Percentage</td>
                                            <td>{c.discount}%</td>
                                            {c.active === true
                                                ? 'Active'
                                                : 'Inactive'
                                            }
                                            <td>
                                                
                                                <Link to={`/vendor/coupon/${c.id}`} className='btn btn-primary mb-1 ms-2'>
                                                    <i className='fas fa-edit' />
                                                </Link>
                                                <Link onClick={() => handleDeleteCoupon(c.id)} className='btn btn-danger mb-1 ms-2'>
                                                    <i className='fas fa-trash' />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {coupons.length < 1 &&
                                        <h4>No Coupon</h4>
                                    }

                                    {/* MODAL */}
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className='fas fa-plus'></i> Create Coupon
                                    </button>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    {/* FORM MODAL */}
                                                    <form onSubmit={handleCreateCoupon}>
                                                        <div className="mb-3">
                                                            <label htmlFor="code" className="form-label"> Code </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='code'
                                                                onChange={handleCouponChange}
                                                                value={createCoupon.code}
                                                                id="code"
                                                                placeholder='Enter Coupon Code Here...'
                                                            />

                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="discount" className="form-label"> Discount </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='discount'
                                                                onChange={handleCouponChange}
                                                                value={createCoupon.discount}
                                                                id="discount"
                                                                placeholder='enter the discount amount eg: 20'
                                                            />

                                                        </div>

                                                        <div className="mb-3 form-check">
                                                            <input checked={createCoupon.active} onChange={handleCouponChange} name='active' type="checkbox" className="form-check-input" id="active" />
                                                            <label className="form-check-label" htmlFor="exampleCheck1">Activate</label>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Create Coupon</button>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


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

export default Coupon
