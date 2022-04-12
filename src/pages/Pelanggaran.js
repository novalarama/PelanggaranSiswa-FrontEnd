import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function Pelanggaran() {
  let [pelanggaran, dataPelanggaran] = useState([]);
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null)
  let [id, setId] = useState(0)
  let [nama, setNama] = useState("")
  let [poin, setPoin] = useState(0)
  let [action, setAction] = useState("")

  //get the token from localstorage
  let token = localStorage.getItem(`token-pelanggaran`);
  //
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // create a function to show toast
  let show = (message) => {
    let myToast = new Toast(document.getElementById("myToast"), {
      autohide: true,
    });
    // perintah utk mengisi state 'message'
    setMessage(message);

    // show the toast
    myToast.show();
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
    axios
      .get(endpoint, authorization)
      .then((response) => {
        // simpan di state pelanggaran
        dataPelanggaran(response.data.Pelanggaran);

        //call showToast
        show(`Data Pelanggaran berhasil dimuat`);
      })
      .catch((error) => console.log(error));
  };

  let tambahData = () => {
    modal.show()
    // mengosongkan inputan form
    setId(0)
    setNama("")
    setPoin(0)
    setAction('insert')
  }

  let editData = (item) => {
    modal.show()

    setId(item.id)
    setNama(item.nama_pelanggaran)
    setPoin(item.poin)
    setAction(`edit`)
  }

  let simpanData = event => {
    event.preventDefault()
    //close moda
    modal.hide()
    if(action === `insert`){
      let endpoint = `http://localhost:8000/pelanggaran`
      let request = {
        nama_pelanggaran: nama,
        poin: poin
      }

      //sending
      axios.post(endpoint, request, authorization)
      .then(response => {
        show(response.data.message)
        //refreshdata
        getData()
      })
      .catch(error => console.log(error))
    }else if(action === `edit`){

    }
  }

  useEffect(() => {
    let modal = new Modal(document.getElementById(`modalPelanggaran`)
    )
    setModal(modal)
    getData();
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
      {/* end component toast */}
      <div className="card m-2">
        <div className="card-body bg-info">
          <h2 className="text-white">Jenis Pelanggaran</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {pelanggaran.map((item) => (
              <li className="list-group-item">
                <div className="row">
                  <div className="col-2">
                    <small className="text-info">ID</small>
                    <h5>{item.id_pelanggaran}</h5>
                  </div>
                  <div className="col-6">
                    <small className="text-info">Jenis Pelanggaran</small>
                    <h5>{item.nama_pelanggaran}</h5>
                  </div>
                  <div className="col-2">
                    <small className="text-info">Poin</small>
                    <h5>{item.poin}</h5>
                  </div>
                  <div className="col-2">
                    <small className="text-info">Action</small>
                    <br />
                    <button className="btn btn-sm btn-warning"
                    onClick={() => editData(item)}>
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-sm btn-danger mx-2">
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* button tambah  */}
          <button className="btn btn-sm btn-success mt-3"
          onClick={() => tambahData()}>
            <span className="fa fa-plus"></span> Tambah Data
          </button>

          {/* Add modals for create new data */}
          <div className="modal" id="modalPelanggaran">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header bg-info">
                  <h4 className="text-white">Add New Pelanggaran</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={ev => simpanData(ev)}>
                    Jenis Pelanggaran
                    <input type="text" className="form-control mb-2" required
                    onChange={e => setNama(e.target.value)}
                    value={nama}/>

                    Poin Pelanggaran
                    <input type="number" className="form-control mb-2" required
                    onChange={e => setPoin(e.target.value)}
                    value={poin}/>

                    <button className="btn btn-success" type="submit">
                      <span className="fa fa-check"></span> Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
