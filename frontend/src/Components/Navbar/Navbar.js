import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import {addToken, deleteUser, deleteCurrentEvent } from '../../Redux/actionCreators'
import { withRouter } from 'react-router-dom';
import './Navbar.css';

const mapStateToProps = state => {
  return {
      token: state.token,
      user: state.user
  }
}

const logo = '/restaurant-tinder.png';


const mapDispatchToProps = (dispatch) => ({
  addToken: () => { dispatch(addToken()) },
  deleteUser: () => { dispatch(deleteUser())},
  deleteCurrentEvent: () => { dispatch(deleteCurrentEvent())}
})

function Navbar(props) {

  const [checked, setCheckec] = useState(false);
  const handleLogout = () => {
    props.addToken("")
    props.deleteUser()
	props.deleteCurrentEvent();
	props.history.push("/home");
  }

  const handleCheck = () => {
    setCheckec(old => !old)
  }

	let token = useSelector(state => state.token.token);
  return (
    <nav sticky="top">
      <div className="mainView">
        <Link to="/home"><img src={logo} alt="logo"/></Link>
        <div className="navbar-links">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <div className="vl"></div>
            <li><Link to="/myevents">My Events</Link></li>
            <div className="vl"></div>
            <li>{!token ? (<Link to="/login">New Event</Link>) : (<Link to="/nearme">New Event</Link>)}</li>
          </ul>
        </div>
        <div className="navbar-buttons">
          {!token ? (<Link to='/login'><button className="login-button" value="Login">Login</button></Link>) : <button className="signout-button" value="Sign Out" onClick={handleLogout}>Sign Out</button>}
          {!token ? (<Link to='/register'><button className="signup-button" value="Sign Up">Sign Up</button></Link>) : <></>}
        </div>
      </div>
      <div className="mobileView">
        <Link to="/home"><img src={logo} alt="logo"/></Link>
        <label>
          <input type="checkbox" checked={checked}/>
          <span className="menu" onClick={handleCheck}> <span className="hamburger"></span> </span>
          <ul>
            <li onClick={handleCheck}><Link to="/home">Home</Link></li>
            <li onClick={handleCheck}><Link to="/myevents">My Events</Link></li>
            <li onClick={handleCheck}>{!token ? (<Link to="/login">New Event</Link>) : (<Link to="/nearme">New Event</Link>)}</li>
            <li onClick={handleCheck}>{!token ? (<Link to="/login">Login</Link>) : (<span onClick={handleLogout}>Logout</span>) }</li>
            {!token ? (<li onClick={handleCheck}><Link to="/register">Sign Up</Link></li>) : <></> }
          </ul>
        </label>
      </div>
    </nav>
  );
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));