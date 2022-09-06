import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import {addToken, deleteUser, setURLs} from '../../Redux/actionCreators'

const mapStateToProps = state => {
  return {
      token: state.token,
      user: state.user
  }
}

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
      <img src="" alt="logo"/>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li className="vertical-line">My Events</li>
          <li className="vertical-line"><Link to="/nearme">Near Me</Link></li>
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