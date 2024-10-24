import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'
import Swal from 'sweetalert2'
import moment from 'moment'
import { CartContext } from '../plugin/Context'


const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    background: "#fafad2",
})


function ProductDetail() {

    const [cartCount, setCartCount] = useContext(CartContext)
    const [product, setProduct] = useState({})
    const [gallery, setGallery] = useState([])
    const [specification, setSpecification] = useState([])
    const [size, setSize] = useState([])
    const [color, setColor] = useState([])
    const [reviews, setReviews] = useState([])
    const [createReview, setCreateReview] = useState({
        user_id: 0, product_id: product?.id, review: "", rating: 0
    })
    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)

    const param = useParams()
    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    const cart_id = CartID()


    useEffect(() => {

        apiInstance.get(`products/${param.slug}/`).then((res) => {
            setProduct(res.data);
            setGallery(res.data.gallery);
            setSpecification(res.data.specification);
            setSize(res.data.size);
            setColor(res.data.color);
            /* setReview(res.data.review); */
        });
    }, []);

    const handleColorButtonClick = (e) => {
        const colorNameInput = e.target.closest('.color_button').parentNode.querySelector(".color_name")
        setColorValue(colorNameInput.value)
    }

    const handleSizeButtonClick = (e) => {
        const sizeNameInput = e.target.closest(".size_button").parentNode.querySelector(".size_name")
        setSizeValue(sizeNameInput.value)
    }

    const handleQuantityChange = (e) => {
        setQtyValue(e.target.value)
    }

    const handleAddToCart = async () => {

        try {
            const formdata = new FormData()

            formdata.append("product_id", product.id)
            formdata.append("user_id", userData?.user_id)
            formdata.append("cart_id", cart_id)
            formdata.append("cart_qty", qtyValue)
            formdata.append("price", product.price)
            formdata.append("shipping_amount", product.shipping_amount)
            formdata.append("country", currentAddress.country)
            formdata.append("size", sizeValue)
            formdata.append("color", colorValue)

            const response = await apiInstance.post(`cart-view/`, formdata)

            const url = userData ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`
            apiInstance.get(url).then((res) => {
                setCartCount(res.data.length)
            })

            Toast.fire({
                icon: "success",
                title: response.data.message,
            })

        } catch (error) {
            console.log(error);
        }
    }
    const fetchReviewData = async () => {
        if (product?.id) {
            await apiInstance.get(`reviews/${product.id}/`).then((res) => {
                setReviews(res.data)
            })
        }
    }

    useEffect(() => {
        fetchReviewData()
    }, [product])

    const handleReviewCreate = (event) => {
        setCreateReview({
            ...createReview,
            [event.target.name]: event.target.value
        })
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData
        formdata.append("user_id", userData?.user_id)
        formdata.append("product_id", product?.id)
        formdata.append("rating", createReview?.rating)
        formdata.append("review", createReview?.review)

        apiInstance.post(`reviews/${product.id}/`, formdata).then((res) => {
            console.log(res.data);
            fetchReviewData()

        })
    }



    return (
        <>
            <div>
                {/* Breadcrumb Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                                <span className="breadcrumb-item active">Shop Detail</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Shop Detail Start */}
                <div className="container-fluid pb-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-5 mb-30">
                            <div id="product-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner bg-light">
                                    <div className="carousel-item active">
                                        <img className="w-100 h-100" src={product?.image} alt="Image" />
                                    </div>
                                    {gallery?.map((g, index) => (
                                        <div className="carousel-item" key={index}>
                                            <img className="w-100 h-100" src={g?.image} alt="Image" />
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                    <i className="fa fa-2x fa-angle-left text-dark"></i>
                                </a>
                                <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                    <i className="fa fa-2x fa-angle-right text-dark"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-7 h-auto mb-30">
                            <div className="h-100 bg-light p-30">
                                <h3>{product.title}</h3>
                                <div className="d-flex mb-3">
                                    <div className="text-primary mr-2">
                                        {/* GPT ADDED */}
                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                            <small
                                                key={starIndex}
                                                className={starIndex < product.rating ? "fas fa-star text-primary" : "far fa-star text-primary"}
                                            ></small>
                                        ))}
                                    </div>
                                    <small className="pt-1">({product.rating})</small>
                                </div>
                                <h3 className="font-weight-semi-bold mb-4">{product.price}</h3>
                                <p className="mb-4">{product.description}</p>
                                {color.length > 0 &&
                                    <>
                                        <div className="d-flex mb-3">
                                            <strong className="text-dark mr-3">Sizes: <span>{sizeValue} cm</span></strong>
                                            {size?.map((size, index) => (
                                                <div key={index}>
                                                    <input type="hidden" className='size_name' value={size.name} />
                                                    <button
                                                        className='btn btn-secondary m-1 size_button'
                                                        onClick={handleSizeButtonClick}>{size.name}-cm</button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                                {color.length > 0 &&
                                    <>
                                        <div className="d-flex mb-4">
                                            <strong className="text-dark p-1 ">Color: <span className='ms-1'>{colorValue}</span> </strong>
                                            {color?.map((c, index) => (
                                                <div className='col-0 mb-1' key={index}>
                                                    <input type='hidden' className='color_name' value={c.color_code} />
                                                    <button
                                                        className='btn p-3 ms-1 border-dark color_button '
                                                        type='button'
                                                        onClick={handleColorButtonClick}
                                                        style={{ backgroundColor: `${c.color_code}` }}></button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                }
                                <div className="d-flex align-items-center mb-4 pt-2">
                                    <strong className=''>Quantity:  </strong>
                                    <div className="input-group quantity mr-3 ms-3" style={{ width: '130px' }}>
                                        <div className="input-group-btn mr-2">
                                            <button className="btn btn-primary btn-minus">
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control bg-light border-dark text-center"
                                            defaultValue={qtyValue}
                                            onChange={handleQuantityChange} />
                                        <div className="input-group-btn ">
                                            <button className="btn btn-primary btn-plus ml-2 ">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary px-3 ms-2" onClick={handleAddToCart}>
                                        <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                                    </button>
                                </div>
                                <div className="d-flex pt-2">
                                    <strong className="text-dark mr-2">Share on:</strong>
                                    <div className="d-inline-flex">
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-pinterest"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="bg-light p-30">
                                <div className="nav nav-tabs mb-4">
                                    <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
                                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
                                    <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews</a>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <h4 className="mb-3">Product Description</h4>
                                        <p> {product.description}</p>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <h4 className="mb-3">Additional Information</h4>
                                        <p>spec goes here:</p>
                                        <div className="row">
                                            {specification?.map((s, index) => (
                                                <div className="col-md-6" key={index}>
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item px-1 ">
                                                            {s.title}:  {s.content}
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3"  >
                                        <h4 className="mb-3">{product.rating_count} review for {product.title}</h4>
                                        {reviews?.map((r, index) => (
                                            <div className="media mb-3 card p-4 shadow-1 rounded-5  " key={index}>
                                                <img src={r.profile.image} className="img-fluid mr-3 mt-1" style={{ width: '65px', objectFit: 'cover' }} />
                                                <div className="media-body">
                                                    <h6>{r.profile.full_name}<small> | on <i>{moment(r.date).format("MMM D YYYY")}</i></small></h6>
                                                    <div className="text-primary mb-3">
                                                        {Array.from({ length: 5 }).map((_, starIndex) => (
                                                            <small
                                                                key={starIndex}
                                                                className={starIndex < r.rating ? "fas fa-star text-primary" : "far fa-star text-primary"}
                                                            ></small>
                                                        ))}
                                                    </div>
                                                    <div className='card p-3 shadow rounded-4'>
                                                        <b>review:</b>
                                                        <p>{r.review}</p>
                                                    </div>
                                                    {r.reply ? (
                                                        <div className='card p-3 ms-4 mt-2 shadow rounded-4'>
                                                            <b>reply:</b>
                                                            <p>{r.reply}</p>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                        {/* CREATE REVIEW START */}
                                        <div className='card shadow-1 rounded-5  container mt-5 p-4 m-4'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <h2>Create a New Review</h2>
                                                    <form onSubmit={handleReviewSubmit}>
                                                        <div className='mb-3'>
                                                            <label htmlFor="username" className='form-label'>
                                                                Rating
                                                            </label>
                                                            <select name="rating" className='form-select' onChange={handleReviewCreate} id="">
                                                                <option value="1">1 Star</option>
                                                                <option value="2">2 Star</option>
                                                                <option value="3">3 Star</option>
                                                                <option value="4">4 Star</option>
                                                                <option value="5">5 Star</option>
                                                            </select>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label htmlFor="reviewText" className='form-label'>
                                                                Review
                                                            </label>
                                                            <textarea
                                                                name='review'
                                                                id="reviewText"
                                                                rows={4}
                                                                className='form-control'
                                                                placeholder='Write Your Review'
                                                                value={createReview.review}
                                                                onChange={handleReviewCreate}
                                                            />
                                                        </div>
                                                        <button type='submit' className='btn btn-primary'> Submit Review </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        {/* CREATE REVIEW END */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shop Detail End */}
            </div>
        </>
    )
}

export default ProductDetail
