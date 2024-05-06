import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/path/to/logo.png" alt="Logo" />
                    <span className="logo-text">Campus Navigation</span>
                </div>
                <ul className="nav-links">
                    <li><Link to="/location-finder">Location Finder</Link></li>
                    <li><Link to="/exam">Exam Hall Finder</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>

            {/* Content */}
            <div className="content">
                {/* Your content here */}
                <h2>Welcome to Campus Navigation System</h2><li>
                    <Link to="/location-finder">Location Finder</Link></li>
                    <li><Link to="/exam">Exam Hall Finder</Link></li>

                <p>Here you can find various tools to navigate through our campus easily.</p>
            </div>

            {/* Contact Us */}
            <div className="contact-us">
                <Link to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}

export default Home;
