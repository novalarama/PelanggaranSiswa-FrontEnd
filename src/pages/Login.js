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
    let request = {
      username : username,
      password : password
    }
    let endpoint = `http://localhost:8000/user/auth`
    // sending data
    axios.post(endpoint, request)
    .then(response => {
      if(response.data.logged === true){
        let token = response.data.token
        // disimpan di local storage
        localStorage.setItem(`token-pelanggaran`,token)
        alert('Login Successfull')
      }else {
        alert(response.data.message)
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <body className="bg-danger">
      <div className="container" style={{fontFamily: 'poppins'}}>
      <div className="card">
        <div className="card-header" style={{ background: `lylac` }}>
          <h3 className="text-dark">Sign in</h3>
        </div>
        <div className="card-body">
          <form onSubmit={ev => loginProcess(ev)}>
            <h5>Username</h5>
            <input
              type={`text`}
              className="form-control mb-2"
              required
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />

            <h5>Password</h5>
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
    </body>
  );
}