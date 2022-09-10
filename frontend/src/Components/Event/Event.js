import axios from 'axios';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {setEventDeadlineDate} from '../../Redux/actionCreators'
import baseUrl from '../../Shared/baseUrl';
import './Event.css'

const mapStateToProps = state => {
	return {
		event: state.event,
		user: state.user,
		urls: state.urls.urls,
		dispatch: state.dispatch
	}
}

function Event(props) {

	const [guestList, setGuestList] = useState("");
	const [created, setCreated] = useState(false);

	const handleDeadlineChange = (event) => {
		event.preventDefault();
		props.dispatch(setEventDeadlineDate(event.target.value))
	}

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
		const response = await axios.put(baseUrl + '/event/', newEvent);
		if (response) {
			setCreated(true);
		}

	}

	return (
		<div className='event-details'>
			{/* <p>{JSON.stringify(props.event)}</p> */}
			{/* {created ? <h1>Created</h1> : <h1>Didn't work</h1>} */}
			<h2>Event Details</h2>
			<h3>{props.event.deadlineDate}</h3>
			<h4>Select Guests Decision Deadline: </h4>
			<button id="generate-links" onClick={generateLinks}>Generate Links</button>
			<form className='event-detail-form'>
				<div>
					<label className="label-date" htmlFor="deadline-date">Guests Decision Deadline: <span className="tooltip">*Time zone is based on your local time.</span>
					<input type="datetime-local" name="deadline-date" onChange={handleDeadlineChange} /></label>
				</div>
				<div>
					<label className='label-guestlist' htmlFor='guest-list'>Guest List:</label>
					<textarea name="guest-list" rows="10" cols="20" onChange={(e) => {setGuestList(e.target.value);}}/>
				</div>
			</form>
		</div>
	);
}

export default connect(mapStateToProps)(Event);