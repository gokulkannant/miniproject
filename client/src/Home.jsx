//import { useState} from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import './Home.css'

function Home() {

   

    return (

    <div>

        <h1>Welcome to our Website</h1>

       <nav>
       <ul>
             <li><Link to="/location-finder">Location Finder</Link></li>
             <li><Link to="/exam">Exam Hall Finder</Link></li>
        </ul>
       </nav>
  
       
        
    </div>

    );
    
}

export default Home