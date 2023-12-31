import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import axios from "axios";

const BASE_URL = "https://dzap-v1.onrender.com";
const ConverterForm = () => {
  const [cryptoCurrenies, setCryptoCurrenies] = useState([]);
  const [cryptocurrency, setCryptoCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [cryptoError, setCryptoError] = useState("");
  const [amountError, setamountError] = useState("");
  useEffect(() => {
    const fetchCryptoCurrencies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/dzap/cryptoCurrencies`);
        setCryptoCurrenies(response.data.cryptocurrencies);
      } catch (error) {
        console.error("Error in fetching crypto currency", error);
      }
    };
    fetchCryptoCurrencies();
  }, []);
  const handleCryptoCoin = (e) => {
    setCryptoCurrency(e.target.value);
    setCryptoError("");
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setamountError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cryptocurrency) {
      setCryptoError("Please select crypto currency");
    }
    if (!amount) {
      setamountError("Please Enter amount");
    }
    if (cryptocurrency && amount) {
      try {
        const res = await axios.post(`${BASE_URL}/dzap/cryptoConvert`, {
          cryptocurrency,
          amount,
          targetCurrency,
        });
        console.log(res.data.convertedAmount);
        setConvertedAmount(res.data.convertedAmount);
      } catch (error) {
        console.error("Error in converting currency", error);
      }
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
              <select value={cryptocurrency} onChange={handleCryptoCoin}>
                <option value="">Select Crypto Currency</option>
                {cryptoCurrenies.map((coin) => (
                  <option key={coin.id} value={coin.symbol}>
                    {coin.name}
                  </option>
                ))}
              </select>
            </label>
            <p className="error">{cryptoError}</p>
          </div>
          <div className="form-group">
            <label>
              Crypto Amount
              <input
                type="number"
                value={amount}
                placeholder="Enter Crypto Amount"
                onChange={handleAmount}
              />
            </label>
            <p className="error">{amountError}</p>
          </div>
          <div className="form-group">
            <label>
              Select Currency
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <button type="Submit"> Convert</button>
          </div>
        </form>
        {convertedAmount && (
          <p className="amount">
            Converted Amount:{" "}
            <span style={{ color: "#ed1717" }}>{targetCurrency}</span>{" "}
            {convertedAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConverterForm;
