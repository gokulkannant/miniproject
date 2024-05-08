import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Common.css";

function Key() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === "12345") {
      navigate("/dataenter");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h2>Faculty Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Secret Key:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <p id="signupText">
          <Link to="/">Home</Link>
        </p>
      </form>
    </div>
  );
}

export default Key;
