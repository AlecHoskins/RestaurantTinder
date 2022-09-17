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
import AnimatedRoutes from '../Animations/AnimatedRoutes'

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
                <AnimatedRoutes />
				<Footer />
            </div>
        )
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Main);