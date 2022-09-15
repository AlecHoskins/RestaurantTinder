import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {addToken, deleteUser, setURLs, deleteCurrentEvent} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import NearMe from '../NearMe/NearMe'
import MainPage from '../MainPage/MainPage'
import EventCreation from '../Event/EventCreation'
import MyEvents from '../MyEvents/MyEvents'
import baseUrl from '../../Shared/baseUrl'
import EventView from '../Event/EventView'
import axios from 'axios'
import ErrorPage from '../ErrorPage/ErrorPage'

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
	setURLs: (data) => { dispatch(setURLs(data))},
	deleteCurrentEvent: () => { dispatch(deleteCurrentEvent())}
});



class Main extends Component {

    constructor(props){
        super(props);

		axios.get(baseUrl).then((response) => {
			this.props.setURLs(response.data);
		})
        
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
		this.props.deleteCurrentEvent();
    }



    render(){
        return(
            <div>
				<Navbar />
                {/* {this.props.token.token !== undefined ?
                            <Redirect to='/home'/>
                    : 
                      <Redirect to='/home'/>  
                } */}
				{this.props.urls ? 
					<Switch>
						<Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : () => <MainPage/>}/>
						<Route path='/login' component={this.props.token.token !== undefined ? () => <Home/> : () => <Login/>}/>
						<Route path='/register'component={() => <Register/>}/>
						<Route path='/nearme'component={this.props.token.token !== undefined ? () => <NearMe/> : () => <Login/>}/>
						<Route path='/event' component={this.props.token.token !== undefined ? () => <EventCreation/> : () => <Login/>}/>
						<Route path='/myevents' component={this.props.token.token !== undefined ? () => <MyEvents/> : () => <Login/>}/>
						<Route path='/eventview/:guestcode?' component={() => <EventView />}/>
						<Redirect to='/home'/>
					</Switch>
				: 
					<Switch>
					<Route path='/errorpage/' component={() => <ErrorPage />} />
					<Redirect to='/errorpage/' />
					</Switch>}
				<Footer />
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));