import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2'
import { CartContext } from '../plugin/Context'
import CartID from '../plugin/CartID'
import GetCurrentAddress from '../plugin/UserCountry'




const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    background: "#fafad2",
})





function Shop() {

    
    



    const [vendor, setVendor] = useState([])
    const [products, setProducts] = useState([])
    const param = useParams()

    useEffect(() => {
        apiInstance.get(`vendor/shop/${param.slug}`).then((res) => {
            setVendor(res.data);
        })
    }, [])


    useEffect(() => {
        apiInstance.get(`vendor/product-view/${param.slug}`).then((res) => {
            setProducts(res.data);
        })
    }, [])







    return (

        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>

                    <div style={styles.container}>
                        <Sidebar />
                        <main style={styles.mainContainer}>
                            <div className="container">
                                <section style={styles.sectionContainer}>
                                    <div style={styles.rowContainer} className="row">
                                        <div className="col-lg-6 col-md-8 mx-auto">
                                            <img
                                                src={vendor.image}
                                                alt="vendor Image"
                                                style={styles.mainImage}
                                            />
                                            <h1 style={styles.title}>{vendor.name}</h1>
                                            <p style={styles.leadText}>
                                                {vendor.description}
                                            </p>
                                            <p style={styles.leadText}>
                                                {products.length} Products
                                            </p>
                                        </div>
                                    </div>
                                </section>



                                {/*  PRODUCT LIST */}

                                <div className='row '>
                                    {products?.map((p, index) => (
                                        <div className="col-lg-3 col-md-6 col-sm-8 pb-2  " key={p.id || index}> {/* col-lg-4 col-md-12 mb-4 */}
                                            <div className="product-item bg-light mb-3"> {/* className='bg-image hover-zoom ripple' data-mb-ripple-color = 'light' */}
                                                <div className="product-img position-relative overflow-hidden">
                                                    <Link to={`/detail/${p.slug}/`}>
                                                        <img className="img-fluid w-100"
                                                            src={p.image}
                                                            style={{
                                                                width: '100%',
                                                                height: '350px',
                                                                objectFit: 'cover'
                                                            }} />
                                                    </Link>
                                                    <div className="product-action text-center mt-2 ">
                                                        <button className="btn btn-primary btn-square " /* onClick={() => handleAddToCart(p.id, p.price, p.shipping_amount)} */>
                                                            <i className="fa fa-edit" />
                                                        </button>
                                                        <button className="btn btn-danger btn-square ms-1" >
                                                            <i className="fa fa-remove" />
                                                        </button>
                                                        <button className="btn btn-outline-dark btn-square ms-1">
                                                            <i className="fa fa-eye-slash" />
                                                        </button>
                                                        
                                                    </div>
                                                </div>
                                                <div className="text-center py-4">
                                                    <Link className='text-decoration-none' to={`/detail/${p.slug}`}>
                                                        <h5 className='card-title mb3'>
                                                            {p.title}
                                                        </h5>
                                                    </Link>
                                                    <div className="d-flex align-items-center justify-content-center mt-1 ">
                                                        <Link className='text-decoration-none' to={`/detail/${p.category?.slug}`}>
                                                            <h8>
                                                                {p.category?.title}
                                                            </h8>
                                                        </Link>
                                                    </div>
                                                    <div className="df-flex justify-content-center">
                                                        <h8 className='mb-1'> ${p.price} </h8>
                                                        <h8 className='mb-3 text-muted'> <strike>${p.old_price}</strike></h8>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                                            <small
                                                                key={starIndex}
                                                                className={starIndex < p?.rating ? "fas fa-star text-primary" : "far fa-star text-primary"}
                                                            ></small>
                                                        ))}
                                                        <small>( {p.rating} )</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>






                                {/*  PRODUCT LIST */}
                                {/* <div className="row" >
                                    <div className="col-2-md-8">
                                        <div style={styles.cardContainer} className="card">
                                            <img
                                                src=""
                                                alt="Product 1"
                                                style={styles.productImage}
                                            />
                                            <div className="card-body">
                                                <p style={styles.cardText}> products description </p>
                                                <div style={styles.cardFooter}>
                                                    <button style={styles.button}>  add toCART </button>
                                                    <small style={styles.priceText}> price : 23432$ </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </main>
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
        /* flexWrap: 'wrap', */ 
        gap: '10px',

    },
    mainContainer: {
        marginTop: '3rem',
        /* alignItems: 'center',
        textAlign: 'center', */

    },
    sectionContainer: {
        textAlign: 'center',
        /* display: 'flex', 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center' */

    },
    mainImage: {
        width: 100,
        height: 100,
        objectFit: "cover",
    },
    title: {
        fontWeight: "lighter",
    },
    leadText: {
        color: "#6c757d",
    },
    rowContainer: {
        /* display: 'flex',  */
        padding: '3rem 0',
        textAlign: 'center',
        /* justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center' */

    },
    cardContainer: {
        marginBottom: '1.5rem',
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
    },
    productImage: {
        height: 200,
        objectFit: "cover",
    },
    cardText: {
        fontSize: "1rem",
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        fontSize: '0.875rem',
        padding: '0.375rem 0.75rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
    },
    priceText: {
        fontSize: '0.875rem',
        color: '#6c757d',
    }
}

export default Shop
