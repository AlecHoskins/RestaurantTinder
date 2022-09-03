import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <img src="" alt="logo"/>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li>My Events</li>
          <li>Near Me</li>
        </ul>
      </div>
      <div className="navbar-buttons">
        <button className="login-button" value="Login">Login</button>
        <button className="signup-button" value="Sign Up">Sign Up</button>
      </div>
    </nav>
  );
}
