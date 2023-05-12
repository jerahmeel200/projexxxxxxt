import React, { useState } from "react";

function Calculator() {
  const [inputs, setInputs] = useState("");

  const handleInput = (event) => {
    setInputs(event.target.value);
  };

  const clearInput = () => {
    setInputs("");
  };

  const calculateResult = () => {
    try {
      const results = eval(inputs);
      setInputs(results.toString());
 
    } catch (error) {
      setInputs(error);
    }
  };

  return (
    <div>
      <input value={inputs} onChange={handleInput} type="text" />
      <br />
      <button onClick={clearInput}>clear</button>
      <button onClick={calculateResult}>calculate</button>

    
    </div>
  );
}

export default Calculator;
