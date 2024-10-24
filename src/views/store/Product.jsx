import React, { useState, useEffect, useContext } from 'react'
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'
import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'
import Swal from 'sweetalert2'
import { CartContext } from '../plugin/Context'



const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    background: "#fafad2",
})

function Product() {

    const [cartCount, setCartCount] = useContext(CartContext)

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState({})
    const [selectedColor, setSelectedColor] = useState({})
    const [selectedSize, setSelectedSize] = useState({})



    const [currentPage, setCurrentPage] = useState(1); // صفحه جاری GPT
    const handlePageChange = (number) => {
        setCurrentPage(number);  // تغییر صفحه GPT
        window.scrollTo({ top: 0, behavior: 'smooth' });  // اسکرول به بالای صفحهGPT
    }
    const [productsPerPage] = useState(8); // تعداد محصولات در هر صفحه GPT


    /* 
        //  ---PRODUCT VARIATION IN PRODUCT LIST---
    
        
        const [colorValue, setColorValue] = useState("No Color")
        const [sizeValue, setSizeValue] = useState("No Size")
        const [qtyValue, setQtyValue] = useState(1)
        const [selectedProduct, setSelectedProduct] = useState({})
        const [selectedColor, setSelectedColor] = useState({})
        const [selectedSize, setSelectedSize] = useState({})
    
        const handleColorButtonClick = (e, product_id, color_name) => {
            setColorValue(color_name)
            setSelectedProduct(product_id)
    
            setSelectedColor((prevSelectedColor) => ({
                ...prevSelectedColor,
                [product_id]: color_name
            }))
            // <button className="" style= {{}} onClick= {(e) => handleColorButtonClick(e, p.id, c.name)} 
        }
        const handleSizeButtonClicked = (e, product_id, size_name) => {
            setSizeValue(size_name)
            selectedProduct(product_id)
    
            setSelectedSize((prevselectedSize) => ({
                ...prevselectedSize,
                [product_id]: size_name
            }))
            // <button className="" style= {{}} onClick= {(e) => handleColorButtonClick(e, p.id, c.name)} 
        }
        const handleQtyChange = (e, product_id ) => {
            setQtyValue(e.target.value)
            setSelectedProduct(product_id)
            // <input className= 'form-control' onChange= {(e) => handleQtyChange(e, p.id) type="number" } 
        }
    
     */

    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    const cart_id = CartID()

    //http://127.0.0.1:8000/api/v1/products/
    useEffect(() => {
        apiInstance.get(`products/`).then((res) => {
            setProducts(res.data)
        })
    }, [])

    useEffect(() => {
        apiInstance.get(`category/`).then((res) => {
            setCategory(res.data)
        })
    }, [])

    const indexOfLastProduct = currentPage * productsPerPage; //GPT
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; //GPT
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); //GPT
    const totalPages = Math.ceil(products.length / productsPerPage); //GPT
    const pageNumbers = []; //GPT
    for (let i = 1; i <= totalPages; i++) { //GPT
        pageNumbers.push(i);
    }

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        const formdata = new FormData()
        formdata.append("product_id", product_id)
        formdata.append("user_id", userData?.user_id)
        formdata.append("cart_id", cart_id)
        formdata.append("cart_qty", qtyValue)
        formdata.append("price", price)
        formdata.append("shipping_amount", shipping_amount)
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
    }

    return (
        <>
            <div className="container-fluid pt-5 pb-3">
                <h1 className="section-title position-relative text-uppercase mx-xl-4 mb-4">
                    <span className="bg-secondary pr-3">Latest Product's</span>
                </h1>
                <div className="row px-xl-5">
                    {currentProducts?.map((p, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-8 pb-2 " key={p.id || index}> {/* col-lg-4 col-md-12 mb-4 */}
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
                                        <a className="btn btn-outline-dark btn-square" onClick={() => handleAddToCart(p.id, p.price, p.shipping_amount)}>
                                            <i className="fa fa-shopping-cart" />
                                        </a>
                                        <a className="btn btn-outline-dark btn-square" href="">
                                            <i className="far fa-heart"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square" href="">
                                            <i className="fa fa-sync-alt"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square" href="">
                                            <i className="fa fa-search"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <Link to={`/detail/${p.slug}`}>
                                        <h5 className='card-title mb3'>
                                            {p.title}
                                        </h5>
                                    </Link>
                                    <div className="d-flex align-items-center justify-content-center mt-1">
                                        <Link to={`/detail/${p.category?.slug}`}>
                                            <h6 className="h8 text-decoration-none text-truncate">
                                                {p.category?.title}
                                            </h6>
                                        </Link>
                                    </div>
                                    <div className="df-flex justify-content-center">
                                        <h6 className='mb-1'> ${p.price} </h6>
                                        <h6 className='mb-3 text-muted'> <strike>${p.old_price}</strike></h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>( {p.rating} )</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='text-center mt-4'> {/* GPT DIV */}
                <div className="btn-group">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`btn ${number === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            <div className='container-fluid row pt-4 pb-3'>
                {category?.map((c, index) => (
                    <div className='col-lg-2 text-center ' key={index}>
                        <img src={c.image} style={{ width: "20vh", height: "20vh", borderRadius: '100%', objectFit: 'cover' }} />
                        <h5 className='py-2'>{c.title}</h5>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Product



