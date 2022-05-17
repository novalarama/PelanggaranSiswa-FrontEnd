import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

export default function NewNavbar() {
    let Logout = () =>{
        localStorage.removeItem("token-pelanggaran")
        localStorage.removeItem("user-pelanggaran")
        window.location = "/signin"
    }
  return (
    <div className="navbar navbar-expand-lg">
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-div">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <div className="site-navbar" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-11 col-xl-2">
              <h1 className="mb-0 site-logo">
                <a href="index.html" className="text-white mb-0">
                  Brand
                </a>
              </h1>
            </div>
            <div className="col-12 col-md-10 d-none d-xl-block">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className="active">

                      <span>
                          <Link id="dashboard" to="/dashboard" className="nav-link">
                            <b>Dashboard</b>
                          </Link>
                      </span>
                    
                  </li>
                  <li>
                  <span>
                          <Link id="daftarPelanggaran" to="/list" className="nav-link">
                            <b>Daftar Pelanggaran</b>
                          </Link>
                      </span> 
                  </li>
                  <li>
                  <Link id="siswa" to="/siswa" className="nav-link">
                            <b>Siswa</b>
                          </Link>
                  </li>
                  <li>
                    <Link id="user" to="/user" className="nav-link">
                            <b>User</b>
                          </Link>
                  </li>
                  <li>
                  <Link id="pelanggaran" to="/pelanggaran" className="nav-link">
                            <b>Pelanggaran</b>
                          </Link>
                  </li>
                </ul>
              </nav>
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
      </div>
    </div>
  );
}
