import React, { useEffect, useState } from 'react'
import Axios from "axios"
import Topbar from './Topbar';

const transactionData = {data: [
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000},
    {id:1, timestamp:"04-03-2024 01:06 GMT", currencyFrom:"USD", valueFrom:80000, currencyTo:"INR", valueTo:1000}
]}

function Transactions() {
  const [transactionData2, setTransactionData2] = useState([{}]);
  const getData = () => {
    const body = {
      userId: localStorage.getItem("userId")
    };
    Axios.post("http://localhost:8081/transactions", body, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      console.log(response.data)
      setTransactionData2(response.data.transactionData);
    })
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
            <h1 className='my-2' style={{color:"teal"}}>Transaction History</h1>
        </div>
        <div className='border rounded my-3 px-3 py-2' style={{backgroundColor:"#ffffff"}}>
            <div style={{overflowY:"auto", maxHeight:"300px"}}>
                <table className='table table-hover text-center'>
                <thead style={{position:"sticky", top:"0"}}>
                    <tr className=''>
                    <th>Date and Time</th>
                    <th>From</th>
                    <th>To</th>
                    </tr>
                </thead>
                <tbody style={{}}>
                    {transactionData2.map((item) => {
                        return <tr><td>{item.timestamp}</td><td>{item.currencyFrom + " " + item.valueFrom}</td><td>{item.currencyTo + " " + item.valueTo}</td></tr>
                    })}
                </tbody>
                </table>
            </div>
        </div>
      </div>

      </div>
    
  )
}

export default Transactions
