import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser, setURLs} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import NearMe from '../NearMe/NearMe'
import MainPage from '../MainPage/MainPage'
import baseUrl from '../../Shared/baseUrl'
import axios from 'axios'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
		urls: state.urls
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
	setURLs: (data) => { dispatch(setURLs(data))}
});



class Main extends Component {

	componentWillMount() {
		axios.get(baseUrl).then((response) => {
			this.props.setURLs(response.data);
		})
	}

    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        return(
            <div>
				<Navbar />
                {this.props.token.token !== undefined ?
                            <Redirect to='/home'/>
                    : 
                      <Redirect to='/home'/>  
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
					<Route path='/nearme'component={() => <NearMe />}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : () => <MainPage/>}/>
                    <Redirect to='/home'/>
                </Switch>
				<Footer />
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));