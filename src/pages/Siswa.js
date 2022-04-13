import { useState, useEffect } from "react";
import axios from "axios";
export default function Siswa() {
  let [siswa, setSiswa] = useState([]);

  /** get token from local storage */
  let token = localStorage.getItem(`token-pelanggaran`);

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getData = () => {
    let endpoint = `http://localhost:8000/siswa`;

    axios
      .get(endpoint, authorization)
      .then((response) => {
        setSiswa(response.data.Siswa);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid" style={{ fontFamily: "poppins"}}>
      {/* <div className="row card"> */}
        <div className="card-header " style={{ background: `#036666` }}>
          <h2 className="text-white mx-2 my-2">Daftar Siswa</h2>
        </div>
        <div className="row mx-0" style={{background: `#99e2b4` }}>
        {siswa.map((item) => (
          <div className="col-4 ">
            <div className="card-body" style={{background: `#99e2b4` }}>
              <ul className="list-group  list-group-flush">
                <li
                  className="list-group-item rounded-3 d-flex justify-content-around"
                  key={`key${item.id_siswa}`}
                  style={{ background: `#358f80` }}
                >
                  <div className="row align-items-center">
                    <div className="col-4 text-white">
                      <img
                        src={`http://localhost:8000/image/${item.image}`}
                        alt="Gambar Siswa"
                        className="rounded-circle"
                        style={{ width: `100%` }}
                      />
                    </div>
                    <div className="col-8 text-white">
                      <small className="text-light">Nama</small>
                      <h5>
                        <b>{item.nama}</b>
                      </h5>
                      <small className="text-light">Kelas</small>
                      <h5>
                        <b>{item.kelas}</b>
                      </h5>
                      <small className="text-light">Poin</small>
                      <h5>
                        <b>{item.poin}</b>
                      </h5>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}
        </div>
      {/* </div> */}
    </div>
  );
}
