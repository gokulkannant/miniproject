import React, { useState } from "react";

const DataEntryInputs = ({ k, setPair }) => {
  const [classValue, setClassValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleClassChange = (event) => {
    const newValue = event.target.value;
    setClassValue(newValue);
    setPair(k, newValue, fromValue, toValue);
  };

  const handleFromChange = (event) => {
    const newValue = event.target.value;
    setFromValue(newValue);
    setPair(k, classValue, newValue, toValue);
  };

  const handleToChange = (event) => {
    const newValue = event.target.value;
    setToValue(newValue);
    setPair(k, classValue, fromValue, newValue);
  };

  return (
    <div>
      <input
        placeholder="class"
        value={classValue}
        onChange={handleClassChange}
      />
      <input
        placeholder="from"
        value={fromValue}
        onChange={handleFromChange}
      />
      <input placeholder="to" value={toValue} onChange={handleToChange} />
    </div>
  );
};

export default DataEntryInputs;
