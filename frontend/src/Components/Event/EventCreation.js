import axios from 'axios';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {setEventDeadlineDate} from '../../Redux/actionCreators'
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

	const [guestList, setGuestList] = useState("");
	const [created, setCreated] = useState(false);
	const [guests, setGuests] = useState([]);
	const [formValues, setFormValues] = useState([{name: ""}]);
	const blob = '/yellowblob.png'

	const handleDeadlineChange = (event) => {
		event.preventDefault();
		props.dispatch(setEventDeadlineDate(event.target.value))
	}

	useEffect(() => {
        document.title = "Restaurant Tinder - Event Creation"
      }, [])

	const generateLinks = async() => {
		//this is essentially a submit to create the event
		//so now build the event here

		// const createRestaurantDTO = (restaurant) => {
		// 	return {
		// 		id: restaurant.id,
		// 		name: restaurant.name,
		// 		imageUrl: restaurant.image_url,
		// 		isClosed: restaurant.is_closed,
		// 		categories: restaurant.categories,
		// 		location: restaurant.location,
		// 		phone: restaurant.phone,
		// 		displayPhone: restaurant.displayPhone,
		// 		hours: restaurant.hours
		// 	}
		// }

		const createGuestListDTO = () => {
			let guests = guestList.split(',');
			return guests.map((guest) => {
				return {
					id: 0,
					nickname: guest,
					inviteUrl: '',
					role: '',
					userId: 0
				}
			})
		}

		let selectedRestaurants = [...props.event.selectedRestaurants];
		let newEvent = {
			id: 0, //we don't have an id for a new event
			hostId: props.user.id,
			day: (new Date(props.event.date).getDay()), // do we start with Sun = 0 or Mon = 0?  getDay() is sun = 0
			time: (props.event.date),
			decision: 0, //what is this
			eventRestaurants: selectedRestaurants,
			guestList: createGuestListDTO()
		}

		//props.urls.createEvent - this isn't being used yet
		//const response = await axios.put(baseUrl + '/event/', newEvent);
		// if (response) {
		// 	setCreated(true);
		// }

		//Let's imagine it was successful
		setCreated(true);
		let data = [
			{
				id: 1,
				nickname: 'Fred',
				inviteUrl: 'inviteurl',
				role: 'not used anymore',
				userId: 0
			},
			{
				id: 2,
				nickname: 'John',
				inviteUrl: 'inviteurl2',
				role: 'not used anymore',
				userId: 0
			}
		];
		setGuests(data);

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
				<img src={blob} className='blob' alt='Yellow Blob'/>
			</div>
			<div className='eventCreation'>
				<div className='eventDetails'>
					<h2>Event Details</h2>
					<div className='eventTitle'>
						<h5>Event Title</h5>
						<input type="text" required/>
					</div>
					<div className='eventDateTime'>
						<h5>Event Date and Time</h5>
						<input type="datetime-local" defaultValue={props.event.date} required/>
					</div>
					<div className='eventDecisionDeadline'>
						<h5>Guests Decision Deadline</h5>
						<input type="datetime-local" required/>
					</div>
				</div>
				<div className='eventGuests'>
					<h5>Guest List:</h5>
					{formValues.map((element, index) => (
						<div className='form-inline'>
							<h5>Guest Name:</h5>
							<input type="text" name='name' value={element.name || ""} onChange={e => handleChange(index, e)} />
							{
								index ?
									<button className='remove' onClick={() => removeFormFields(index)}>Remove</button>
									: null
							}
						</div>
					))}
					<div className='guestButtons'>
							<button className='guestAdd' onClick={() => addFormFields()}>Add</button>
					</div>
					<button>Create Event</button>
				</div>
			</div>
		</div>
	);
}

export default connect(mapStateToProps)(EventCreation);