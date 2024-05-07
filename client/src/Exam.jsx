import { useState } from "react";
import { Link } from "react-router-dom";
import './Common.css'
import Signup from "./Signup";
import data from "./data.json"; // Importing the data JSON file

function Exam() {
    const [rollNo, setRollNo] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Find the room for the entered roll number
        for (const roomNumber in data.classes) {
            const students = data.classes[roomNumber];
            const foundStudent = students.find(student => student.rollno === rollNo);
            if (foundStudent) {
                setRoom(roomNumber);
                return; // Exit the loop once the student is found
            }
        }
        // If roll number not found, set room to empty string
        setRoom("");
    };

    const isClickable = room !== ""; // Check if room is set

    return (
        <div>
            <h2>Enter Your Roll Number</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rollno">Roll No:</label>
                    <input type="text" id="rollno" name="rollno" value={rollNo} onChange={(e) => setRollNo(e.target.value.toUpperCase())} required />
                </div>
                <div>
                    <label htmlFor="room">Room No:</label>
                    <input type="text" id="room" name="room" value={room} readOnly />
                </div>
                <button type="submit" id="submitButton">Submit</button>
            
            {isClickable && (
                <div style={{ position: "relative" }}>
                    <a href={`images/room_${room}.png`} id="openRoomLink" >Open room</a> 
                    <span></span> {/* Adding space */}
                   <p id="OpenMapLink"><Link to="/thirdfloor" >Open Map</Link></p>
                </div>
            )}
            {!isClickable && (
                <div style={{ position: "relative" }}>
                    <span style={{ color: "gray" }}>Open room</span> 
                    <span></span> {/* Adding space */}
                    <span style={{ color: "gray" }}>Open Map</span>
                </div>
            )}
            <p id="signupText"><Link to="/signup" >Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Exam;
