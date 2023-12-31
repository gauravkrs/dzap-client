import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";

const ConverterForm = () => {
  const [cryptoCurrenies, setCryptoCurrenies] = useState([]);
  const [cryptocoin, setCryptoCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  useEffect(() => {
    const fetchCryptoCurrencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/dzap/cryptoCurrencies"
        );
        console.log(response.cryptocurrencies);
        setCryptoCurrenies(response);
      } catch (error) {
        console.error("Error in fetching crypto currency", error);
      }
    };
    fetchCryptoCurrencies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("", {
        cryptocoin,
        amount,
        currency,
      });
      setConvertedAmount(res.data);
    } catch (error) {
      console.error("Error in converting currency", error);
    }
  };
  return (
    <div className="convert-container">
      <div className="converter-form">
        <h1>Crypto Currency Converter</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Crypto Currency
              <select
                value={cryptocoin}
                onChange={(e) => setCryptoCoin(e.target.value)}
              >
                <option value="">Select Crypto Currency</option>
                {cryptoCurrenies.map((coin) => (
                  <option key={coin.id} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Crypto Amount
              <input
                type="number"
                value={amount}
                placeholder="Enter Crypto Amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Select Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
                <option value="jpy">JPY</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <button type="Submit"> Convert</button>
          </div>
        </form>
        {convertedAmount && (
          <p>
            Converted Amount: {convertedAmount} {currency}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConverterForm;
