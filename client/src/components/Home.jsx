import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

import 'bootstrap-icons/font/bootstrap-icons.css';
import CurrencyInput from './widgets/CurrencyInput';
import CurrencyList from './widgets/CurrencyList';
import Topbar from './Topbar';

function Home() {

    const [iHave, setIHave] = useState('');
    const [iWant, setIWant] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [fromAmt, setFromAmt] = useState('');
    const [toAmt, setToAmt] = useState('')
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    
    const setToNull = () => {
        setToAmt('');
    }

    const setHave = (val) => {
        setIHave(val);
    }

    const setWant = (val) => {
        setIWant(val);
    }

    const setFrom = (val) => {
        setFromAmt(val);
    }

    const convert = () => {
        console.log("convert called");
        if(fromAmt && exchangeRate){
            setToAmt(fromAmt*exchangeRate); 
        }
    }

    const registerTransaction = () => {
        Axios.post(
            "http://localhost:8081/registerTransaction",
            {
                userId: localStorage.getItem("userId"),
                currencyFrom: iHave,
                valueFrom: parseFloat(fromAmt),
                currencyTo: iWant,
                valueTo: parseFloat(toAmt),
            },
            {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
        )
    }

    const navigateToTransactions = () => {
        navigate("/transactions");
    }

    useEffect(() => {
        Axios.get("http://localhost:8081").then((res) => {
            if(res.data.valid) {

            } else {
                navigate("/login");
            }
        });
    });

    useEffect(() => {
        registerTransaction();
    },[toAmt]);

    useEffect(()=>{
        if(iHave && iWant){
            Axios.post("http://localhost:8081/exchangerate", {currencyFrom: iHave, currencyTo: iWant}, {
                headers: {
                    "x-access-token" : localStorage.getItem("token"),
                }
            }).then((response) => {
                console.log(response);
                setExchangeRate(response.data.exchangeRate);
            })
            setToAmt('');
        }
    },[iHave, iWant]);

  return (
    <div style={{backgroundColor:"#f7f7f7", height:"100%"}}>
      {/* <div className="border-bottom h-25 py-2 px-5 d-flex gap-5 justify-content-end px-5">
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
            <h1 className='my-2' style={{color:"teal"}}>Exchange Currency widget</h1>
            <div className='blockquote my-1' style={{fontWeight:"10"}}>Real-time widget for Currency exchange</div>
        </div>
        <div className='border rounded my-3 px-3 py-2' style={{backgroundColor:"#ffffff"}}>
            <div className='row my-3 px-3 small'>Data as per records</div>
            <div className='row my-3 px-3'>
                <CurrencyList type='have' iHave={iHave} setHave={setHave}/>
                <div className="col-2"></div>
                <CurrencyList type='want' iWant={iWant} setWant={setWant}/>
            </div>
            <div className="row my-3 px-3">
                <CurrencyInput exchangeRate={exchangeRate} iHave={iHave} iWant={iWant} setFrom={setFrom} setToNull={setToNull}/>
                <div 
                    className="col-2 d-grid justify-content-center align-items-center"
                    onClick={convert}
                >
                    <div className="rounded d-flex justify-content-center" style={{backgroundColor:"grey", width:"25px", height:"25px"}}><i className="bi-arrow-left-right white"></i></div>
                </div>
                <CurrencyInput type='display' displayVal={toAmt}/>
            </div>
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

export default Home
