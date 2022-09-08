import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import {addToken, deleteUser } from '../../Redux/actionCreators'
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
  deleteUser: () => { dispatch(deleteUser())}
})

function Navbar(props) {

  const handleLogout = () => {
    props.addToken("")
    props.deleteUser()
	props.history.push("/home");
  }

	let token = useSelector(state => state.token.token);
  return (
    <nav>
      <Link to="/home"><img src={logo} alt="logo"/></Link>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <div className="vl"></div>
          <li>My Events</li>
          <div className="vl"></div>
          <li>{!token ? (<Link to="/login">New Event</Link>) : (<Link to="/nearme">New Event</Link>)}</li>
        </ul>
      </div>
      <div className="navbar-buttons">
        {!token ? (<Link to='/login'><button className="login-button" value="Login">Login</button></Link>) : <button className="signout-button" value="Sign Out" onClick={handleLogout}>Sign Out</button>}
        {!token ? (<Link to='/register'><button className="signup-button" value="Sign Up">Sign Up</button></Link>) : <></>}
      </div>
    </nav>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));