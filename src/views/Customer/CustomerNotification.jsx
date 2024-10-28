import React from 'react'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import moment from 'moment'





function CustomerNotification() {

    const [notifications, setNotifications] = useState([])

    const fetchNoti = () => {
        apiInstance.get(`customer/notification/${UserData().user_id}/`).then((res) => {
            setNotifications(res.data)
            console.log( "fetchNoti===>", res.data);

        })
    }

    useEffect(() => {
        fetchNoti()
    }, [])


    const MarkNotiAsSeen = (notiId) => {
        apiInstance.get(`customer/notification/${UserData().user_id}/${notiId}/`).then((res) => {
            

        })
        console.log(notiId);
        
        fetchNoti()

        Swal.fire({
            icon: "success",
            text: "Notification Marked as seen!"
        })

    }



    return (

        <div className="row">

            <main className="col-lg-9 mt-1">
                <section className="mb-5">
                    <div className="container px-4">
                        {/* عنوان صفحه */}
                        <section className="mb-3">
                            <h3>Notifications <i className='fas fa-bell'></i> </h3>

                        </section>
                        {notifications?.map((noti, index) => (
                            <div className="list-group pb-3" key={index}>
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Order Confirmed</h5>
                                        <small>{moment(noti.date).format("MMM D YYYY")}</small>
                                    </div>
                                    <p className="mb-1">Your order has been confirmed.</p>
                                    <small>And some small print. </small>
                                    <button onClick={() => MarkNotiAsSeen(noti.id)} className='btn btn-secondary'>
                                        got it!
                                        <i className='fas fa-eye'> </i>
                                    </button>
                                </a>
                            </div>
                        ))}
                        {notifications.length < 1 &&
                            <h4 className='text-center p-5'>  There is no Notification. </h4>
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default CustomerNotification
