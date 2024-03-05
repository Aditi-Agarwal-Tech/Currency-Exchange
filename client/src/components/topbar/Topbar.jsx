import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutHelper } from '../../helpers/api/logout/logoutHelper';

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

  const handleLogout = async () => {
    await logoutHelper().then((res) => {
      if(res.data.status==="success") {
        navigate("/login");
      }
    });
  }
  return (
    <div className="border-bottom h-25 py-2 px-5 d-flex gap-5 justify-content-end px-5">
        <div onClick={navigateToHome}>Home</div>
        <div onClick={navigateToWallet}>Wallet</div>
        <div onClick={navigateToTransactions}>Transactions</div>
        <div onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default Topbar;