import React, { useState } from "react";
import Options from "./Options";

const Form = (props) => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    exchangeRate,
    setFromCurrency,
    setToCurrency,
  } = props;

    const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(4);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(4);
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      <h1>Convert</h1>
      <Options
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <Options
        currencies={currencies}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
};

export default Form;
