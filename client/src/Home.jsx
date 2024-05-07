import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this path correctly points to your CSS file

function Home() {
    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo.svg" alt="Logo" />
                    <span className="logo-text">Campus Navigation</span>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                </div>
            </nav>

            {/* Content */}
            <div className="content">
                <h1>Campus Navigation System</h1>
            
                <p>Explore our website for convenient tools to navigate around our campus effortlessly.</p>
                {/* Additional links for clarity */}
                <ul className="content-links">
                    <li><Link to="/collegeplan">Location Finder</Link></li>
                    <li><Link to="/exam">Exam Hall Finder</Link></li>
                </ul>
            </div>
            
            <div className="maingate">
            <img src="/maingate1.jpg" alt="Logo" />
            </div>


            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <ul className="footer-links">
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <p>&copy; 2024 Campus Navigation. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
