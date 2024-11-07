import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';



function EditCoupon() {


    const [coupon, setCoupon] = useState([])

    const param = useParams()

    useEffect(() => {
        apiInstance.get(`vendor/coupon-detail/${UserData()?.vendor_id}/${param.coupon_id}/`).then((res) => {
            setCoupon(res.data)
            console.log(res.data);
        })
    }, [])


    const handleCouponChange = (event) => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
        console.log(coupon.code);
        console.log(coupon.discount);
        console.log(coupon.active);
    }


    const handleUpdateCoupon = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('vendor_id', UserData()?.vendor_id)
        formdata.append('code', coupon.code)
        formdata.append('discount', coupon.discount)
        formdata.append('active', coupon.active)

        await apiInstance.patch(`vendor/coupon-detail/${UserData()?.vendor_id}/${param.coupon_id}/`, formdata).then((res) => {
            console.log(res.data);
        })

        Swal.fire({
            icon: 'success',
            title: 'coupon updated successfully'
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
                        <div style={styles.mainContent}></div>
                        <div className="container-fluid" id="main">
                            <div className="row row-offcanvas row-offcanvas-left h-100">
                                <div className="col-md-9 col-lg-10 main mt-4">
                                    <h4 className="mt-3 mb-4">
                                        <i className="bi bi-tag" /> Coupons
                                    </h4>
                                    <form onSubmit={handleUpdateCoupon} className="card shadow p-3">
                                        <div className="mb-3">
                                            <label htmlFor="code" className="form-label">
                                                Code
                                            </label>
                                            <input
                                                placeholder='Enter Coupon Code'
                                                onChange={handleCouponChange}
                                                value={coupon.code}
                                                type="text"
                                                className="form-control"
                                                id="code"
                                                name='code'
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="discount" className="form-label">
                                                Discount
                                            </label>
                                            <input
                                                value={coupon.discount}
                                                onChange={handleCouponChange}
                                                placeholder='Enter discount value '
                                                name='discount'
                                                type="text"
                                                className="form-control"
                                                id="discount"
                                            />
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input
                                                checked={coupon.active}
                                                onChange={handleCouponChange}
                                                name='active' type="checkbox"
                                                className="form-check-input"
                                                id="active" />
                                            <label
                                                className="form-check-label"
                                                htmlFor="exampleCheck1">
                                                Activate
                                            </label>
                                        </div>
                                        <div className='d-flex'>
                                            <button type="submit" className="btn btn-primary ms-2">Update Coupon <i className='fas fa-check-circle'></i></button>

                                            <Link to="/vendor/coupon/" className='btn btn-secondary ms-2'>
                                                <i  className="fas fa-arrow-left "> Go Back </i>
                                            </Link>
                                        </div>
                                    </form>
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

export default EditCoupon
