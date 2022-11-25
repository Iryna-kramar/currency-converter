import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Header } from "./components";

import { fetchData, requestOptions } from "../src/fetchData/fetchData";

function App() {
  const [data, setData] = useState();
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [result, setResult] = useState();

  const initialState = {
    currencies: ["USD", "EUR", "UAH"],
    base: "UAH",
    baseAmount: 1,
  };

  const { currencies, base, baseAmount } = initialState;

  const url = "https://api.apilayer.com/currency_data";

  const fetchCurrencyData = async () => {
    try {
      const currencyData = await fetchData(
        `${url}/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
        requestOptions
      );
      setData(currencyData);
      setExchangeRate(currencyData.info.rate);
      setResult(currencyData.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(() => {
  //   fetchCurrencyData();
  // }, [fromCurrency, toCurrency, amount]);

  console.log(data, "data");
  console.log(exchangeRate, "exchangeRate");
  console.log(result, "result");
  console.log(currencies, "currencies");

  return (
    <div className="App">
      <Header
        baseAmount={baseAmount}
        base={base}
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
        amount={amount}
      />
      <Form
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
        amount={amount}
        setAmount={setAmount}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
