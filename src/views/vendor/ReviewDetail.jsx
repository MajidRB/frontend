import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { useParams } from 'react-router-dom';





function ReviewDetail() {


    const [review, setReview] = useState({})
    const [updateReview, setUpdateReview] = useState({ reply: '' })

    const param = useParams()

    useEffect(() => {
        apiInstance.get(`vendor/reviews/${UserData()?.vendor_id}/${param.review_id}/`).then((res) => {
            setReview(res.data);
            console.log(res.data);

        })
    }, [])



    const handleReplyChange = (event) => {
        setUpdateReview({
            ...updateReview,
            [event.target.name]: event.target.value
        })
        
    }

    const handleReplySubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('reply', updateReview.reply)

        await apiInstance.patch(`vendor/reviews/${UserData()?.vendor_id}/${param.review_id}/`, formdata).then((res) =>{
            console.log(res);
            
        })
        apiInstance.get(`vendor/reviews/${UserData()?.vendor_id}/${param.review_id}/`).then((res) => {
            setReview(res.data);
            console.log(res.data);

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
                            <h2>⭐ Reviews and Rating</h2>
                            <div className="mb-3">

                            </div>
                            {/* REVIEWS SECTION */}
                            <div
                                className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                                style={{
                                    backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)`,
                                    maxHeight: '800px', // ارتفاع ثابت
                                    overflowY: 'auto'   // فعال کردن اسکرول عمودی
                                }}

                            >
                                <div className="row d-flex justify-content-center align-items-center">

                                    <div className="col-md-10">
                                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                            <img
                                                src={review.profile?.image}
                                                className="rounded-circle img-fluid shadow-1"
                                                alt={review.profile?.full_name}
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-8">
                                            <p className="text-dark fw-bold mb-1">Review:</p>
                                            <p>
                                                {review.review}
                                            </p>

                                            <p className="text-dark fw-bold mb-1">Reply:</p>
                                            <p>
                                                {review.reply === ""
                                                    ? <span>No reply yet!</span>
                                                    : (review.reply)
                                                }
                                            </p>

                                            <p className="fw-bold text-dark mb-2">
                                                <strong>Name:</strong> {review.profile?.full_name}
                                            </p>
                                            <p className="fw-bold text-dark mb-2">
                                                <strong>Product:</strong> {review.product?.title}
                                            </p>
                                            <p className="fw-bold text-dark mb-2">
                                                <strong>Rating: </strong>
                                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                                    <small
                                                        key={starIndex}
                                                        className={starIndex < review.rating ? "fas fa-star text-primary" : "far fa-star text-primary"}
                                                    ></small>
                                                ))}
                                            </p>
                                            <form onSubmit={handleReplySubmit} className='d-flex'>
                                                <input value={updateReview.reply} name='reply' onChange={handleReplyChange} type="text" placeholder='Write your reply...' className='form-control' />
                                                <button className='btn btn-success' type='submit'> <i className='fas fa-paper-plane'></i> </button>
                                            </form>
                                        </div>
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

export default ReviewDetail
