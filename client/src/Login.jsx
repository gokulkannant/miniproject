import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Common.css";

function Login() {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/test");
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Faculty Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
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

export default Login;
