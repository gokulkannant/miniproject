import { useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Common.css'

function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{email, password})
        .then(result => console.log(result))
        .catch(err=> console.log(err))
    }

    return (

    <div>

        <h2>Sign Up</h2>

    <form onSubmit={handleSubmit}>

    <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required
        onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required
        onChange={(e) => setEmail(e.target.value)} />
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