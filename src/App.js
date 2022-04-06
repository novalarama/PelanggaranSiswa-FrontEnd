import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Pelanggaran from "./pages/Pelanggaran";
import User from "./pages/User";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/pelanggaran" element={<Pelanggaran />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  )
}