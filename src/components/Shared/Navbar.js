import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Agricultural Super App</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/communities">Communities</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
