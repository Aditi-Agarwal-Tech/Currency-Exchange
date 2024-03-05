import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../styles/home/CurrencyList.css';
import dropdownIconLight from '../../../src/assets/dropdownIconLight.svg'
import { StyledSelect } from '../../helpers/utils/currencyListStyles';
import { fetchCurrencyList } from '../../helpers/api/home/currencyListHelper';

const CurrencyList = (props) => {

    const [currencyList, setCurrencyList] = useState(['UAH', 'AUD', 'EUR', 'USD', 'NZD', 'CHF', 'VSD', 'OZD', 'LHF']);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [containerStyle, setContainerStyle] = useState({});
    const [currency, setCurrency] = useState();

    const getCurrencyList = async () => {
        await fetchCurrencyList().then((response) => {
            console.log(response);
            setCurrencyList(response.data.currencyList);
        });
    };

    useEffect(() => {
        getCurrencyList();
      }, []);

    useEffect(() => {
        if(currencyList.length>5){
            setDropdown(currencyList.slice(5,currencyList.length))
        }
    }, [currencyList]);

    const setSelect = (index) => {
        setSelectedItem(index);
        setSelectedValue('');
        setContainerStyle({})
        setCurrency(currencyList[index]);
    };

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
        const updatedContainerStyle = {
            'width':'100px',
            textAlign: 'center',
            backgroundPosition : '94% center',
            backgroundColor: 'teal',
            color: 'white',
            'backgroundImage': `url(${dropdownIconLight})`,
          };
        setContainerStyle(updatedContainerStyle);
        setSelectedItem(null);
        setCurrency(e.target.value);
    };

    useEffect(()=>{
        console.log(currency);
        props.type==='have'?props.setHave(currency):props.setWant(currency);
    },[currency]);

  return (
    <div className="col-5">
        <h6 className='row'>{props.type === 'have' ? 'I have' : 'I want'}</h6>
        <div className='row' >
            {currencyList.slice(0, 5).map((item,index) => (
                <div key={index}
                className={`btn col border ${index === selectedItem ? 'selected' : ''}`}
                onClick={() => setSelect(index)}>
                    {item}
                </div>
                ))}
            {dropdown.length && 
                <StyledSelect
                        value={selectedValue}
                        onChange={handleSelectChange}
                        className="btn border dropdown d-flex align-items-center"
                        style={containerStyle}
                >
                    <option value="" hidden></option>
                    {dropdown.map((item, index) => (
                        <option key={index + 5} value={item}>
                            {item}
                        </option>
                    ))}
                </StyledSelect>
            }
        </div>
    </div>
  );
};

export default CurrencyList;