import React from 'react'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import moment from 'moment'



function Settings() {

    const [profile, setProfile] = useState({})



    const fetchProfileData = () => {
        apiInstance.get(`user/profile/${UserData()?.user_id}/`).then((res) => {
            setProfile(res.data)

        })
    }

    useEffect(() => {
        fetchProfileData()
    }, [])


    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.files[0]
        })
    }



    const formdata = new FormData()


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        
        const res = await apiInstance.get(`user/profile/${UserData()?.user_id}/`)
            if (profile.image && profile.image !== res.data.image) {
                formdata.append('image', profile.image)
            }

            formdata.append('full_name', profile.full_name )
            /* formdata.append('email', profile.email )
            formdata.append('phone', profile.phone ) */
            formdata.append('address', profile.address )
            formdata.append('city', profile.city )
            formdata.append('state', profile.state )
            formdata.append('country', profile.country )


            try {
                await apiInstance.patch(`user/profile/${UserData()?.user_id}/`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            } catch (error) {
                console.log(error);
                
            }
        
        
    }






    return (
        <div className="container mt-5">
            <h3 className="mb-4">
                <i className="fas fa-cog"></i> Settings
            </h3>

            <form onSubmit={handleFormSubmit}>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">Profile image</label>
                        <input onChange={handleImageChange} name='image'  type="file" className="form-control" id="fullName" />
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input onChange={handleInputChange} name='full_name' value={profile.full_name} type="text" className="form-control" id="fullName" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input readOnly onChange={handleInputChange} value={profile.user?.email} name='email' type="email" className="form-control" id="email" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input onChange={handleInputChange} value={profile.user?.phone} name='phone' type="number" className="form-control" id="mobile" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input onChange={handleInputChange} value={profile.address} name='address' type="text" className="form-control" id="address" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input onChange={handleInputChange} value={profile.city} name='city' type="text" className="form-control" id="city" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input onChange={handleInputChange} value={profile.state} name='state' type="text" className="form-control" id="state" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input onChange={handleInputChange} value={profile.country} name='country' type="text" className="form-control" id="country" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    )
}

export default Settings
