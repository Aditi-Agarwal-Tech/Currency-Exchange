import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Home'
import Wallet from './Wallet'
import Transactions from './Transactions'
import Topbar from './Topbar'

const HomeRouter = () => {
  return (
    <Router>
        <Topbar/>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/wallet" element={<Wallet/>} />
            <Route path="/transactions" element={<Transactions/>} />
        </Routes>
    </Router>
  )
}

export default HomeRouter
