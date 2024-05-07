import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Common.css'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email, password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {

                navigate('/test')

            }
        }
    )


        .catch(err=> console.log(err))
    }

    return (

    <div>

        <h2>Faculty Login</h2>

    <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>

        <p id="signupText"><Link to="/" >Home</Link></p>

    </form>
       
        
    </div>

    );
    
}

export default Login