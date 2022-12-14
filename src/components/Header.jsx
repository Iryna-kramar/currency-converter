import React, { useState, useEffect } from "react";
import { fetchData, requestOptions } from "../fetchData/fetchData";

const Header = (props) => {
  const { currencies, base } = props;

  const [headerRates, setHeaderRates] = useState([]);

  const url = "https://free.currconv.com/api/v7";

  const fetchHeaderCurrencyData = async (curr) => {
    try {
      const currencyReq = currencies.map((currency) =>
        fetchData(
          `${url}/convert?q=${currency}_${base}&compact=ultra&apiKey=04c6b727163908432fed`,
          requestOptions
        )
      );
      const result = await Promise.all(currencyReq);
      setHeaderRates(
        result.filter((curr) => {
          if (Object.keys(curr).toString() !== `${base}_${base}`) {
            return curr;
          }
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchHeaderCurrencyData();
  }, []);

  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>1 {base} is equivalent to </h3>
      {headerRates.map(
        (curRate) => (
          console.log("keys", Object.keys(curRate).toString().slice(0, 3)),
          console.log("values", Object.values(curRate)),
          (
            <h3
              key={Object.keys(curRate)}
              value={Object.values(curRate)}
            >
              {Object.values(curRate)[0].toFixed(4)}{" "}
              {Object.keys(curRate).toString().slice(0, 3)}
            </h3>
          )
        )
      )}
    </div>
  );
};

export default Header;
