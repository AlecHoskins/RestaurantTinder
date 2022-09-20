import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {connect} from 'react-redux'
import { motion } from "framer-motion"
import './Register.css'

//Mapping State to Props
const mapStateToProps = state => {
	return {
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

//Constant of BG img
const signupBlob = './yellowblobsignup.png';

class Register extends Component{

    //Constructor for state and setting document title
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
			created: false,
            showError: false,
            errorMessage: ''
        }
        document.title = "Restaurant Tinder - Register"        
    }

    //Handles state change on input of text box
    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Handles creation of new account and error message handling
    handleSubmit = async () => {
		const HTTP_CREATED = 201;
        const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        this.setState({
            errorMessage: '',
            showError: false
        })
        if(!this.checkPasswordStrength(this.state.password)) {
            this.setState({
                errorMessage: "❗ Password must be 8 characters in length and contain at least one capital letter, one lowercase letter, and one number.",
                showError: true
            })
            return;
        }
        if(this.state.password === this.state.confirmPassword){
            const response = await axios.post(this.props.urls.register, data).catch((error) => {
                this.setState({
                    errorMessage: "❗ Username already in use, please choose another.",
                    showError: true
                })
            });
			if (response && response.status === HTTP_CREATED) {
				this.setState({created: true});
			}
        }else{
            this.setState({
                errorMessage: "❗ Password and Confirm Password must match.",
                showError: true
            })
        }
    }

    //Function to make sure password meets 1 capital, 1 lowercase, 1 special character, and 8-30 characters
    checkPasswordStrength = (password) => {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
        return passw.test(password);
    }

    render(){
        return(
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <img src={signupBlob} alt="Yellow Blob" id="signupBlob" />
                </motion.div>
                <motion.div className='registerPage'
                    initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                    animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                    exit={{ left: "-1000px", opacity: 1, transition: { duration: .4 }}}
                >
                    <h1 className='please'>Create Account</h1>
                    {this. state.showError ? <p className='errorContainer'>{this. state.errorMessage}</p> : <></>}
                    <div className='user-box'>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            v-model="user.username"
                            onChange={this.handleInputChange}
                            required
                        />
                        <label className="sr-only">Username</label>
                    </div>
                    <div className='user-box'>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            v-model="user.password"
                            onChange={this.handleInputChange}
                            required
                        />
                        <label className="sr-only">Password</label>
                    </div>
                    <div className='user-box'>
                        <input
                            type="password"
                            id="password-confirm"
                            name="confirmPassword"
                            className="form-control"
                            v-model="user.password"
                            onChange={this.handleInputChange}
                            required
                        />
                        <label className="sr-only">Confirm Password</label>
                    </div>
                    <Link to="/login">Have an account?</Link>
                    <button type="submit" onClick={this.handleSubmit}>Create Account</button>
                    {this.state.created ? <Navigate to='/login'/> : <></>}
                </motion.div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Register);