import { useState } from "react";
import { Link } from "react-router-dom";
import "./Common.css";
import axios from "axios";

import Signup from "./Signup";
import data from "./data.json"; // Importing the data JSON file

function Exam() {
  const [rollNo, setRollNo] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:3001/getData")
      .then((result) => {
        // console.log("haiiiii");
        for (const roomNumber in result.data.classes) {
          const students = result.data.classes[roomNumber];
          const foundStudent = students.find(
            (student) => student.rollno === rollNo
          );
          if (foundStudent) {
            setRoom(roomNumber);
            return; 
          }
        }
        setRoom("");
        //   console.log(result.data);
        //   if (result.data === "wrongKey") {
        //     alert("wrong key");

        //   }else if(result.data === "uploaded"){
        //     alert("upload success")
        //   }
      })

      .catch((err) => console.log(err));

    //   for (const roomNumber in data.classes) {
    //       const students = data.classes[roomNumber];
    //       const foundStudent = students.find(
    //         (student) => student.rollno === rollNo
    //       );
    //       if (foundStudent) {
    //         setRoom(roomNumber);
    //         return; // Exit the loop once the student is found
    //       }
    //     }
  };

  const isClickable = room !== ""; // Check if room is set

  return (
    <div>
      <h2>Enter Your Roll Number</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rollno">Roll No:</label>
          <input
            type="text"
            id="rollno"
            name="rollno"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div>
          <label htmlFor="room">Room No:</label>
          <input type="text" id="room" name="room" value={room} readOnly />
        </div>
        <button type="submit" id="submitButton">
          Submit
        </button>

        {isClickable && (
          <div style={{ position: "relative" }}>
            
            <span></span> {/* Adding space */}
            <p id="OpenMapLink">
              <Link to="/thirdfloor">Open Map</Link>
            </p>
          </div>
        )}
        {!isClickable && (
          <div style={{ position: "relative" }}>
            {/* <span style={{ color: "gray" }}>Open room</span> */}
            <span></span> {/* Adding space */}
            <span style={{ color: "gray" }}>Open Map</span>
          </div>
        )}
        <p id="signupText">
          <Link to="/">Home</Link>
        </p>
      </form>
    </div>
  );
}

export default Exam;
