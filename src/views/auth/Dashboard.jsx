import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])
    return (

        <div>
            {/* if statement on return() function ? :  */}

            {isLoggedIn()
                ? <div>
                    <h1>DASHBOARD  majid is loged in True</h1>
                    <Link to={'/logout'}>Logout</Link>
                </div>
                : <div>
                    <h1>Home page</h1>
                    <div className="d-flex">
                        <Link className='btn btn-primary' to={'/register'}>Register</Link> <br />
                        <Link className='btn btn-primary ms-4' to={'/login'}>Login</Link>
                    </div>
                </div>
            }
            <br />
            <br />
            <h3>MAJID</h3>
        </div>
    )
}

export default Dashboard
