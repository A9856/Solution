import React from 'react'
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <>
        <div classNameName='container'>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                   
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link text-light" to="/state">ManageState</Link>
                            <Link className="nav-link text-light" to="/district">ManageDistrict</Link>
                            <Link className="nav-link text-light" to="/country">ManageCountry</Link>
                            <Link className="nav-link text-light" to="/employee">ManageEmployees</Link>

                        </div>
                    </div>
                </div>
            </nav>
            </div>
        </>
    )
}

export default Navbar
