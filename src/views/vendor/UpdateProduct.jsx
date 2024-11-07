import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';



function UpdateProduct() {

    const [activeTab, setActiveTab] = useState('basic');
    const userData = UserData()
    const param = useParams()

    const [product, setProduct] = useState([])

    /* GPT
    const [product, setProduct] = useState({
    ...initialProductData,  // داده‌های اولیه محصول
    image: initialProductData.image ? { preview: initialProductData.image } : null
});

    GPT */

    const [specifications, setSpecifications] = useState([{ title: '', content: '' }])
    const [colors, setColors] = useState([{ name: '', color_code: '' }])
    const [sizes, setSizes] = useState([{ name: '', price: '' }])
    const [gallery, setGallery] = useState([{ image: '' }])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()



    const handleAddMore = (setStateFunction) => {
        setStateFunction((prevState) => [...prevState, {}])
    }

    const handleRemove = (index, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        })
    }

    const handleInputChange = (index, field, value, setStateFunction) => {
        setStateFunction((prevState) => {
            const newState = [...prevState]
            newState[index][field] = value

            return newState
        })
    }


    const handleImageChange = (index, event, setStateFunction) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setStateFunction((prevState) => {
                    const newState = [...prevState]
                    newState[index].image = { file, preview: reader.result }
                    return newState
                })
            }

            reader.readAsDataURL(file)
        } else {
            setStateFunction((prevState) => {
                const newState = [...prevState]
                newState[index].image = null
                newState[index].preview = null
                return newState
            })
        }
    }


    const handleProductInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })

    }


    const handleProductFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setProduct({
                    ...product,
                    image: {
                        file: event.target.files[0],
                        preview: reader.result
                    }
                })
            }
            reader.readAsDataURL(file)
        }
    }


    useEffect(() => {
        apiInstance.get(`category/`).then((res) => {
            setCategory(res.data)

        })
    }, [])


    useEffect(() => {
        apiInstance.get(`vendor/product-update/${userData?.vendor_id}/${param.pid}/`).then((res) => {
            setProduct(res.data)
            setColors(res.data.color)
            setSizes(res.data.size)
            setSpecifications(res.data.specification)
            setGallery(res.data.gallery)

        })
    }, [])



    const handleProductCreate = async (e) => {
        e.preventDefault()

        const formdata = new FormData()


        /* Object.entries(product).forEach(([key, value]) => {
            if (key === 'image' && value) {
                formdata.append(key, value.file)
            } else {
                formdata.append(key, value)
            }
        }) */


        Object.entries(product).forEach(([key, value]) => {
            if (key === 'image' && value && value.file) {
                // فقط در صورتی که فایلی برای تصویر انتخاب شده باشد، آن را اضافه کن
                formdata.append(key, value.file);
            } else if (key !== 'image') {
                // بقیه فیلدها را اضافه کن
                formdata.append(key, value);
            }
        });

        specifications.forEach((specification, index) => {
            Object.entries(specification).forEach(([key, value]) => {
                formdata.append(`specifications[${index}][${key}]`, value)
            })
        })

        colors.forEach((color, index) => {
            Object.entries(color).forEach(([key, value]) => {
                formdata.append(`colors[${index}][${key}]`, value)
            })
        })

        sizes.forEach((size, index) => {
            Object.entries(size).forEach(([key, value]) => {
                formdata.append(`sizes[${index}][${key}]`, value)
            })
        })

        gallery.forEach((item, index) => {
            if (item.image) {
                formdata.append(`gallery[${index}][image]`, item.image.file)
            } 
        })

        const response = await apiInstance.patch(`vendor/product-update/${userData?.vendor_id}/${param.pid}/`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        Swal.fire({
            icon: 'success',
            title: 'Poduct Updated Successfully',
            timer: 2000,
        })

        navigate(`/vendor/products/`)
    }






    return (
        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>
                    <div style={styles.container}>
                        <Sidebar />

                        <div className='flex-fill' >

                            <div className='nav nav-pills align-item-center justify-content-center p-2 m-2'>  {/* align-item-center */}
                                <div >
                                    <button
                                        onClick={() => setActiveTab('basic')}
                                        style={activeTab === 'basic' ? styles.activeTab : styles.inactiveTab}>
                                        Basic Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('gallery')}
                                        style={activeTab === 'gallery' ? styles.activeTab : styles.inactiveTab}>
                                        Gallery
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('spec')}
                                        style={activeTab === 'spec' ? styles.activeTab : styles.inactiveTab}>
                                        Specifications
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('size')}
                                        style={activeTab === 'size' ? styles.activeTab : styles.inactiveTab}>
                                        Size
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('color')}
                                        style={activeTab === 'color' ? styles.activeTab : styles.inactiveTab}>
                                        Color
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleProductCreate}>
                                {/* Basic */}
                                {activeTab === 'basic' && (
                                    <div style={{ maxHeight: '900px', overflowY: 'auto' }}>
                                        <div className='card rounded-5 container mt-4 p-5 mb-4' >
                                            <div style={styles.sectionTitle}>Product Details</div>
                                            <div style={styles.inputContainer}>
                                                <label style={styles.label}>Product Thumbnail</label>
                                                <input
                                                    style={styles.input}
                                                    className='form-control'
                                                    type="file"
                                                    name='image'
                                                    onChange={handleProductFileChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="Title" className="form-label">Title</label>
                                                <input name='title' value={product.title || ''} onChange={handleProductInputChange} style={styles.input} type="text" className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="description" className="form-label">Description</label>
                                                <textarea name='description' value={product.description || ''} onChange={handleProductInputChange} style={styles.textarea} type="text" className="form-control" id="description" rows="3"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="Sale Price" className="form-label">Sale Price</label>
                                                <input name='price' value={product.price || ''} onChange={handleProductInputChange} style={styles.input} type="number" className="form-control" id="Sale Price" />
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="Regular Price" className="form-label">Regular Price</label>
                                                <input name='old_price' value={product.old_price || ''} onChange={handleProductInputChange} style={styles.input} type="number" className="form-control" id="Regular Price" />
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="Shipping Amount" className="form-label">Shipping Amount</label>
                                                <input name='shipping_amount' value={product.shipping_amount || ''} onChange={handleProductInputChange} style={styles.input} type="number" className="form-control" id="Shipping Amount" />
                                            </div>
                                            <div className="mb-3">
                                                <label style={styles.label} htmlFor="Stock Qty" className="form-label">Stock Qty</label>
                                                <input name='stock_qty' value={product.stock_qty || ''} onChange={handleProductInputChange} style={styles.input} type="number" className="form-control" id="Stock Qty" />
                                            </div>

                                            <label style={styles.label} htmlFor="category" className="form-label">Category</label>
                                            <select name='category' value={product.category || ''} onChange={handleProductInputChange} className="form-select" aria-label=" select example">
                                                <option selected>Open to select category</option>
                                                {category?.map((c, index) => (
                                                    <option key={index} value={c.id} >{c.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {/* Gallery */}
                                {activeTab === 'gallery' && (
                                    <div className='card rounded-5 container mt-4 p-4 mb-4'>
                                        <div style={styles.sectionTitle}>Product Gallery</div>
                                        {gallery?.map((item, index) => (
                                            <div key={index} className='row m-1'>
                                                <div className='col-lg-4 m-2'>
                                                    <div style={styles.inputContainer}>
                                                        <label style={styles.label}>Product Image</label>
                                                        <input
                                                            style={styles.input}
                                                            type="file"
                                                            onChange={(e) => handleImageChange(index, e, setGallery)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-lg-4 mt-5'>
                                                    <button
                                                        onClick={() => handleRemove(index, setGallery)}
                                                        className='btn btn-danger'
                                                        type='button'
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className='col-lg-6 m-2'>


                                                    {item.image && (item.image.preview ? (
                                                        <div style={styles.inputContainer}>
                                                            <label style={styles.label}>Image</label>
                                                            <img
                                                                src={item.image?.preview}
                                                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div style={styles.inputContainer}>
                                                            <label style={styles.label}>Image</label>
                                                            <img
                                                                src={item.image}
                                                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                                                            />
                                                        </div>
                                                    ))}
                                                    {!item.image && (
                                                        <div style={styles.inputContainer}>
                                                            <label style={styles.label}>Image</label>
                                                            <img
                                                                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KeKY2Y3R0HRBkPEmGWU3FwHaHa%26pid%3DApi&f=1&ipt=aac0b62ed6fc49ac0ee7491ac6e357425aa7c2ac256fa36a0bdae320dda87145&ipo=images'
                                                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                                                            />
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        ))}
                                        {gallery < 1 &&
                                            <h4>No Images Selectes</h4>
                                        }
                                        <button onClick={() => handleAddMore(setGallery)} className='btn btn-primary  mt-4' type='button'>
                                            Add Image
                                        </button>
                                    </div>
                                )}
                                {/* Specifications */}
                                {activeTab === 'spec' && (
                                    <div className='card rounded-5 container mt-4 p-4 mb-4'>
                                        <div style={styles.sectionTitle}>Specifications</div>

                                        {specifications?.map((spec, index) => (
                                            <div key={index} className="mt-4 mb-3 row">
                                                <div className='col-lg-5 mb-2'>
                                                    <label style={styles.label} htmlFor="title" className="form-label">Title</label>
                                                    <input
                                                        value={spec.title || ''}
                                                        onChange={(e) => handleInputChange(index, 'title', e.target.value, setSpecifications)}
                                                        style={styles.input}
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className='col-lg-5 mb-2'>
                                                    <label style={styles.label} htmlFor="content" className="form-label">Content</label>
                                                    <input
                                                        value={spec.content || ''}
                                                        onChange={(e) => handleInputChange(index, 'content', e.target.value, setSpecifications)}
                                                        style={styles.input}
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className='col-lg-2 mb-2'>
                                                    <br />
                                                    <button
                                                        onClick={() => handleRemove(index, setSpecifications)}
                                                        className='btn btn-danger mt-2'
                                                        type='button'
                                                    >
                                                        Remove</button>
                                                </div>
                                            </div>
                                        ))}

                                        {specifications < 1 && (
                                            <h3>No Specification here!</h3>
                                        )}

                                        <button
                                            onClick={() => handleAddMore(setSpecifications)}
                                            className='btn btn-primary  mt-4'
                                            type='button'
                                        >
                                            Add Specifications
                                        </button>
                                    </div>
                                )}
                                {/* Sizes */}
                                {activeTab === 'size' && (
                                    <div className='card rounded-5 container mt-4 p-4 mb-4'>
                                        <div style={styles.sectionTitle}>Sizes</div>
                                        {sizes?.map((size, index) => (
                                            <div key={index} className="mt-4 mb-3 row">
                                                <div className='col'>
                                                    <label style={styles.label} htmlFor="size" className="form-label">Size</label>
                                                    <input
                                                        value={size.name || ''}
                                                        onChange={(e) => handleInputChange(index, 'name', e.target.value, setSizes)}
                                                        style={styles.input}
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <label style={styles.label} htmlFor="price" className="form-label">Price</label>
                                                    <input
                                                        value={size.price || ''}
                                                        onChange={(e) => handleInputChange(index, 'price', e.target.value, setSizes)}
                                                        style={styles.input}
                                                        type="number"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className='col-lg-2 mb-2'>
                                                    <br />
                                                    <button
                                                        onClick={() => handleRemove(index, setSizes)}
                                                        className='btn btn-danger mt-2'
                                                        type='button'
                                                    >
                                                        Remove</button>
                                                </div>
                                            </div>
                                        ))}

                                        {sizes < 1 && (
                                            <h3>No Sizes Selected</h3>
                                        )}

                                        <button
                                            className='btn btn-primary  mt-4'
                                            onClick={() => handleAddMore(setSizes)}
                                            type='button'
                                        >
                                            Add Sizes
                                        </button>
                                    </div>
                                )}
                                {/* Colors */}
                                {activeTab === 'color' && (
                                    <div className='card rounded-5 container mt-4 p-4 mb-4'>
                                        <div style={styles.sectionTitle}>Colors</div>
                                        {colors?.map((color, index) => (
                                            <div key={index} className="p-4 mt-4 mb-3 row">
                                                <div className='col'>
                                                    <label style={styles.label} htmlFor="color" className="form-label">Name</label>
                                                    <input
                                                        value={color.name || ''}
                                                        onChange={(e) => handleInputChange(index, 'name', e.target.value, setColors)}
                                                        style={styles.input}
                                                        type="text"
                                                        className="form-control"
                                                        name="color"
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <label style={styles.label} htmlFor="Code" className="form-label">Code</label>
                                                    <input
                                                        value={color.color_code || ''}
                                                        onChange={(e) => handleInputChange(index, 'color_code', e.target.value, setColors)}
                                                        style={styles.input}
                                                        type="text"
                                                        className="form-control"
                                                        name="Code"
                                                    />
                                                </div>
                                                <div className='col-lg-2 mb-2'>
                                                    <br />
                                                    <button
                                                        onClick={() => handleRemove(index, setColors)}
                                                        className='btn btn-danger mt-2'
                                                        type='button'
                                                    >
                                                        Remove</button>
                                                </div>

                                            </div>
                                        ))}

                                        {colors < 1 && (
                                            <h3>No Color Added!</h3>
                                        )}

                                        <button
                                            className='btn btn-primary  mt-4'
                                            onClick={() => handleAddMore(setColors)}
                                            type='button'
                                        >
                                            Add Color
                                        </button>

                                    </div>
                                )}
                                <div className='d-flex justify-content-center'>
                                    <button
                                        type='submit'
                                        className='btn btn-success'
                                        style={{ width: '400px', maxWidth: '400px' }} >
                                        Update Product
                                    </button>
                                </div>
                            </form>


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

        marginBottom: '20px',


        fontFamily: 'Arial, sans-serif'
    },
    tabContainer: {
        /* display: 'flex', */
        /* maxHeight: '60px',
        maxWidth: '180px', */
        padding: '100px',
        /* justifyContent: 'center', */
        marginBottom: '120px',
        /* textAlign: "center",
        alignItems: "center", */
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    inactiveTab: {
        backgroundColor: '#e9ecef',
        color: '#333',
        padding: '10px 20px',
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: '30px',
        textAlign: "center",
        alignItems: "center",
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    settingsContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        width: "100%",
        marginTop: '80px',
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    profileSection: {
        textAlign: "center",
        width: "30%", // تنظیم عرض پروفایل
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingRight: "20px",
        borderRight: "1px solid #ddd",

    },
    profileImagestyles: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px",

    },
    userName: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "0",

    },
    userRole: {
        fontSize: "14px",
        color: "#777",

    },
    fileUpload: {
        marginTop: "15px",

    },
    label: {
        fontSize: "18px",
        marginBottom: "5px",
        display: "block",
        color: "#333",
    },
    fileInput: {
        fontSize: "14px",
        padding: "6px",
        borderRadius: "6px",
        border: "2px solid #ddd",
        marginTop: "5px",
    },
    form: {
        width: "65%", // تنظیم عرض فرم
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20px",
    },
    formGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        minHeight: "150px",
    },
    updateButton: {
        padding: "10px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#28a745",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px",
    },
    shopSection: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    shopImageStyle: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    shopName: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    shopDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '20px',
    },
    shopForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    shopFormGroup: {
        marginBottom: '15px',
    },
    shopLabel: {
        display: 'block',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    shopFileInput: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    shopInput: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    shopUpdateButton: {
        padding: '10px',
        fontSize: '14px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    viewShopButton: {
        padding: '10px',
        fontSize: '14px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default UpdateProduct
