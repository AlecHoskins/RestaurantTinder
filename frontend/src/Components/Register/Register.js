import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
			created: false
        }        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async () => {
		const HTTP_CREATED = 201;
        const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(!this.checkPasswordStrength(this.state.password)) {
            alert("Password must be 8 characters in length and contain at least one capital letter, one lowercase letter, and one number.")
            return;
        }
        if(this.state.password === this.state.confirmPassword){
            const response = await axios.post(this.props.urls.register, data).catch((error) => {
                alert("Username already in use, please choose another!")
            });
			if (response && response.status === HTTP_CREATED) {
				this.setState({created: true});
			}
        }else{
            alert("Password and Confirm Password must match!!!")
        }
    }

    checkPasswordStrength = (password) => {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
        return passw.test(password);
    }

    render(){
        return(
            <div>
                <h1>Create Account</h1>
                <label className="sr-only">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                <label className="sr-only">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                <input
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                <Link to="/login">Have an account?</Link>
                <button type="submit" onClick={this.handleSubmit}>Create Account</button>
				{this.state.created ? <Redirect to='/login'/> : <></>}
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Register));