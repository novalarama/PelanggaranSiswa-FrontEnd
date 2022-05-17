import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

import Navbar from "../component/Navbar";
import NewNavbar from "../component/NewNavbar";

export default function ListPelanggaranSiswa() {
  let [list, setList] = useState([]);
  let [message, setMessage] = useState("")

  let token = localStorage.getItem("token-pelanggaran");
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getList = () => {
    let endpoint = `http://localhost:8000/pelanggaran_siswa`;

    axios
      .get(endpoint, authorization)
      .then((result) => {
        setList(result.data.Pelanggaran);
      })
      .catch((error) => console.log(error));
  };

  let isiData = () => {
    window.location = "./pelanggaranSiswa";
  };

  let showToast = message => {
    let myToast = new Toast(
      document.getElementById(`myToast`),
        {
          autohide: true
        }
      )
      /** perintah utk mengisi state 'message */
      setMessage(message)

      /** show Toast */
      myToast.show()
  }

  let hapusData = item => {
    if(window.confirm(`Are you sure want to delete this data?`)){
      let endpoint = `http://localhost:8000/pelanggaran_siswa/${item.id_pelanggaran_siswa}`

      //sending data
      axios.delete(endpoint, authorization)
      .then(response => {
        showToast(response.data.message)
        getList()
      })
      .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container" style={{ fontFamily: "Plus Jakarta Display" }}>
      <Navbar />
       {/* start component toast untuk menggantikan alert*/}
       <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-success text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      {/* end component toast */}
      <div
        className="card-header form-control rounded-3"
        style={{ background: `#036666` }}
      >
        <div className="row">
          <div className="col-lg-10">
            <h2 className="text-white mx-2 my-2">
              <b>List Pelanggaran Siswa</b>
            </h2>
          </div>
          <div className="col-lg-2">
            <button
              className="btn btn-success justify-content-end mx-2 my-2"
              onClick={() => isiData()}
            >
              <span className="fa fa-plus"></span>Tambah Data
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0 mt-2">
        {list.map((item) => (
          <ul className="list-group list-group-flush mt-2">
            <li
              className="list-group-item rounded-3"
              key={`key${item.id_pelanggaran_siswa}`}
              style={{ background: `#358f80` }}
            >
              <div className="row" >
                <div className="col-1 mx-auto align-items-center">
                  <h1 className="text-white">
                    <b>{item.id_pelanggaran_siswa}</b>
                  </h1>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-lg-2 text-white">
                      <small>Siswa</small>
                      <h5>{item.siswa.nama}</h5>
                    </div>
                    <div className="col-lg-2 text-white">
                      <small>Poin Siswa</small>
                      <h5>{item.siswa.poin}</h5>
                    </div>
                    <div className="col-lg-4 text-white">
                      <small>Pelanggaran</small>
                      <ul>
                        {item.detail_pelanggaran_siswa.map((detailItem) => (
                          <li key={`idDetail${detailItem.id_pelanggaran_siswa}`}>
                            <h5>{detailItem.pelanggaran.nama_pelanggaran}</h5>
                            <small>
                              <i>dengan poin {detailItem.pelanggaran.poin}</i>
                            </small>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-2 text-white">
                      <small>Tanggal</small>
                      <h5>{item.createdAt}</h5>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="col-lg-12 text-white">
                    <small>Actions</small>
                    <br />
                    <button className="btn btn-primary btn-sm mt-2 me-2">
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-danger btn-sm mt-2" onClick={() => hapusData(item)}>
                      <span className="fa fa-trash" ></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
