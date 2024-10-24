import React, { useState } from 'react'
import { useAuthStore } from "../../store/auth"
import { Link, useNavigate } from 'react-router-dom'
import UserData from '../plugin/UserData'
import apiInstance from '../../utils/axios'




function TopBar() {

    const userData = UserData()
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,


    ])



    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        console.log(search);
    }


    const handleSearchSubmit = () => {
        navigate(`/search?query=${search}`)
    }














    return (
        <div>
            <div className="container-fluid">
                <div className="row py-1 px-xl-5">
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="d-inline-flex align-items-center h-100">
                            <a className="text-body mr-3 ms-3" href=""> About </a>
                            <a className="text-body mr-3 ms-3" href=""> Contact </a>
                            <a className="text-body mr-3 ms-3" href=""> Help </a>
                            <a className="text-body mr-3 ms-3" href=""> FAQs </a>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">

                            {isLoggedIn()
                                ?
                                <>
                                    <Link className='mx-2 btn btn-primary' to="/logout" type="button">Logout</Link>
                                    <Link className='mx-2 btn btn-primary' to="/dashboard" type="button">{userData?.username}-Dashboard</Link>
                                </>
                                :
                                <>
                                    <Link className='mx-2 btn btn-primary' to="/register" type="button">Sign up</Link>
                                    <Link className='mx-2 btn btn-primary' to="/login" type="button">Sign in</Link>
                                </>
                            }
                            <div className="btn-group mx-2">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">USD</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">EUR</button>
                                    <button className="dropdown-item" type="button">GBP</button>
                                    <button className="dropdown-item" type="button">CAD</button>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">FR</button>
                                    <button className="dropdown-item" type="button">AR</button>
                                    <button className="dropdown-item" type="button">RU</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            <a href="" className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                            </a>
                            <a href="" className="btn px-0 ml-2">
                                <i className="fas fa-shopping-cart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <a href="/" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">HYPER </span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">SOFAL</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search for products" 
                                onChange={handleSearchChange} />
                                <div className="input-group-append">
                                    <span className="rounded-1">
                                        <button className='btn btn-outline-success me-2' type='button' onClick={handleSearchSubmit}>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                        <p className="m-0">Customer Service</p>
                        <h5 className="m-0">+012 345 6789</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
