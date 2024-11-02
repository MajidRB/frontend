import { useState } from 'react'
import apiInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()


    const handleEmailSubmit = async () => {
        try {
            await apiInstance.get(`user/password-reset/${email}/`).then((res) => {   // use backtick!!! `` '' ""
                const { link, message } = (res.data)//GPT
                alert(message)//GPT
                alert("An email has been sent to your eamil"); //make an email system TODO
                /* navigate("/create-new-password/") */
                window.location.href = link;
            })
        } catch (error) {
            console.log(error)
            alert("No Such Email Exist!");
        }

    }


    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }} >
                <h1 className="text-center mb-4">Forgot Password</h1>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email:"
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={handleEmailSubmit}>Reset Password</button>
            </div>
        </div>
    )
}

export default ForgotPassword
