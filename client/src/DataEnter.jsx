import React, { useState } from 'react';

function DataEnter() {
  const [room, setRoom] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rollNumbers, setRollNumbers] = useState('');

  const displayRollNumbers = () => {
    const roomInput = room.trim();
    const fromInput = from.trim();
    const toInput = to.trim();
    const newRollNumbers = [];

    if (roomInput && fromInput && toInput) {
      const fromNumber = parseInt(fromInput.slice(-3));
      const toNumber = parseInt(toInput.slice(-3));

      if (!isNaN(fromNumber) && !isNaN(toNumber) && fromNumber <= toNumber) {
        const prefix = fromInput.substring(0, fromInput.length - 3);
        for (let i = fromNumber; i <= toNumber; i++) {
          const paddedRollNumber = i.toString().padStart(3, '0');
          newRollNumbers.push(`${prefix}${paddedRollNumber}`);
        }
      } else {
        alert("Invalid input. Please enter valid roll numbers.");
      }
    } else {
      alert("Please enter room number, from and to roll numbers.");
    }

    setRollNumbers(`Roll Numbers: ${roomInput} - ${newRollNumbers.join(", ")}`);
  };

  const handleSubmit = () => {
    // Your submit logic here
    alert("Submitted!"); // For demonstration
  };

  return (
    <div>
      <label htmlFor="room">Room Number:</label>
      <input type="text" id="room" placeholder="Enter room number" value={room} onChange={(e) => setRoom(e.target.value)} />
      <label htmlFor="from">From:</label>
      <input type="text" id="from" placeholder="Enter starting roll number" value={from} onChange={(e) => setFrom(e.target.value)} />
      <label htmlFor="to">To:</label>
      <input type="text" id="to" placeholder="Enter ending roll number" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={displayRollNumbers}>Display</button>
      <div id="rollNumbers">{rollNumbers}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DataEnter;
