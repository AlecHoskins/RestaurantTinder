import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from 'react-redux'
import { motion } from "framer-motion";
import {addToken, deleteUser, deleteCurrentEvent } from '../../Redux/actionCreators'
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

  const navigate = useNavigate()
  const [checked, setCheckec] = useState(false);

  const handleLogout = () => {
    props.addToken("")
    props.deleteUser()
	props.deleteCurrentEvent();
	navigate('/home');
  }

  const handleCheck = () => {
    setCheckec(old => !old)
  }

  const variants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: { 
      opacity: 0, 
      y: 50,
      transition: {
        y: { stiffness: 1000 }
      } 
    }
  }

  const variantsChildren = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
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
        <label className="hamburgerLabel">
          <input className="hamburgerInput" type="checkbox" checked={checked}/>
          <span className="menu" onClick={handleCheck}> <span className="hamburger"></span> </span>
          {checked ? <motion.ul className="hamburgerItems"
            animate={ checked ? "open" : "closed" }
            variants={variantsChildren}
          >
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleCheck}><Link to="/home">Home</Link></motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleCheck}><Link to="/myevents">My Events</Link></motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleCheck}>{!token ? (<Link to="/login">New Event</Link>) : (<Link to="/nearme">New Event</Link>)}</motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleCheck}>{!token ? (<Link to="/login">Login</Link>) : (<span onClick={handleLogout}>Logout</span>) }</motion.li>
            {!token ? (<motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleCheck}><Link to="/register">Sign Up</Link></motion.li>) : <></> }
          </motion.ul> : <motion.ul className="hamburgerItems"
            animate={ checked ? "open" : "closed" }
            variants={variantsChildren}
          >
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} >Home</motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>My Events</motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>New Event</motion.li>
            <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{!token ? "Login" : "Logout" }</motion.li>
            {!token ? <motion.li variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>Sign Up</motion.li> : <></> }
          </motion.ul>}
        </label>
      </div>
    </nav>
  );
}



export default connect(mapStateToProps, mapDispatchToProps)(Navbar);