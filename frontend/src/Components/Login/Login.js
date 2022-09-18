import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { motion } from "framer-motion"
import {addToken, addUser} from '../../Redux/actionCreators'
import axios from 'axios'
import './Login.css'


const mapStateToProps = state => {
	return {
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

const loginBlob = './yellowbloblogin.png';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            showError: false,
            errorMessage: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        document.title = "Restaurant Tinder - Login"
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };
        
        const userWithToken = await axios.post(this.props.urls.login, data).catch((error) => {
            this.setState({
                errorMessage: "❗ Username or password is incorrect, please login again.",
                showError: true
            })
        })

        if (userWithToken) {
        await this.props.dispatch(addToken(userWithToken.data.token));
        await this.props.dispatch(addUser(userWithToken.data.user));
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <img src={loginBlob} alt="Yellow Blob" id="loginBlob" />
                </motion.div>
                <motion.div className='loginPage'
                    initial={{ left: "2000px", opacity: 1, transition: { duration: .4 } }}
                    animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                    exit={{ left: "-1000px", opacity: 1, transition: { duration: .4 }}}
                >
                    <div>
                    <h1 className='please'>Please Sign In</h1>
                    {this. state.showError ? <p className='errorContainer'>{this. state.errorMessage}</p> : <></>}
                    <div className="user-box">
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
                    <div className="user-box">
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
                    <Link to="/register">Need an account?</Link>
                    <button type="submit" onClick={this.handleLogin}>Sign in</button>
                    </div>
                </motion.div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Login);