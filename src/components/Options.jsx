import React from "react";
import "./Options.css";

const Options = (props) => {
  const {
    currencies,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <div className="inputForm">
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencies.map((option) => (
          <option className="inputOptions" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Options;
