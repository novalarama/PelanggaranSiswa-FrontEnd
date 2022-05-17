import { useState } from "react"; // untuk menyimpan inputan
import axios from "axios"; // digunakan untuk transfer data dari frontend ke backend

export default function Login() {
  // define state to store username
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let loginProcess = ev => {
    ev.preventDefault() // 
    // akses ke backend untuk proses login
    // method : POST
    // endpoint : http://localhost:8000/user/auth
    // request : username and password
    // response : logged and token

    //prepare request
    let request = {
      username : username,
      password : password
    }
    // prepare alamat
    let endpoint = `http://localhost:8000/user/auth`
    // sending data
    axios.post(endpoint, request)
    .then(response => {
        // response.data.(apa yang ingin diambil)
      if(response.data.logged === true){
        let token = response.data.token
        // disimpan di local storage
        localStorage.setItem(`token-pelanggaran`,token)
        let dataUser = JSON.stringify(response.data.dataUser)
        localStorage.setItem(`user-pelanggaran`, dataUser)
        alert('Login Successfull');window.location='./list'
      }else {
        alert(response.data.message)
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
      <div className="container mt-10" style={{fontFamily: 'Plus Jakarta Display', marginTop: '40px'}}>
      <h1 className="text-center"><b>TATIB.</b></h1>
      <div className="card col-lg-8 mx-auto" style={{background: `#036666`}}>
        <div className="card-header" >
          <h3 className="text-white"><b>Sign in</b></h3>
        </div>
        <div className="card-body">
          <form onSubmit={ev => loginProcess(ev)}>
            <h5 className="text-white">Username</h5>
            <input
              type={`text`}
              className="form-control mb-2"
              required
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />

            <h5 className="text-white">Password</h5>
            <input
              type={`password`}
              className="form-control mb-2"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button type="submit" className="btn btn-success">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
