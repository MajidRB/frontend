
import { Link, useLocation } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react';
import UserData from '../plugin/UserData';




function Sidebar() {


    const [vendorData, setVendorData] = useState([])

    
    const fetchVendorData = () => {
        apiInstance.get(`vendor/shop-settings/${UserData()?.vendor_id}/`).then((res) => {
            setVendorData(res.data)
            
        })
    }


    useEffect(() => {
        
        fetchVendorData()
    }, [])




    const location = useLocation()

    const isActiveLink = (currentPath, LinkPath) => {
        return currentPath.includes(LinkPath)
        //isActiveLink(location.pathname, '/vendor/dashboard')
    }




    return (
        <>
            <div style={styles.sidebar}>
                <Link style={styles.LinkStyles} to={`/vendor/dashboard/`}>
                    <div style={styles.sidebarTitle(isActiveLink(location.pathname, '/vendor/dashboard'))}>Dashboard</div>
                </Link>


                {/*Navigation Links */}
                <div style={styles.navLinks}>
                    <Link style={styles.LinkStyles} to={`/vendor/products/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/products/'))}>Products</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/add-product/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/add-product/'))}>Add Products</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/orders/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/orders/'))}>Orders</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/earning/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/earning/'))}>Earning</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/reviews/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/reviews/'))}>Reviews</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/faq/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/faq/'))}>FAQs</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/coupon/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/coupon/'))}>Coupon & Discount</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/customers/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/customers/'))}>Customers</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/notifications/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/notifications/'))}>Notifications</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/message/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/message/'))}>Message</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/settings/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/settings/'))}>Settings</div>
                    </Link>
                    <Link style={styles.LinkStyles} to={`/vendor/logout/`}>
                        <div style={styles.navItem(isActiveLink(location.pathname, '/vendor/logout/'))}>Logout</div>
                    </Link>
                </div>

                {/*User Info */}
                <div style={styles.userInfo}>
                    <div style={styles.userName}>{vendorData.name}</div>
                    <div style={styles.userHandle}>HyperSofal</div>
                </div>
            </div>
        </>
    )
}

const styles = {
    sidebar: {
        width: '250px',
        backgroundColor: '#20232a',
        color: 'white',
        padding: '20px'
    },
    sidebarTitle: (isActiveLink) => ({
        fontSize: '24px',
        marginBottom: '20px',
        padding: '1vh',
        paddingLeft: '2vh',
        textDecoration: 'none',
        borderRadius: '8px',
        color: isActiveLink ? 'black' : 'white',
        fontWeight: isActiveLink ? 'bold' : 'normal',
        backgroundColor: isActiveLink ? 'gold' : 'inherit',
    }),
    navLinks: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        textDecoration: 'none',
        color: 'white',

    },
    LinkStyles: {
        textDecoration: 'none',
        color: 'white',
    },
    navItem: (isActiveLink) => ({
        padding: '12px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        textDecoration: 'none',
        fontWeight: isActiveLink ? 'bold' : 'normal',
        backgroundColor: isActiveLink ? 'blue' : 'inherit',

    }),
    userInfo: {
        marginTop: '50px'
    },
    userName: {
        fontSize: '18px'
    },
    userHandle: {
        color: '#888',
        fontSize: '14px'
    },
}



export default Sidebar
