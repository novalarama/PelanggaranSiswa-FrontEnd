import { useState, useEffect } from "react"
import axios from "axios"

export default function PelanggaranSiswa (){
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])

    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getSiswa = () => {
        let endpoint = `http://localhost:8000/siswa`
        axios.get(endpoint, authorization)
        .then(result => {
            setSiswa(result.data.Siswa)
        })
        .catch(error => console.log(error))
    }

    let getPelanggaran = () => {
        let endpoint = `http://localhost:8000/pelanggaran`
        axios.get(endpoint, authorization)
        .then(result => {
            setPelanggaran(result.data.Pelanggaran)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getSiswa()
        getPelanggaran()
    }, [])

    return(
        <div className="container-fluid">
            <div className="card" style={{fontFamily:"Plus Jakarta Display"}}>
                <div className="card-header" style={{background: `#036666`}}>
                    <h4 className="text-white">Daftar Pelanggaran Siswa</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            Pilih Siswa
                        </div>
                        <div className="col-10">
                            <select className="form-control">
                                <option value="">
                                    --- List Siswa ---
                                </option>
                                {siswa.map(item => (
                                    <option 
                                    value={item.id_siswa}
                                    key={`key${item.id_siswa}`}>
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2 mt-3">
                            Pelanggaran
                        </div>
                        <div className="col-10 mt-3">
                            <select className="form-control">
                                <option value="">
                                    --- List Pelanggaran ---
                                </option>
                                {pelanggaran.map(item => (
                                    <option 
                                    value={item.id_pelanggaran}
                                    key={`key${item.id_pelanggaran}`}>
                                        {item.nama_pelanggaran}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2 mt-3">
                            Tgl Pelanggaran
                        </div>
                        <div className="col-10 mt-3">
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}