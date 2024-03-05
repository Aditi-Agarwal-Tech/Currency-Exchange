import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './components/home/Home.jsx';
import Login from "./components/login/Login.jsx";
import Wallet from './components/wallet/Wallet.jsx';
import Transactions from './components/transactions/Transactions.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet/>} />
          <Route path="/transactions" element={<Transactions/>} />
        </Routes>
      </Router>

  );
}

export default App;
