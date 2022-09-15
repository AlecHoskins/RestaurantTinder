import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import {setEventDeadlineDate, setEventTitle, setEventDate, setEventGuests} from '../../Redux/actionCreators'
import baseUrl from '../../Shared/baseUrl';
import './EventCreation.css'

const mapStateToProps = state => {
	return {
		event: state.event,
		user: state.user,
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

function EventCreation(props) {

	const [created, setCreated] = useState(false);
	const [formValues, setFormValues] = useState([{name: ""}]);
	const blob = '/yellowblob.png'

	const handleDeadlineChange = (event) => {
		props.dispatch(setEventDeadlineDate(event.target.value))
	}

	useEffect(() => {
        document.title = "Restaurant Tinder - Event Creation"
      }, [])

	const createEvent = async() => {
		//this is essentially a submit to create the event
		//so now build the event here

		const createGuestListDTO = () => {
			return formValues.map((guest) => {
				return {
					id: 0,
					eventId: 0, // not known yet at time of creation
					nickname: guest.name,
					inviteUrl: '',
					userId: 0, //not known yet at time of creation
					vote: []
				}
			})
		}
		let guestListDTO = createGuestListDTO();
		props.dispatch(setEventGuests(guestListDTO));

		let selectedRestaurants = [...props.event.selectedRestaurants];
		//console.log(props.event);
		let newEvent = {
			id: 0, //we don't have an id for a new event
			hostId: props.user.id,
			eventTitle: props.event.eventTitle,
			eventDayTime: props.event.eventDayTime,
			decisionDeadline: props.event.decisionDeadline,
			eventRestaurants: selectedRestaurants,
			guestList: props.event.guestList
		}

		//console.log(JSON.stringify(newEvent));

		//props.urls.createEvent - this isn't being used yet
		//const response = await axios.post(baseUrl + '/event/', newEvent);

		//if (response && response.data === true) { setCreated(true); }

		//assume it worked
		setCreated(true);

	}

	//Handles Guest List changes
	let handleChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	}

	let addFormFields = () => {
		setFormValues([...formValues, { name: ""}])
	}

	let removeFormFields = (i) => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	}

	return (
		<div className='event-details'>
			{/* <p>{JSON.stringify(props.event)}</p> */}
			{/* {created ? <h1>Created</h1> : <h1>Didn't work</h1>} */}
			<div className='bgImg' >
				<img src={blob} className='createBlob' alt='Yellow Blob'/>
			</div>
			<div className='eventCreation'>
				<div className='eventDetails'>
					<h2>Event Details</h2>
					<div className='eventTitle'>
						<h5>Event Title</h5>
						<input type="text" name="event-title" onChange={e => props.dispatch(setEventTitle(e.target.value))}required/>
					</div>
					<div className='eventDateTime'>
						<h5>Event Date and Time</h5>
						<input type="datetime-local" onChange={e => props.dispatch(setEventDate(e.target.value))} defaultValue={props.event.date} required/>
					</div>
					<div className='eventDecisionDeadline'>
						<h5>Guests Decision Deadline</h5>
						<input type="datetime-local" onChange={e => handleDeadlineChange(e)} required/>
					</div>
					{!created ? <button onClick={createEvent}>Create Event</button> : <Redirect to="/EventView/" />}
				</div>
				<div className='eventGuests'>
					<h3>Guest List:</h3>
					<div className='guestForm'>
						{formValues.map((element, index) => (
							<div className='form-inline' key={index}>
								<label>Name:</label>
								<input type="text" name='name' value={element.name || ""} onChange={e => handleChange(index, e)} />
								<button className='addRemoveButtons' onClick={() => addFormFields()}>➕</button>
								{
									index ?
										<button className='addRemoveButtons' id='remove' onClick={() => removeFormFields(index)}>❌</button>
										: null
								}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(EventCreation);