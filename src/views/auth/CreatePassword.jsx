import { useState } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import apiInstance from '../../utils/axios'



function CreatePassword() {

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const [SearchParam] = useSearchParams()
    const otp = SearchParam.get("otp")
    const uidb64 = SearchParam.get("uidb64")

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert("password does not match")
        } else {
            const formdata = new FormData()
            formdata.append('password', password)
            formdata.append('otp', otp)
            formdata.append('uidb64', uidb64)

            try {  // backend/api/views/py : create api view takes a post request
                await apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    console.log(res.data);
                    alert("password changed successfully")
                    navigate("/login")

                })
            } catch (error) {
                console.log(error)
                alert("An error Occured While Trying change password")
            }
        }

    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Create New Password:</h3> <br />
                <div className="mb-3">
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            className='form-control'
                            type="password"
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Enter New Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <input
                            className='form-control'
                            type="password"
                            name='password'
                            id='confirm-password'
                            value={password}
                            placeholder='Confirm New password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <br />
                        <button className="btn btn-primary w-100" type='submit'>Save New password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePassword
