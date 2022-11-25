import React, { useState, useEffect } from "react";
import { fetchData, requestOptions } from "../fetchData/fetchData";

const Header = (props) => {
  const { currencies, baseAmount, base } = props;

  const [headerRate, setHeaderRate] = useState([]);
  const [baseRate, setBaseRate] = useState([]);

  const headerRates = ["USD", "EUR"];

  const url = "https://api.apilayer.com/currency_data";

  const fetchHeaderCurrencyData = async (curr) => {
    try {
      const currencyReq = currencies.map((currency) =>
        fetchData(
          `${url}/convert?to=${currency}&from=${base}&amount=${baseAmount}`,
          requestOptions
        )
      );
      const result = await Promise.all(currencyReq);
      setBaseRate(result);
      setHeaderRate(
        result.map((curr) => {
          if (curr.query.to !== base) {
            return curr;
          }
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("headerRate", headerRate);

  useEffect(() => {
    fetchHeaderCurrencyData();
  }, []);

  return (
    <div>
      <h1>Currency Converter</h1>
      <h2>1 {base} is equivalent to </h2>
      {headerRate.map((curRate) => (
        <h2 className="" key={curRate} value={curRate.result}>
          {curRate.result.toFixed(4)} {curRate.query.to}
        </h2>
      ))}
    </div>
  );
};

export default Header;
