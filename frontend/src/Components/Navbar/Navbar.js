import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import {addToken, deleteUser, setURLs} from '../../Redux/actionCreators'
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
  }

	let token = useSelector(state => state.token.token);
  return (
    <nav>
      <img src={logo} alt="logo"/>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <div className="vl"></div>
          <li>My Events</li>
          <div className="vl"></div>
          <li><Link to="/nearme">Near Me</Link></li>
        </ul>
      </div>
      <div className="navbar-buttons">
        {!token ? (<Link to='/login'><button className="login-button" value="Login">Login</button></Link>) : <button className="signout-button" value="Sign Out" onClick={handleLogout}>Sign Out</button>}
        {!token ? (<Link to='/register'><button className="signup-button" value="Sign Up">Sign Up</button></Link>) : <></>}
      </div>
    </nav>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);