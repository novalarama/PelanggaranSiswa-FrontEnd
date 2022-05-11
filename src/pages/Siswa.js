import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function Siswa() {
  let [siswa, setSiswa] = useState([]);

  let [idSiswa, setIdSiswa] = useState("");
  let [nis, setNis] = useState("");
  let [nama, setNama] = useState("");
  let [kelas, setKelas] = useState("");
  let [poin, setPoin] = useState(0);
  let [gambar, setGambar] = useState(null);
  let [uploadGambar, setUploadGambar] = useState(true);

  let [action, setAction] = useState("");
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);

  /** get token from local storage */
  let token = localStorage.getItem(`token-pelanggaran`);

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getSiswa = () => {
    let endpoint = `http://localhost:8000/siswa`;

    axios
      .get(endpoint, authorization)
      .then((response) => {
        setSiswa(response.data.Siswa);
      })
      .catch((error) => console.log(error));
  };

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

  let tambahData = () => {
    // display modal
    modal.show();

    // mengosongkan inputan form nya
    setIdSiswa(0);
    setNis("");
    setNama("");
    setKelas("");
    setPoin(0);
    setGambar(null);
    setAction("insert");
    setUploadGambar(true);
  };

  let editData = (item) => {
    // display modal
    modal.show();

    // isi form sesuai data yg dipilih
    setIdSiswa(item.id_siswa);
    setNis(item.nis);
    setNama(item.nama);
    setKelas(item.kelas);
    setPoin(item.poin);
    setGambar(null);
    setAction(`edit`);
    setUploadGambar(false);
  };

  let hapusData = (item) => {
    if (window.confirm(`Are you sure want to delete this data?`)) {
      let endpoint = `http://localhost:8000/siswa/${item.id_siswa}`;

      //sending data
      axios
        .delete(endpoint, authorization)
        .then(response => {
          showToast(response.data.message);
          getSiswa();
        })
        .catch(error => console.log(error));
    }
  };

  let simpanData = (event) => {
    event.preventDefault();
    // close modal
    modal.hide();
    if (action === "insert") {
      let endpoint = `http://localhost:8000/siswa`;
      let request = new FormData();
      request.append(`nis`, nis);
      request.append(`nama`, nama);
      request.append(`kelas`, kelas);
      request.append(`poin`, poin);
      request.append(`image`, gambar);

      // send data
      axios
        .post(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getSiswa();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      let endpoint = `http://localhost:8000/siswa/${idSiswa}`;
      let request = new FormData();
      request.append(`nis`, nis);
      request.append(`nama`, nama);
      request.append(`kelas`, kelas);
      request.append(`poin`, poin);
      if(uploadGambar === true){
        request.append(`image`, gambar);
      }

      // sending data utk update pelanggaran
      axios
        .put(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getSiswa();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    let myModal = new Modal(document.getElementById(`modal-siswa`));
    setModal(myModal);
    getSiswa();
  }, []);

  return (
    <div className="container-fluid" style={{ fontFamily: "poppins" }}>
      {/* start component toast untuk menggantikan alert*/}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-success text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      {/* <div className="row card"> */}
      <div className="card-header " style={{ background: `#036666` }}>
        <div className="row">
          <div className="col-lg-8">
            <h2 className="text-white mx-2 my-2">Daftar Siswa</h2>
          </div>
          <div className="col-lg-4">
            <button className="btn btn-success justify-content-end" onClick={() => tambahData()}>
              <span className="fa fa-plus"></span>Tambah Siswa
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0" style={{ background: `#99e2b4` }}>
        {siswa.map((item) => (
          <div className="col-4 ">
            <div className="card-body" style={{ background: `#99e2b4` }}>
              <ul className="list-group  list-group-flush">
                <li
                  className="list-group-item rounded-3 d-flex justify-content-around"
                  key={`key${item.id_siswa}`}
                  style={{ background: `#358f80` }}
                >
                  <div className="row align-items-center">
                    <div className="col-lg-4 text-white">
                      <img
                        src={`http://localhost:8000/image/${item.image}`}
                        alt="Gambar Siswa"
                        className="rounded-circle"
                        style={{ width: `100%` }}
                      />
                    </div>
                    <div className="col-lg-8 text-white">
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
                      <small className="text-light">Options</small>
                      <br />
                      <button
                        className="btn btn-primary btn-sm m-2"
                        onClick={() => editData(item)}
                      >
                        <span className="fa fa-edit"></span>
                      </button>
                      <button
                        className="btn btn-danger btn-sm m-2"
                        onClick={() => hapusData(item)}
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

             
            </div>
          </div>
        ))}

<div className="modal" id="modal-siswa">
                <div className="modal-dialog modal-md">
                  <div className="modal-content">
                    <div className="modal-header bg-success">
                      <h4 className="text-white">Form Siswa</h4>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={(ev) => simpanData(ev)}>
                        NIS
                        <input
                          type="number"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setNis(e.target.value)}
                          value={nis}
                        />
                        Nama
                        <input
                          type="text"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setNama(e.target.value)}
                          value={nama}
                        />
                        Kelas
                        <input
                          type="text"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setKelas(e.target.value)}
                          value={kelas}
                        />
                        Poin
                        <input
                          type="number"
                          className="form-control mb-2"
                          required
                          onChange={(e) => setPoin(e.target.value)}
                          value={poin}
                        />
                        Gambar
                        <input
                          type="file"
                          className={`form-control mb-2 ${uploadGambar ? `` : `d-none`}`}
                          required={uploadGambar}
                          accept="image/*"
                          onChange={(e) => setGambar(e.target.files[0])}
                        />

                        <button type="button" className={`btn btn-dark btn-sm ${uploadGambar ? `d-none` : ``}`} onClick={() => setUploadGambar(true)}>
                          Click to re-upload image
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
