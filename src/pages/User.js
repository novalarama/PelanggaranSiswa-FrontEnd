import { useState, useEffect } from "react";
import axios from "axios";

export default function User() {
  let [User, dataUser] = useState([]);

  //get the token from localstorage
  let token = localStorage.getItem(`token-pelanggaran`);
  //
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // create function to get data User from backend

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
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid rounded" style={{fontFamily:'poppins'}}>
      <div className="card m-2">
        <div className="card-body bg-warning">
          <h2 className="text-dark">Daftar User</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {User.map(item => (
              <li className="list-group-item">
              <div className="row">
                <div className="col-2">
                  <small className="text-secondary">ID User</small>
                  <h5>{item.id_user}</h5>
                </div>
                <div className="col-5">
                  <small className="text-secondary">Nama User</small>
                  <h5>{item.nama_user}</h5>
                </div>
                <div className="col-5">
                  <small className="text-secondary">Username User</small>
                  <h5>{item.username}</h5>
                </div>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
