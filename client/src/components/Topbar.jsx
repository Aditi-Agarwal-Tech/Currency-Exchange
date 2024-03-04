import React from 'react'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  const navigateToWallet = () => {
    navigate("/wallet");
  }

  const navigateToTransactions = () => {
    navigate("/transactions");
  }

  const handleLogout = () => {
    Axios.post("http://localhost:8081/logout").then((res) => {
      if(res.data.status=="success") {
        navigate("/login");
      }
    });
  }
  return (
    <div className="border-bottom h-25 py-2 px-5 d-flex gap-5 justify-content-end px-5">
        <div onClick={navigateToHome}>Home</div>
        <div onClick={navigateToWallet}>Wallet</div>
        <div onClick={navigateToTransactions}>Transactions</div>
        <div>
            Dark Mode
        </div>
        <div onClick={handleLogout}>
            Aditi
        </div>
    </div>
  )
}

export default Topbar;