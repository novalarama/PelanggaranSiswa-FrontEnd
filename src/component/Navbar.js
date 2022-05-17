import React from "react"
import {Link} from "react-router-dom"
import "../App.css"

export default function Navbar(props){
    let Logout = () =>{
        localStorage.removeItem("token-pelanggaran")
        localStorage.removeItem("user-pelanggaran")
        window.location = "/signin"
    }

    return(
        <div className="navbar navbar-expand-lg bg-transparent navbar-light" style={{fontFamily:"Plus Jakarta Display"}}>
            <div className="container" style={{background:"023e8a"}}>
            <div className="col-4 mx-2">
                    <a className="navbar-brand">
                        <b>TATIB.</b>
                    </a>
            </div>

            <div className="col-6 d-flex justify-content-center">
                    
                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
 
                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link id="daftarPelanggaran" to="/list" className="nav-link">
                                Daftar Pelanggaran
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  id="siswa" to="/siswa" className="nav-link">
                                Siswa
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link  id="user" to="/user" className="nav-link">
                                User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link id="pelanggaran" to="/pelanggaran" className="nav-link">
                                Pelanggaran
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-2">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                            <button className="btn btn-success text-dark bg-transparent" type="submit" onClick={() => Logout()}>
                                <span className="fa-solid fa-right-from-bracket"></span> Logout
                            </button>
                        </li>
                </ul>
            </div>
            </div>        
        </div>
    )
}