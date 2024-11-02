import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';





function Reviews() {


    const [reviews, setReviews] = useState([])

    useEffect(() => {
        apiInstance.get(`vendor/reviews/${UserData()?.vendor_id}/`).then((res) => {
            setReviews(res.data);
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
                            <h2>⭐ Reviews and Rating</h2>
                            <div className="mb-3">
                                {/* button filter */}
                                {/* <div className='btn-group'>
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
                                            <a className='dropdown-item' >
                                                ALL
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Payment Status: paid
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Payment Status: pending
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Payment Status: processing
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Payment Status: cancelled
                                            </a>
                                        </li>
                                        <li>
                                            <hr />
                                            <a className='dropdown-item' >
                                                Date: latest
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Date: oldest
                                            </a>
                                            <hr />
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Order Status: pending
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Order Status: fulfilled
                                            </a>
                                        </li>
                                        <li>
                                            <a className='dropdown-item' >
                                                Order Status: cancelled
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                            {/* REVIEWS SECTION */}
                            <div
                                className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                                style={{
                                    backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)`,
                                    maxHeight: '800px', // ارتفاع ثابت
                                    overflowY: 'auto'   // فعال کردن اسکرول عمودی

                                }}
                                overflow='auto'
                            >
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-md-10">
                                        {reviews?.map((r, index) => (
                                            <div key={index} className="card mt-3 mb-3">
                                                <div className="card-body m-3">
                                                    <div className="row">
                                                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                                            <img
                                                                src={r.profile.image}
                                                                className="rounded-circle img-fluid shadow-1"
                                                                alt={r.profile.full_name}
                                                                style={{
                                                                    width: "150px",
                                                                    height: "150px",
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <p className="text-dark fw-bold mb-4">Review:</p>
                                                            <p>
                                                                {r.review}
                                                            </p>
                                                            <p className="text-dark fw-bold mb-1">Reply:</p>
                                                            <p>
                                                                {r.reply === null /* "" kodom ro barmigardone belakhare??? */
                                                                    ? <p>No reply yet!</p>
                                                                    : (r.reply)
                                                                }
                                                            </p>
                                                            <p className="fw-bold text-dark mb-2">
                                                                <strong>Name:</strong> {r.profile.full_name}
                                                            </p>
                                                            <p className="fw-bold text-dark mb-2">
                                                                <strong>Product:</strong> {r.product?.title}
                                                            </p>
                                                            <p className="fw-bold text-dark mb-2">
                                                                <strong>Rating: </strong>
                                                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                                                    <small
                                                                        key={starIndex}
                                                                        className={starIndex < r.rating ? "fas fa-star text-primary" : "far fa-star text-primary"}
                                                                    ></small>
                                                                ))}
                                                            </p>
                                                            <Link to={`/vendor/reviews/${r.id}/`}>
                                                                <button className="btn btn-primary me-2">Reply</button>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
        boxSizing: 'border-box',

    },
    card: {
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',

    },
    container: {
        display: 'flex',
        minHeight: '90vh',
        fontFamily: 'Arial, sans-serif',

    },

    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f8f9fa',


    },
};


export default Reviews
