import { useEffect } from 'react'
import { logout } from '../../utils/auth'
import { Link } from 'react-router-dom'


function Logout() {
    useEffect(() => {
        logout()
    }, [])
    return (
        <div className="container mt-5 " >
            <h2 className="text-center mb-4">You have been loggedOut!!</h2>
            <p className="text-center mb-4">Please log in to continue</p>
            <div className='d-flex justify-content-center'>

                <Link to={'/register'} className='btn btn-primary' >Register <i className='fas fa-user-plus'> </i></Link>

                <Link to={'/login'} className='btn btn-primary ms-2' >Login <i className='fas fa-sign-in'> </i></Link>
            </div>

            <br />
            <br />
        </div>
    )
}

export default Logout







/* 
 */