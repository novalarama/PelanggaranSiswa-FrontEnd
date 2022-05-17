import { useState, useEffect } from "react";
import axios from "axios";
import {Toast, Modal} from "bootstrap"

import Navbar from "../component/Navbar"

export default function User() {
  if(!localStorage.getItem(`token-pelanggaran`)){
    window.location=`./signin`
  }
  let [User, dataUser] = useState([]);

  let [idUser, setIdUser] = useState(0);
  let [namaUser, setNamaUser] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [ubahPassword, setUbahPassword] = useState(true);

  let [action, setAction] = useState("");
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);

  //get the token from localstorage
  let token = localStorage.getItem(`token-pelanggaran`);
  //
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // create function to get data User from backend

  /** create function to show Toast */
  let showToast = (message) => {
    let myToast = new Toast(document.getElementById(`myToast`), {
      autohide: true,
    });
    /** perintah utk mengisi state 'message */
    setMessage(message);

    /** show Toast */
    myToast.show();
  };

  let getData = () => {
    // akses ke backend untuk proses menampilkan data
    // method : GET
    // endpoint : http://localhost:8000/user
    // request : none
    // response : array data user
    // authorization : bearer token

    // define endpoint
    let endpoint = "http://localhost:8000/user";

    // sending data
    axios.get(endpoint, authorization)
      .then((response) => {
        // simpan di state User
        dataUser(response.data.User);
      })
      .catch((error) => console.log(error));
  };

  let tambahData = () => {
    // display modal
    modal.show()

    // mengosongkan inputan form nya
    setIdUser(0)
    setNamaUser("")
    setUsername("")
    setPassword("")
    setAction('insert')
  }

  let editData = item => {
    // display modal
    modal.show()

    // isi form sesuai data yg dipilih
    setIdUser(item.id_user)
    setNamaUser(item.nama_user)
    setUsername(item.username)
    setPassword(item.password)
    setAction(`edit`)
  }

  let simpanData = event => {
    event.preventDefault()
    // close modal
    modal.hide()
    if (action === "insert") {
      let endpoint = `http://localhost:8000/user`
      let request = {
        nama_user: namaUser,
        username: username,
        password:password
      }

      // send data
      axios.post(endpoint, request, authorization)
      .then(response => {
        showToast(response.data.message)
        // refresh data pelanggaran
        getData()
      })
      .catch(error => console.log(error))
    } else if (action === "edit") {
        let endpoint = `http://localhost:8000/user/${idUser}`
        let request = {
          nama_user: namaUser,
          username: username,
          password : ubahPassword === true ? "password" : "password"
        }

        // sending data utk update pelanggaran
        axios.put(endpoint, request, authorization)
        .then(response => {
          showToast(response.data.message)
          // refresh data pelanggaran
          getData()
        })
        .catch(error => console.log(error))
    }
  }

  let hapusData = item => {
    if(window.confirm(`Are you sure want to delete this data?`)){
      let endpoint = `http://localhost:8000/user/${item.id_user}`

      //sending data
      axios.delete(endpoint, authorization)
      .then(response => {
        showToast(response.data.message)
        getData()
      })
      .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    let modal = new Modal(
      document.getElementById("modal-user")
    )
    setModal(modal)
    getData();
  }, []);

  return (
    <div className="container rounded" style={{fontFamily:'Plus Jakarta Display'}}>
      {/* start component toast untuk menggantikan alert*/}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-success text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>

      <Navbar />
      {/* <div className="card m-2"> */}
        <div className="card-header rounded-3" style={{ background: `#036666` }}>
        <div className="row">
          <div className="col-lg-10">
            <h2 className="text-white mx-2 my-2"><b>Daftar User</b></h2>
          </div>
          <div className="col-lg-2">
            <button className="btn btn-success justify-content-end mx-2 my-2" onClick={() => tambahData()}>
              <span className="fa fa-plus"></span>Tambah User
            </button>
          </div>
        </div>
        </div>
        <div className="card-body" style={{ background: `#99e2b4` }}>
          <ul className="list-group">
            {User.map(item => (
              <li className="list-group-item rounded-2" style={{ background: `#358f80` }}>
              <div className="row">
                <div className="col-lg-1 text-white">
                  <small>ID User</small>
                  <h5>{item.id_user}</h5>
                </div>
                <div className="col-lg-4 text-white">
                  <small>Nama User</small>
                  <h5>{item.nama_user}</h5>
                </div>
                <div className="col-lg-4 text-white">
                  <small>Username User</small>
                  <h5>{item.username}</h5>
                </div>
                <div className="col-lg-3 text-white">
                  <small>Action</small>
                    <br />
                    <button className="btn btn-sm btn-warning"
                    onClick={() => editData(item)}>
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-sm btn-danger mx-2"
                    onClick={() => hapusData(item)}>
                      <span className="fa fa-trash"></span>
                    </button>
                </div>
              </div>
            </li>
            ))}
          </ul>

          <div className="modal" id="modal-user">
                <div className="modal-dialog modal-md">
                  <div className="modal-content">
                    <div className="modal-header bg-success">
                      <h4 className="text-white">Form Siswa</h4>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={(ev) => simpanData(ev)}>
                        Nama
                        <input
                          type="text"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setNamaUser(e.target.value)}
                          value={namaUser}
                        />
                        Username
                        <input
                          type="text"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                        Password
                        <input
                          type="text"
                          className={`form-control mb-2 ${ubahPassword ? `` : `d-none`}`}
                          required={ubahPassword}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />

                        <button type="button" className={`btn btn-dark btn-sm ${ubahPassword ? `d-none` : ``}`} onClick={() => setUbahPassword(true)}>
                          Click to change password
                        </button>
                        <br />

                        <button
                          type="submit"
                          className="btn btn-outline-success"
                        >
                          <span className="fa fa-check"></span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      {/* </div> */}
    </div>
  );
}
