import React, { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData'
import { Link } from 'react-router-dom';
import Orders from './Orders';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


function Account() {

    const [profile, setProfile] = useState({})

    const userData = UserData()




    useEffect(() => {
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
            setProfile(res.data)
            
        })
    }, [])











    const [activeTab, setActiveTab] = useState('Account');
    const renderContent = () => {
        switch (activeTab) {
            case 'Account':
                return <div>Hi <b>{profile.full_name}</b> , welcome to your account dashboard. You can manage your
                    <Link to='/customer/orders'> orders </Link>,
                    <Link to= '/create-new-password/' > change password </Link>
                    and 
                    <Link to= '/customer/account/'> edit account </Link>.
                </div>;

            case 'Orders':
                return <Orders />;

            case 'Wishlist':
                return <div>Your wishlist items are shown here.</div>;

            case 'Notification':
                return <div>Your notifications are displayed here.</div>;

            case 'Settings':
                return <div>Your account settings are here.</div>;

            default:
                return null;
        }
    };

    return (

        <div className='card rounded-5 p-3 m-3'>
            <div style={styles.container}>
                {/* Sidebar */}
                
                <div style={styles.sidebar}>
                    <div style={styles.profile}>
                        <img src={profile.image} alt="Profile" style={styles.profilePic} />
                        <h3>{profile.full_name}</h3>
                        <a href="#edit-account" style={styles.editLink}>Edit Account</a>
                    </div>
                    <ul style={styles.menu}>

                        <li style={styles.menuItem}
                            onClick={() => setActiveTab('Account')}>
                            Account
                        </li>

                        <li style={styles.menuItem}
                            onClick={() => setActiveTab('Orders')}>
                            Orders <span style={styles.badge}>14</span>
                        </li>

                        <li style={styles.menuItem}
                            onClick={() => setActiveTab('Wishlist')}>
                            Wishlist <span style={styles.badge}>14</span>
                        </li>

                        <li style={styles.menuItem}
                            onClick={() => setActiveTab('Notification')}>
                            Notification <span style={styles.badge}>14</span>
                        </li>

                        <li style={styles.menuItem}
                            onClick={() => setActiveTab('Settings')}>
                            Settings
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div style={styles.mainContent}>
                    {renderContent()}
                </div>
            </div>
        </div>

    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f5f5f5',

    },
    sidebar: {
        width: '250px',
        backgroundColor: '#fff',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    profile: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    profilePic: {
        with: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '10px',
        objectfit: 'cover'
    },
    editLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '14px',
    },
    menu: {
        listStyle: 'none',
        padding: 0,


    },
    menuItem: {
        padding: '10px 0',
        cursor: 'pointer',
        fontSize: '16px',
        borderBottom: '1px solid #f0f0f0',
    },
    badge: {
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '12px',
        padding: '2px 8px',
        fontSize: '12px',
        marginLeft: '10px',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#fff',
        marginLeft: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default Account;
