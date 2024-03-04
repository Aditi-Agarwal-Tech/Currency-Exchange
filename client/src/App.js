import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './components/Home.jsx';
import Login from "./components/Login.jsx";
import Wallet from './components/Wallet.jsx';
import Transactions from './components/Transactions.jsx';
import Topbar from './components/Topbar.jsx';
import HomeRouter from './components/HomeRouter.jsx';
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
