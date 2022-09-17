import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom'
import {setEventDeadlineDate, setEventTitle, setEventDate, setEventGuests, setEvent} from '../../Redux/actionCreators'
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

	// const [created, setCreated] = useState(false);
	const [formValues, setFormValues] = useState([{name: ""}]);
	const [eventID, setEventID] = useState();
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

		//validate form:
		let validation = '';
		console.log(props.event)
		if (props.event.eventTitle === undefined) { validation += '-Event title must not be empty \n'}
		let emptyGuest = formValues.find((guest) => guest.name === '');
		if (emptyGuest) { validation += '-Guest names must not be empty. Please enter a guest name.\n' }
		let todaysDate = new Date();
		let eventDate;
		let decisionDate;
		let isEventDateEmpty = false;
		let isDecisionDateEmpty = false;
		if (props.event.eventDayTime === '') {
			validation += '-Event Date must not be empty \n';
			isEventDateEmpty = true;
		} else {
			eventDate = new Date(props.event.eventDayTime);
		}
		if (props.event.decisionDeadline === undefined) {
			validation += '-Guest Decision Deadline must not be empty \n';
			isDecisionDateEmpty = true;
		} else {
			decisionDate = new Date(props.event.decisionDeadline);
		}
		if((eventDate <= todaysDate) && !isEventDateEmpty) { validation += '-Event must be for a future date \n'}
		if((decisionDate <= todaysDate) && !isDecisionDateEmpty) { validation += '-Guest Decision Deadline must be for a future date \n'}
		if((decisionDate >= eventDate) && !isDecisionDateEmpty) { validation += '-Guest Decision Deadline must occur before the Event date \n'}
		if (validation.length > 0) { alert(validation); return; }

		const createGuestListDTO = () => {
			return formValues.map((guest) => {
				return {
					nickname: guest.name,
					vote: []
				}
			})
		}
		let guestListDTO = createGuestListDTO();
		//add the current user to the guest list
		guestListDTO.push({
			nickname: props.user.username,
			userId: props.user.id,
			vote: []
		})
		props.dispatch(setEventGuests(guestListDTO));

		

		let eventRestaurants = [...props.event.eventRestaurants];

		console.log(eventRestaurants)
		//console.log(props.event);
		let newEvent = {
			id: 0, //we don't have an id for a new event
			hostId: props.user.id,
			eventTitle: props.event.eventTitle,
			eventDayTime: props.event.eventDayTime,
			decisionDeadline: props.event.decisionDeadline,
			eventRestaurants: eventRestaurants,
			guestList: props.event.guestList
		}

		console.log(JSON.stringify(newEvent));

		//props.urls.createEvent - this isn't being used yet
		const response = await axios.post(baseUrl + '/event/', newEvent);
		//console.log(response.data);
		if (response && response.data) { 
			newEvent.id = response.data.id;
			newEvent.guestList = response.data.guestList;
			newEvent.eventRestaurants = response.data.eventRestaurants;
			newEvent.hostId = response.data.hostId;
			// console.log(newEvent);
			//setCreated(true); 
			props.dispatch(setEvent(newEvent));
			setEventID(newEvent.id);
		}

		//assume it worked
		//setCreated(true);

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
		if (formValues.length > 1) {
			newFormValues.splice(i, 1);
		} else {
			newFormValues[0].name = "";
		}
		setFormValues(newFormValues);
	}

	return (
		<div className='event-details'>
			{/* <p>{JSON.stringify(props.event)}</p> */}
			{/* {created ? <h1>Created</h1> : <h1>Didn't work</h1>} */}
			<motion.div className='bgImg' 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<img src={blob} className='createBlob' alt='Yellow Blob'/>
			</motion.div>
			<motion.div className='eventCreation'
				initial={{ left: "-300px", transition: { duration: .4 } }}
				animate={{ left: "50%", transition: { duration: .4, delay: .4 } }}
				exit={{ left: "-300px", transition: { duration: .4 }}}
			>
				<div className='eventDetails'>
					<h2>Event Details</h2>
					<div className='eventTitle'>
						<h5>Event Title</h5>
						<input type="text" name="event-title" onChange={e => props.dispatch(setEventTitle(e.target.value))}required/>
					</div>
					<div className='eventDateTime'>
						<h5>Event Date and Time</h5>
						<input type="datetime-local" onChange={e => props.dispatch(setEventDate(e.target.value))} defaultValue={props.event.eventDayTime} required/>
					</div>
					<div className='eventDecisionDeadline'>
						<h5>Guests Decision Deadline</h5>
						<input type="datetime-local" onChange={e => handleDeadlineChange(e)} required/>
					</div>
					{(!eventID) ? <button onClick={createEvent}>Create Event</button> : <Navigate to={`/EventView/${props.event.id}`} />}
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
									<button className='addRemoveButtons' id='remove' onClick={() => removeFormFields(index)}>❌</button>
								}
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default connect(mapStateToProps)(EventCreation);