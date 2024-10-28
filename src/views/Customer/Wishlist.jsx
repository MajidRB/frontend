import { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true,
    background: "#fafad2",
})





function Wishlist() {

    const [wishlist, setWishlist] = useState([])
    const userData = UserData()


    const fetchWishlist = async () => {
        apiInstance.get(`/customer/wishlist/${userData?.user_id}/`).then((res) => {
            setWishlist(res.data)

        })
    }


    useEffect(() => {
        fetchWishlist()
    }, [])




    const addToWishlist = async (productId, userId) => {
        try {
            const formdata = new FormData()
            formdata.append("product_id", productId)
            formdata.append("user_id", userId)
            const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata)
            fetchWishlist()
            Swal.fire({
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            })

        } catch (error) {
            console.log(error);

        }
    }



    return (


        <div >
            <h4 className='mb-3'>
                {" "}
                <i className='fas fa-heart text-danger ' /> Wishlist {" "}
            </h4>
            <div className="product-item bg-light mb-3">
                <div className="product-img position-relative overflow-hidden">
                    <div className="row px-xl-5 ">
                        {wishlist?.map((p, index) => (
                            <div className=" card p-3 rounded-3 m-1 col-lg-2 col-md-3 col-sm-4 pb-2 " key={p.id || index}> {/* col-lg-4 col-md-12 mb-4 */}
                                <div className="product-item bg-light mb-3"> {/* className='bg-image hover-zoom ripple' data-mb-ripple-color = 'light' */}
                                    <div className="product-img position-relative overflow-hidden">
                                        <Link to={`/detail/${p.product.slug}/`}>
                                            <img className="img-fluid w-100"
                                                src={p.product.image}
                                                style={{
                                                    width: '20%',
                                                    height: '150px',
                                                    objectFit: 'cover'
                                                }} />
                                        </Link>
                                        <div className="product-action text-center mt-2 ">
                                            <a className="btn btn-outline-dark btn-square" /* onClick={() => handleAddToCart(p.product.id, p.product.price, p.product.shipping_amount)} */>
                                                <i className="fa fa-shopping-cart" />
                                            </a>

                                            <a className="btn btn-outline-dark btn-square" onClick={() => addToWishlist(p.product.id, userData?.user_id)} >
                                                <i className="fa fa-remove"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-3">
                                        <Link to={`/detail/${p.product.slug}`}>
                                            <h6 className='card-title mb2'>
                                                {p.product.title}
                                            </h6>
                                        </Link>
                                        <div className="d-flex align-items-center justify-content-center mt-1 ">
                                            <Link
                                                className='text-decoration-none'
                                                to={`/detail/${p.product.category?.slug}`}
                                            >
                                                <h8 className="text-dark">
                                                    {p.product.category?.title}
                                                </h8>
                                            </Link>
                                        </div>
                                        <div className="df-flex justify-content-center">
                                            <h8 className='mb-1'> ${p.product.price} </h8>
                                            {/* <h6 className='mb-3 text-muted'> <strike>${p.product.old_price}</strike></h6> */}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                        {wishlist.length < 1 &&
                            <h4 className='text-center p-5'>  There is no item in your wishlist. </h4>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}


/* const styles = {

    cardContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    card: {
        flex: '1',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#e6e6e6',
        textAlign: 'center',
        margin: '0 10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },


    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '30px',
        marginBottom: '20px',
    },
    th: {
        backgroundColor: '#e6e6e6',
        padding: '10px',
        borderBottom: '15px solid #e6e6e6',


    },
    td: {
        padding: '10px',
        borderBottom: '25px solid #FFFFFF',


    },
}; */



export default Wishlist








