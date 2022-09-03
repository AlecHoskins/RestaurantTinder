import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { API } from '../../Shared/baseUrl'
import { Redirect } from 'react-router-dom'

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
        if(this.state.password === this.state.confirmPassword){
            const response = await axios.post(API.register, data);
			if (response.status === HTTP_CREATED) {
				this.setState({created: true});
			}
        }else{
            alert("Password and Confirm Password must match!!!")
        }
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

export default Register;