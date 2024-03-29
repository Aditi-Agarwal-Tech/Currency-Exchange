import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topbar from '../topbar/Topbar';
import { fetchWalletData } from '../../helpers/api/wallet/walletHelper';

const Wallet = () => {
  const [walletData2, setWalletData2] = useState([{}]);
  const navigate = useNavigate();

  const getData = async () => {
    const userId = localStorage.getItem("userId")
    await fetchWalletData(userId).then((response) => {
      console.log(response.data)
      setWalletData2(response.data.walletData);
    })
  };

  const navigateToTransactions = () => {
    navigate("/transactions");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{backgroundColor:"#f7f7f7", height:"100%"}}>
      {/* <div className="border-bottom h-25 py-2 px-5 d-flex gap-5 justify-content-end px-5">
        <div>Wallet</div>
        <div>Transactions</div>
        <div>
            Dark Mode
        </div>
        <div>
            Aditi
        </div>
      </div> */}
      <Topbar />
      
      <div className='mx-5 px-5 my-5'>
        <div className='my-3'>
            <h1 className='my-2' style={{color:"teal"}}>Wallet Balance</h1>
        </div>
        <div className='border rounded my-3 px-3 py-2' style={{backgroundColor:"#ffffff"}}>
            <table className='table table-hover text-center'>
              <thead>
                <tr className=''>
                  <th>Currency</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {walletData2.map((item, index) => {
                    return <tr key={index}><td>{item.currency}</td><td>{item.amount}</td></tr>
                })}
              </tbody>
            </table>
            <div className='row my-3 px-3'>
                <div className="col-5">
                    <div className='row rounded py-1 small' style={{background:"grey", color: "white"}}>
                        <div className="col-11" onClick={navigateToTransactions}>View Currency transfer history</div>
                        <i className="col-1 bi-clock"></i>
                    </div>
                </div>
            </div>
        </div>
      </div>

      </div>
    
  )
}

export default Wallet
