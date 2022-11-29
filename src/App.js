import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Header } from "./components";

import { fetchData, requestOptions } from "../src/fetchData/fetchData";

function App() {
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState();

  const initialState = {
    currencies: ["USD", "EUR", "UAH"],
    base: "UAH",
    baseAmount: 1,
  };
  const { currencies, base, baseAmount } = initialState;

  const url = "https://free.currconv.com/api/v7";

  const fetchCurrencyData = async (cur1, cur2) => {
    try {
      const currencyData = await fetchData(
        `${url}/convert?q=${cur1}_${cur2}&compact=ultra&apiKey=04c6b727163908432fed`,
        requestOptions
      );
      setExchangeRate(Object.values(currencyData));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCurrencyData(toCurrency, fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="App">
      <Header
        baseAmount={baseAmount}
        base={base}
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
      />
      <Form
        currencies={currencies}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
        setFromCurrency={setFromCurrency}
        setToCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
