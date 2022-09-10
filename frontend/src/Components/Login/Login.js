import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import axios from 'axios'
import './Login.css'


const mapStateToProps = state => {
	return {
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };
        
        const userWithToken = await axios.post(this.props.urls.login, data).catch((error) => {
            alert("Username or Password is Incorrect, Please Login Again")
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
            <div className='loginPage'>
                <h1 className='please'>Please Sign In</h1>
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
        )
    }
}

export default withRouter(connect(mapStateToProps)(Login));