import React from 'react'
import Sidebar from './Sidebar';
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';




function VendorSettings() {


    const [activeTab, setActiveTab] = useState('profile'); // 'shop' or 'profile'

    const [profileData, setProfileData] = useState([])
    const [profileImage, setProfileImage] = useState('')
    const [vendorData, setVendorData] = useState([])
    const [vendorImage, setVendorImage] = useState('')
//vendor_id or user_id
    const fetchProfileData = () => {
        apiInstance.get(`vendor/profile-settings/${UserData()?.user_id}/`).then((res) => {
            setProfileData(res.data);
            setProfileImage(res.data.image)
            
            
        })
    }
//vendor_id or user_id
    const fetchVendorData = () => {
        apiInstance.get(`vendor/shop-settings/${UserData()?.vendor_id}/`).then((res) => {
            setVendorData(res.data)
            setVendorImage(res.data.image)
        })
    }

    useEffect(() => {
        fetchProfileData()
        fetchVendorData()
    }, [])


    const handleInputChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.files[0]
        })
    }

    const handleVendorChange = (event) => {
        setVendorData({
            ...vendorData,
            [event.target.name]: event.target.value
        })
    }


    const handleVendorFileChange = (event) => {
        setVendorData({
            ...vendorData,
            [event.target.name]: event.target.files[0]
        })
    }


    const handleProfileUpdate = async (e) => {

        e.preventDefault()
        const formdata = new FormData()
        const res = await apiInstance.get(`vendor/profile-settings/${UserData()?.user_id}/`)

        if (profileData.image && profileData.image !== res.data.image) {
            formdata.append("image", profileData.image)
        }

        formdata.append("full_name", profileData.full_name)
        formdata.append("about", profileData.about)

        await apiInstance.patch(`vendor/profile-settings/${UserData()?.user_id}/`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        fetchProfileData()
        Swal.fire({
            icon: 'success',
            title: 'Updated Successfuly'
        })
    }




    const handleVendorUpdate = async (e) => {

        e.preventDefault()
        const formdata = new FormData()
        const res = await apiInstance.get(`vendor/shop-settings/${UserData()?.vendor_id}/`)

        if (vendorData.image && vendorData.image !== res.data.image) {
            formdata.append("image", vendorData.image)
        }

        formdata.append("name", vendorData.name)
        formdata.append("description", vendorData.description)

        await apiInstance.patch(`vendor/shop-settings/${UserData()?.vendor_id}/`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        fetchVendorData()
        Swal.fire({
            icon: 'success',
            title: 'Updated shop Successfuly'
        })
    }




    return (

        <>
            <div style={styles.pageContainer}>
                <div style={styles.card}>

                    <div style={styles.container}>
                        <Sidebar />
                        {/* TAB */}
                        <div style={styles.tabContainer}>
                            <button
                                onClick={() => setActiveTab('shop')}
                                style={activeTab === 'shop' ? styles.activeTab : styles.inactiveTab}>
                                Shop
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                style={activeTab === 'profile' ? styles.activeTab : styles.inactiveTab}>
                                profile
                            </button>
                        </div>

                        {activeTab === 'shop' && (
                            <div style={styles.settingsContainer}>
                                {/* SHOP */}
                                <div style={styles.shopSection}>
                                    {/* تصویر و توضیحات فروشگاه */}
                                    <img
                                        src={vendorImage}
                                        alt="image"
                                        style={styles.shopImageStyle}
                                    />
                                    <h2 style={styles.shopName}>{vendorData.name}</h2>
                                    <p style={styles.shopDescription}>{vendorData.description}</p>
                                </div>
                                {/* SHOP FORM*/}
                                <form onSubmit={handleVendorUpdate} style={styles.shopForm}>
                                    <div style={styles.shopFormGroup}>
                                        <label style={styles.shopLabel}>Shop Image</label>
                                        <input onChange={handleVendorFileChange} name="image" type="file" style={styles.fileInput} />
                                    </div>
                                    <div style={styles.shopFormGroup}>
                                        <label style={styles.shopLabel}>Full Name</label>
                                        <input onChange={handleVendorChange} name="name" value={vendorData.name} type="text" style={styles.shopInput} />
                                    </div>
                                    <div style={styles.shopFormGroup}>
                                        <label style={styles.shopLabel}>Email</label>
                                        <input value={vendorData.email} readOnly type="email" style={styles.shopInput} />
                                    </div>
                                    <div style={styles.shopFormGroup}>
                                        <label style={styles.shopLabel}>Phone Number</label>
                                        <input value={vendorData.phone} readOnly type="text" style={styles.shopInput} />
                                    </div>
                                    <div style={styles.shopFormGroup}>
                                        <label style={styles.shopLabel}>description</label>
                                        <textarea className='form-control' onChange={handleVendorChange} name="description" value={vendorData.description} type="text" style={styles.shopInput} />
                                    </div>
                                    <button type="submit" style={styles.shopUpdateButton}>
                                        Update Shop
                                    </button>
                                    <Link to={`/vendor/${vendorData.slug}/`}>

                                        <button type="button" /* onClick={handleViewShop} */ style={styles.viewShopButton}>
                                            View Shop
                                        </button>
                                    </Link>
                                </form>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div style={styles.settingsContainer}>
                                {/* PROFILE */}
                                <div style={styles.profileSection}>
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        style={styles.profileImagestyles}

                                    />
                                    <h2 style={styles.userName}>{profileData.full_name}</h2>
                                    <p style={styles.userRole}>{profileData?.about}</p>
                                    <div style={styles.fileUpload}>
                                        <label style={styles.label}>Set Profile Image</label>
                                        <input onChange={handleFileChange} name='image' type="file" style={styles.fileInput} />
                                    </div>
                                </div>
                                {/* PROFILE FORM */}
                                <form onSubmit={handleProfileUpdate} style={styles.form}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Full Name</label>
                                        <input onChange={handleInputChange} name='full_name' value={profileData?.full_name} type="text" style={styles.input} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Email</label>
                                        <input value={profileData?.user?.email} readOnly type="email" style={styles.input} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Phone Number</label>
                                        <input value={profileData?.user?.phone} readOnly type="number" style={styles.input} />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>About Me</label>
                                        <textarea

                                            onChange={handleInputChange}
                                            name='about'
                                            value={profileData?.about}
                                            style={styles.textarea}>
                                        </textarea>
                                    </div>
                                    <button type="submit" style={styles.updateButton}>
                                        Update Profile
                                    </button>

                                </form>
                            </div>
                        )}

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
    tabContainer: {
        display: 'flex',
        maxHeight: '60px',
        maxWidth: '180px',
        padding: '100px',
        justifyContent: 'center',
        marginBottom: '120px',
        textAlign: "center",
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',

        borderRadius: '5px',
        cursor: 'pointer',
    },
    inactiveTab: {
        backgroundColor: '#e9ecef',
        color: '#333',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: '20px',
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
        fontSize: "14px",
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



export default VendorSettings
