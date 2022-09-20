import {Route, useLocation, Routes, Navigate} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {connect} from 'react-redux'
import NearMe from '../NearMe/NearMe'
import MainPage from '../MainPage/MainPage'
import EventCreation from '../Event/EventCreation'
import MyEvents from '../MyEvents/MyEvents'
import EventView from '../Event/EventView'
import ErrorPage from '../ErrorPage/ErrorPage'
import { AnimatePresence } from 'framer-motion'

//Map State to Props
const mapStateToProps = state => {
    return {
        token: state.token,
        urls: state.urls
    }
}

function AnimatedRoutes(props) {

    //Sets useLocation for framer-motion
    const location = useLocation();

        return (
            <AnimatePresence>
                    {props.urls ? 
                        <Routes location={location} key={location.pathname}>
							<Route path='/' element={<Navigate to='/home' />} />
                            <Route path='/home' element={props.token.token !== undefined ? <Home/> : <MainPage/>}/>
                            <Route path='/login' element={props.token.token !== undefined ? <Navigate to='/home' /> : <Login/>}/>
                            <Route path='/register'element={<Register/>}/>
                            <Route path='/nearme'element={props.token.token !== undefined ? <NearMe/> : <Login/>}/>
                            <Route path='/event' element={props.token.token !== undefined ? <EventCreation/> : <Login/>}/>
                            <Route path='/myevents' element={props.token.token !== undefined ? <MyEvents/> : <Login/>}/>
                            <Route path='/eventview/:id' element={props.token.token !== undefined ? <EventView /> : <Login/>}>
								<Route path='/eventview/:id/:guestid' element={<EventView />} />
							</Route>
                            <Route path='/errorpage/' element={<ErrorPage/>} />
                        </Routes>
                    : 
                        <Routes>
                        <Route path='/errorpage/' element={<ErrorPage/>} />
                        <Navigate to='/errorpage/' />
                        </Routes>}
            </AnimatePresence>
        )

}

export default connect(mapStateToProps)(AnimatedRoutes);