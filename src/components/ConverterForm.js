import React from "react";

const ConverterForm = () => {
  return (
    <div>
      <h1>Crypto Currency Converter</h1>
      <div>
        <form>
          <div>
            <label>
              Crypto Currency
              <select>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Crypto Amount
              <input />
            </label>
          </div>
          <div>
            <label>
              Select Currency
              <select>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConverterForm;
