import React, { useState } from "react";
import "./DataEnter.css";
import axios from "axios";
import DataEntryInputs from "./DataEntryInputs";

function DataEnter() {
  const [dei, setDei] = useState([]);
  const [pair, setPair] = useState([]);
  const [key, setKey] = useState("");

  const jsonPair = []
  const incrf = () => {
    setDei([...dei, dei.length]);
  };

  const handleSubmit = () => {
    const sortedPair = pair.sort((a, b) => a.k - b.k);
    const result = {
      classes: {}
    };
    
    pair.forEach(item => {
      const { class: className, from, to } = item;
      
      const fromNumber = parseInt(from.substr(-3), 10);
      const toNumber = parseInt(to.substr(-3), 10);
    
      const classList = [];
      for (let i = fromNumber; i <= toNumber; i++) {
        classList.push({ id: i - fromNumber + 1, rollno: `KNR21CS${String(i).padStart(3, '0')}` });
      }
    
      result.classes[className] = classList;
    });

    console.log(JSON.stringify(result))
    axios
    .post("http://localhost:3001/uploadData", { data:result, key:key })
    .then((result) => {
      console.log(result.data);
      if (result.data.data == 'wrongKey') {
        alert("wrong key");

      }else if(result.data === "uploaded"){
        alert("upload success")
      }
    })

    .catch((err) => console.log(err));

  };

  function addPair(k, cls, from, to) {
    const updatedPair = [...pair.filter((p) => p.k !== k), { k, class: cls, from, to }];
    setPair(updatedPair);
  }

  return (
    <div className="mainContainer">
      <div className="container">

      {dei.map((index) => (
        <DataEntryInputs key={index} k={index} setPair={addPair} />
      ))}
      <input onChange={(e)=>{
        setKey(e.target.value);
      }} placeholder="Enter secret key"></input>
      <button onClick={incrf}>Add</button>
      <button onClick={()=>{
        if(key==null || key ==""){
          alert("enter key")
        }else{
          
          handleSubmit()
        }
      }}>Submit</button>
      </div>
    </div>
  );
}

export default DataEnter;

