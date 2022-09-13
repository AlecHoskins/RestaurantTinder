import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {setEventDate, deleteCurrentEvent} from '../../Redux/actionCreators'
import { Redirect, Link } from 'react-router-dom'
import './MyEvents.css'

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		urls: state.urls.urls,
		dispatch: state.dispatch,
		eventDate: state.event.date
	}
}

function MyEvents(props) {

	const [events, setEvents] = useState([]);
	const [eventDate, setDate] = useState();
	const [newEventCreated, setNewEventCreated] = useState(false);
	const blob = '/yellowbloblogin.png';

	const loadEvents = async() => {
		const myEvents = await axios.get(props.urls.getHostEvents + props.userId);
		setEvents(myEvents.data);
	}

	useEffect(() => {
		loadEvents();
		document.title = "Restaurant Tinder - My Events"
	}, []);

	const handleNewEvent = () => {

		props.dispatch(deleteCurrentEvent());
		props.dispatch(setEventDate(eventDate));
		setNewEventCreated(true);

	}

	const handleDateChange = (event) => {
		setDate(event.target.value);
	}
	
	const getMapOfEventCards = (eventCards) => {
		return (
			eventCards.map((e) => {
				return (<div className='upcomingCard'>
					<Link to='/eventview'><button>Event Details {'>'}</button></Link>
					<h5>{e.eventTitle}</h5>
					<div>{e.eventDayTime}</div>
					<div>Current winning restaraunt: Papa Mario's Pizza</div> {/* How are we calculating this */}
				</div>);
				// return (<li key={e.id}>{e.day + ' ' + e.time + ' '}</li>)
			}));
	}

	return (
		<div>
			<div className='bgImg'>
				<img src={blob} alt='Yellow Blob' className='blob' />
			</div>
			<div className='myEventsCard'>
				<div className='myEventsInfo'>
					<h1>My Events</h1>
					{events && events.length > 0 ? <h5>You currently have {events.length} event{events.length === 1 ? "" : "s"} scheduled.</h5> : <span></span>}
					<button>Add New Invite Link</button>
				</div>
				<div className='myEvents'>
					{events && events.length > 0 ? 
							<div className='upcomingEvents'>
								{getMapOfEventCards(events)}
							</div>
						:
						<div className='noEvents'>
							<h4>You currently have no events in your events page.</h4>
							<div>To add events, you can create an event below or add a new invite link at the bottom left.</div>
							<div className='createNewEventForm'>
								<h5>Create a New Event</h5>
								<input type="datetime-local" onChange={handleDateChange}/>
								<button id="schedule-new-event-button" onClick={handleNewEvent}>Schedule Event</button>
							</div>
						</div>
					}
				</div>
			</div>
			{newEventCreated ? <Redirect to={'/nearme'}/> : <></>}
		</div>
	);
}

export default connect(mapStateToProps)(MyEvents);