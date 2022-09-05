import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'



export default function Navbar() {

	let token = useSelector(state => state.token.token);
  return (
    <nav>
      <img src="" alt="logo"/>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li className="vertical-line">My Events</li>
          <li className="vertical-line"><Link to="/nearme">Near Me</Link></li>
        </ul>
      </div>
      <div className="navbar-buttons">
        {!token ? (<button className="login-button" value="Login">Login</button>) : <></>}
        <button className="signup-button" value="Sign Up">Sign Up</button>
      </div>
    </nav>
  );
}
