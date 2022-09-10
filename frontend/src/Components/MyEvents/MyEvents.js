import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {setEventDate, deleteCurrentEvent} from '../../Redux/actionCreators'
import { Redirect } from 'react-router-dom'

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

	const loadEvents = async() => {
		const myEvents = await axios.get(props.urls.getHostEvents + props.userId);
		setEvents(myEvents.data);
	}

	useEffect(() => {
		loadEvents();
	}, []);

	const handleNewEvent = () => {

		props.dispatch(deleteCurrentEvent());
		props.dispatch(setEventDate(eventDate));
		setNewEventCreated(true);

	}

	const handleDateChange = (event) => {
		setDate(event.target.value);
	}

	return (
		<div>
			<h1>My Events</h1>
			<div>
				{events && events.length > 0 ? 
					<ul>
						{events.map((e) => {
							return (<li key={e.id}>{e.day + ' ' + e.time + ' '}</li>)
						})}
					</ul>
					:
					<div>
						<h3>No events scheduled.</h3>
						<div>
							<input type="datetime-local" onChange={handleDateChange}/>
							<button id="schedule-new-event-button" onClick={handleNewEvent}>Schedule Event</button>
						</div>
					</div>
				}
			</div>
			{newEventCreated ? <Redirect to={'/nearme'}/> : <></>}
		</div>
	);
}

export default connect(mapStateToProps)(MyEvents);