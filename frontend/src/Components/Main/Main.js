import {Component} from 'react'
import {addToken, deleteUser, setURLs, deleteCurrentEvent} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import baseUrl from '../../Shared/baseUrl'
import axios from 'axios'
import AnimatedRoutes from '../Animations/AnimatedRoutes'

//Map State to Props
const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
		urls: state.urls
    }
}

//Map Dispatch to Props
const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},
	setURLs: (data) => { dispatch(setURLs(data))},
	deleteCurrentEvent: () => { dispatch(deleteCurrentEvent())}
});



class Main extends Component {

    //Constructor for props and urls
    constructor(props){
        super(props);
		this.getUrls();
    }

    //API to get base URLS
	getUrls = () => {
		axios.get(baseUrl).then((response) => {
			this.props.setURLs(response.data);
		})
	}

    render(){

		if (!this.props.urls.urls) {
			console.log('reget urls');
			this.getUrls();
		}

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