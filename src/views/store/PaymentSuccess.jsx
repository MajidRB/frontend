import { useState, useEffect } from 'react'
import apiInstance from '../../utils/axios'
import { useParams } from 'react-router-dom'

function PaymentSuccess() {

    const [order, setOrder] = useState([])
    const [status, setStatus] = useState("Verifying")

    const param = useParams()

    const urlParam = new URLSearchParams(window.location.search)
    const sessionId = urlParam.get("session_id")

    useEffect(() => {
        apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
            setOrder(res.data)
        })
    }, [])

    useEffect(() => {
        const formdata = new FormData()
        formdata.append("order_id", param?.order_oid)
        formdata.append("session_id", sessionId)

        setStatus("Verifying")

        apiInstance.post(`payment-success/${param.order_oid}`, formdata).then((res) => {
            if (res.data.message == "Payment Successfull") {
                setStatus("Payment Successfull")
            }
            if (res.data.message == "Already Paid") {
                setStatus("Already Paid")
            }
            if (res.data.message == "Your Invoice is Unpaid") {
                setStatus("Your Invoice is Unpaid")
            }
            if (res.data.message == "Your invoice is canceled") {
                setStatus("Your invoice is canceled")
            }
        })
    }, [param?.order_oid])






    return (
        <div>
            {status === "Your invoice is canceled" &&
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: '#f4f4f9',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '60px auto'
                }}>
                    <h1 className='mb-0' style={{ fontSize: '2.5rem', color: '#227236' }}>Your invoice is canceled <i className='fas fa-spinner fa-spin'></i> </h1>
                    <br /> <p className='mt-0'></p>
                    <br /> <b className='text-danger'>NOTE: Your invoice is canceled</b>
                </div>
            }

            {status === "Your Invoice is Unpaid" &&
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: '#f4f4f9',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '60px auto'
                }}>
                    <h1 className='mb-0' style={{ fontSize: '2.5rem', color: '#227236' }}>UNPAID <i className='fas fa-spinner fa-spin'></i> </h1>
                    <br /> <p className='mt-0'></p>
                    <br /> <b className='text-danger'>NOTE: pay again</b>
                </div>
            }

            {status === "Already Paid" &&
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: '#f4f4f9',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '60px auto'
                }}>
                    <h1 className='mb-0' style={{ fontSize: '2.5rem', color: '#227236' }}>Already Paid <i className='fas fa-spinner fa-spin'></i> </h1>
                    <br /> <p className='mt-0'></p>
                    <br /> <b className='text-danger'>NOTE: yo invoice is paid!</b>
                </div>
            }

            {status === "Verifying" &&
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: '#f4f4f9',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '60px auto'
                }}>
                    <h1 className='mb-0' style={{ fontSize: '2.5rem', color: '#227236' }}>Verifying your payment <i className='fas fa-spinner fa-spin'></i> </h1>
                    <br /> <p className='mt-0'>Please hold on while we are Verifying you payment</p>
                    <br /> <b className='text-danger'>NOTE: DO NOT reload or leave this page</b>

                </div>
            }

            {status === "Payment Successfull" &&
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: '#f4f4f9',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    margin: '60px auto'
                }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#4CAF50' }}>Payment Successful!</h1>
                    <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>
                        Thank you for your payment. Your transaction was completed successfully.
                        Please save your order id: <b>#{order.oid}</b> <br />
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>
                        we have sent an order summary to your email addres <br /> ( <b>{order.email}</b> )
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>
                        we have also sent an order summary to you phone <br /> ( <b> {order.phone} </b> )
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            color: '#fff',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                            onClick={() => alert('Downloading invoice...')}>
                            Download Invoice
                        </button>
                        <button style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            color: '#fff',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                            onClick={() => alert('Displaying order...')}>
                            View Order
                        </button>
                        <button style={{
                            padding: '10px 20px',
                            fontSize: '1rem', color: '#fff',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                            onClick={() => alert('Redirecting to home...')}>
                            Go to Home
                        </button>
                    </div>
                </div>
            }
        </div>





    )
}

export default PaymentSuccess
