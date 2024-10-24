
import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  })

  const resetForm = () => {
    setEmail("")
    setPassword("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await login(email, password)
    if (error) {
      alert(error)
      setIsLoading(false)

    } else {
      navigate("/")
      resetForm()
      setIsLoading(false)
    }
  }



  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Your Account</h2>
      <p className="text-center mb-4">Please log in to continue</p>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="login-password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="text-center">
          <Link to={'/forgot-password'} className="link-primary">Forgot your password?</Link>
        </div>
        <br />
        {isLoading === true
          ? <button disabled type="submit" className="btn btn-primary btn-rounded w-100 mb-4">
            Proccessing... <i className='fas fa-spinner fa-spin' />
          </button>
          : <button type="submit" className="btn btn-primary btn-rounded w-100 mb-4">
            Login
          </button>
        }
        <br />
        <div className="text-center">
          not a member?
          <Link to={'/register'} className="link-primary"> Register </Link>
        </div>
        <br />
      </form>
      
      <br />
    </div>

  )
}

export default Login






