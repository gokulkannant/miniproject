import { useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Common.css'

function Signup() {

    const [username, setUserName] = useState()
    const [password, setPassword] = useState() 
   // const [name, setName] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{username, password})
        .then(result => console.log(result))
        .catch(err=> console.log(err))
    }

    return (

    <div>

        <h2>Sign Up</h2>

    <form onSubmit={handleSubmit}>

        <div>
        <label htmlFor="username">User Name:</label>
        <input type="text" id="username" name="username" required
        onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required
        onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit">Sign Up</button>
        <br />
       <div className="loginText">
        <p>Already have an account?</p>
       <Link to="/login" type="submit">Login</Link>
       </div>
    </form>
       
        
    </div>

    );
    
}

export default Signup