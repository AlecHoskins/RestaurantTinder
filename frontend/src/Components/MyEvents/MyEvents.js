import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {connect} from 'react-redux';
import {setEventDate, deleteCurrentEvent} from '../../Redux/actionCreators'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"
import {deadlineHasPassed} from '../../Shared/timeFormatting'
import AddNewLink from '../Modal/AddNewLink';
import {API} from '../../Shared/API'
import './MyEvents.css'

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		urls: state.urls.urls,
		dispatch: state.dispatch,
		eventDate: state.event.date,
		token: state.token
	}
}

function MyEvents(props) {

	const [events, setEvents] = useState([]);
	const [eventDate, setDate] = useState();
	const [newEventCreated, setNewEventCreated] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const blob = '/yellowbloblogin.png';
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { timeStyle: 'short'};
	const dispatch = props.dispatch;

	const loadEvents = useCallback(async() => {
		if (props.userId && props.token) {
			const myEvents = await axios.get(props.urls.getHostEvents + props.userId, API.createAuthorizedHeaders(props.token)).catch((error) => {
				alert('There was an error while retrieving the events');
			});
			if (myEvents) { setEvents(myEvents.data); }
		}
	}, [props.urls.getHostEvents, props.userId]);

	useEffect(() => {
		//in this page we should not be storing a 'current event'
		dispatch(deleteCurrentEvent());
		loadEvents();
		document.title = "Restaurant Tinder - My Events"
		setOpenModal(false);
	}, [loadEvents, dispatch]);

	const handleNewEvent = () => {

		props.dispatch(deleteCurrentEvent());
		props.dispatch(setEventDate(eventDate));
		setNewEventCreated(true);

	}

	const handleDateChange = (event) => {
		setDate(event.target.value);
	}

	const handleModalChange = () => {
			setOpenModal(true);
	}
	
	const getMapOfEventCards = (eventCards) => {
		return (
			eventCards.map((e) => {
				return (<div key={e.id} className='upcomingCard'>
					<Link to={`/eventview/${e.id}`}><button>{!deadlineHasPassed(e.decisionDeadline) ? 'Event Details' : 'View Finalists'}{' >'}</button></Link>
					<h5>{e.eventTitle}</h5>
					<div>{new Date(e.eventDayTime).toLocaleDateString('en-US', dateOptions)} @ {new Date(e.eventDayTime).toLocaleTimeString('en-US', timeOptions)}</div>
					<div>Current winning restaraunt: Papa Mario's Pizza</div> {/* How are we calculating this */}
				</div>);
				// return (<li key={e.id}>{e.day + ' ' + e.time + ' '}</li>)
			}));
	}

	return (
		<div>
			<motion.div className='bgImg'
				initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
			>
				<img src={blob} alt='Yellow Blob' className='blob' />
			</motion.div>
			<motion.div className='myEventsCard'
				initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 0, transition: { duration: .4 }}}
			>
				<div className='myEventsInfo'>
					<h1>My Events</h1>
					{events && events.length > 0 ? <h5>You currently have {events.length} event{events.length === 1 ? "" : "s"} scheduled.</h5> : <span></span>}
					<button onClick={handleModalChange}>Add New Invite Link</button>
				</div>
					{events && events.length > 0 ? 
							<div className='myEvents'>
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
			</motion.div>
			<AddNewLink open={openModal} onClose={() => setOpenModal(false)}/>
			{newEventCreated ? <Navigate to={'/nearme'}/> : <></>}
		</div>
	);
}

export default connect(mapStateToProps)(MyEvents);