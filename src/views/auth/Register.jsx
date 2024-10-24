import React, { useState, useEffect } from 'react'

import { register } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'



function Register() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn()) // added by gpt default: (((  state.isLoggedIn  ))) GPT



    
    /* useEffect(() => {

        if (isLoggedIn) {
            navigate("/")
        }
    }, []) */ //  [isLoggedIn, navigate] added by gpt default:(((   , []  ))) GPT

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { error } = await register(fullname, email, phone, password, password2,)

        if (error) {
            alert(JSON.stringify(error))
        } else {
            navigate("/") //navigates to HOME (or everewhere you want )
            setIsLoading(false)
        }
    }


    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h2>Register</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Full Name input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Phone Number input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                        type="number"
                        id="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Confirm Password input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>

                {/* Submit button */}
                {isLoading === true
                
                ? <button disabled type="submit" className="btn btn-primary btn-rounded w-100 mb-4">
                    Proccessing... <i className='fas fa-spinner fa-spin' />
                    </button>

                : <button type="submit" className="btn btn-primary btn-rounded w-100 mb-4">
                Register
                </button>
                
                }
                <div className='text-center'>
                    <p>
                        Already have an account? <Link to="/login"> Login</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register






