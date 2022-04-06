import { useState, useEffect } from "react";
import axios from "axios";

export default function Pelanggaran() {
  let [pelanggaran, dataPelanggaran] = useState([]);

  //get the token from localstorage
  let token = localStorage.getItem(`token-pelanggaran`);
  //
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // create function to get data pelanggaran from backend

  let getData = () => {
    // akses ke backend untuk proses menampilkan data
    // method : GET
    // endpoint : http://localhost:8000/pelanggaran
    // request : none
    // response : array data pelanggaran
    // authorization : bearer token

    // define endpoint
    let endpoint = "http://localhost:8000/pelanggaran";

    // sending data
    axios.get(endpoint, authorization)
      .then((response) => {
        // simpan di state pelanggaran
        dataPelanggaran(response.data.Pelanggaran);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid" style={{fontFamily:'poppins'}}>
      <div className="card m-2">
        <div className="card-body bg-info">
          <h2 className="text-white">Jenis Pelanggaran</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {pelanggaran.map(item => (
              <li className="list-group-item">
              <div className="row">
                <div className="col-3">
                  <small className="text-info">ID Pelanggaran</small>
                  <h5>{item.id_pelanggaran}</h5>
                </div>
                <div className="col-6">
                  <small className="text-info">Jenis Pelanggaran</small>
                  <h5>{item.nama_pelanggaran}</h5>
                </div>
                <div className="col-3">
                  <small className="text-info">Poin Pelanggaran</small>
                  <h5>{item.poin}</h5>
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
