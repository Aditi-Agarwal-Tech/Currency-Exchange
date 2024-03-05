import React, { useState } from 'react';
import '../../styles/home/CurrencyInput.css';

const CurrencyInput = (props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const exchangeRate = props.exchangeRate;
  const haveCurr = props.iHave;
  const wantCurr = props.iWant;
  const type = props.type || 'set';
  const displayVal = props.displayVal ;

  const handleInputChange = (e) => {
    const isValidNumber = /^\d*\.?\d*$/.test(e.target.value);
    if (isValidNumber || e.target.value === '') {
      setInputValue(e.target.value);
      props.setToNull();
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    props.setFrom(inputValue);
  };

  return (
    <div className="col-5">
        <div className={`input-container row my-2 ${isInputFocused ? 'focused' : ''}`}>
        <input
            type="text"
            disabled= {type==='display'}
            value={type === 'display' ? displayVal : inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => {handleInputBlur()}}
            className={`input-field ${type === 'display' ? 'display-input' : ''}`}
        />
        {exchangeRate && haveCurr && wantCurr &&
          <span className={'info-text'}>1 {haveCurr} = {exchangeRate} {wantCurr}</span>
        }
        </div>
    </div>
  );
};

export default CurrencyInput;