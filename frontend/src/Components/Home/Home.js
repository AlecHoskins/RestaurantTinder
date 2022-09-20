import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import { motion } from "framer-motion"
import {deadlineHasPassed} from '../../Shared/timeFormatting'
import axios from 'axios';
import './Home.css'
import {API} from './../../Shared/API'

//Map State to Props
const mapStateToProps = state => {
	return {
		userId: state.user.id,
		urls: state.urls.urls,
		dispatch: state.dispatch,
		eventDate: state.event.date,
		token: state.token
	}
}

function Home(props) {
    
    //Set constants and states
    let currUser = useSelector(state => state.user.username);
    const [events, setEvents] = useState([]);
    const userBlob = './yellowblobuser.png'
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { timeStyle: 'short'};

    //API call to get a user's events
    const loadEvents = useCallback(async() => {
        if (props.userId === null) { return; }
	    const myEvents = await axios.get(props.urls.getUserEvents + props.userId, API.createAuthorizedHeaders(props.token)).catch((error) => {
			alert('There was an error while retrieving the events');
		});
		if (myEvents) { setEvents(myEvents.data); }
	}, [props.urls.getHostEvents, props.userId, props.token]);

    //useEffect to set document title and trigger loadEvents Function
    useEffect(() => {
        document.title = "Restaurant Tinder - Home"
        loadEvents();
      }, [loadEvents])

    //Function to dynamically change the number of Upcoming Events
    const getNumberOfUpcomingEvents = (eventCards) => {
        const numWeeks = 2;
        const today = new Date();
        const twoWeeks = new Date();
        twoWeeks.setDate(twoWeeks.getDate() + numWeeks * 7);
        let events = 0;
        eventCards.map((e) => {
            const newDate = new Date(e.eventDayTime)
            if(newDate <= twoWeeks && newDate >= today) {
                events++;
            }
			return e;
        })
        return events;
    }

    //Function to check the user's events and see if they are within a 2 week period
    const getMapOfUpcomingEvents = (eventCards) => {
        const numWeeks = 2;
        const today = new Date();
        const twoWeeks = new Date();
        twoWeeks.setDate(twoWeeks.getDate() + numWeeks * 7);
        return (
            eventCards.map((e) => {
                const newDate = new Date(e.eventDayTime)
                if(newDate <= twoWeeks && newDate >= today) {
                    return (
                        <div key={e.id} className='upcomingCard'>
                            <Link to={`/eventview/${e.id}`}><button>{!deadlineHasPassed(e.decisionDeadline) ? 'Event Details' : 'View Finalists'}{' >'}</button></Link>
                            <h5>{e.eventTitle}</h5>
                            <div>{newDate.toLocaleDateString('en-US', dateOptions)} @ {newDate.toLocaleTimeString('en-US', timeOptions)}</div>
                        </div>
                    ) 
                } else {
					return null;
				}
            })
        )
    }  

    
    return(
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <img src={userBlob} alt="Yellow Blob" id='homeBlob' />
            </motion.div>
            <motion.div className='userInfo'
                initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 0, transition: { duration: .4 }}}
            >
                <div className='welcomeCard'>
                    <h3>Welcome, {currUser}</h3>
                    <h5>You have <span id="yellow">{getNumberOfUpcomingEvents(events)}</span> upcoming event{getNumberOfUpcomingEvents(events) === 1 ? "" : "s" } {'>'}</h5>
                    <Link to='/myevents'><button>My Events</button></Link>
                    <Link to='/nearme'><button>New Event</button></Link>
                </div>
                <div className='upcomingEvents'>
                    {getMapOfUpcomingEvents(events)}
                </div>
            </motion.div>
        </div>
    )
}

export default connect(mapStateToProps)(Home);