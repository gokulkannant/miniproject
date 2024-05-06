import React, { useState } from "react";

function FacultyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the entered username and password match the predefined credentials
    if (username === "teacher" && password === "password") {
      alert("Login successful. Welcome, teacher!");
      // Redirect to teacher dashboard or perform other actions as needed
      // Example: window.location.href = "teacher_dashboard.html";
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Faculty Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FacultyLogin;
