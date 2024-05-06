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
                <ul className="nav-links">
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            {/* Content */}
            <div className="content">
                <h2>Welcome to Campus Navigation System</h2>
                <p>Here you can find various tools to navigate through our campus easily.</p>
                {/* Additional links for clarity */}
                <ul className="content-links">
                    <li><Link to="/collegeplan">Location Finder</Link></li>
                    <li><Link to="/exam">Exam Hall Finder</Link></li>
                </ul>
            </div>

            {/* Contact Us */}
            <div className="contact-us">
                <Link to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}

export default Home;
