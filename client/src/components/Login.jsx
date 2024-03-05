import login_page_banner from  "../assets/login_page_banner.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react'
import Axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    console.log("calling login api")
    Axios.post("http://localhost:8081/login", {
      email: email,
      password: password,
    }).then((response) => {
      if(!response.data.auth) {
        setIsLoggedIn(false);
      } else{
        setIsLoggedIn(true);
        localStorage.setItem("token", response.data.token)
        console.log(response.data.result)
        localStorage.setItem("userId", response.data.result.id)
        console.log(response.data);
        navigate("/");
      }
    })
  };

  return (
    <div className='container'>
      <div className='row d-flex align-items-center justify-content-center h-100'>
        <div className='col-md-8 col-lg-7 col-xl-6'>
            <img src={login_page_banner}></img>
        </div>
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={login}>
                <h3 className="d-flex justify-content-start my-4" style={{color:"teal"}}>Log In</h3>
                <div className="form-floating mb-3">
                    <input type="email" id="emailinput" className="form-control form-control-lg" placeholder="Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label className="form-label" for="emailinput">Email Address</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" id="passwordinput" className="form-control form-control-lg" placeholder="Password" onChange = {(e) => {setPassword(e.target.value)}}/>
                    <label className="form-label" for="passwordinput">Password</label>
                </div>
                <div className="d-grid">
                    <input type="submit" className="btn btn-lg" style={{ background:"teal",color:"white"}} value="Login" />
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
