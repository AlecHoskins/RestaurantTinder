import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, connect} from 'react-redux';
import './NearMe.css';
import {setSelectedRestaurants, setEventDate} from '../../Redux/actionCreators'
import { Link } from 'react-router-dom';
import {militaryTimeToStandardTime, numDayToString} from '../../Shared/timeFormatting'
import { motion } from "framer-motion"
import { API } from '../../Shared/API'

//Map State to Props
const mapStateToProps = state => {
	return {
		date: state.event.eventDayTime,
		eventRestaurants: state.event.eventRestaurants,
		dispatch: state.dispatch,
		token: state.token
	}
}

function NearMe(props) {

	//Set consants and state
	const urls = useSelector(state => state.urls.urls);
	const dispatch = props.dispatch;
	const phoneLogo = '/phone-icon.png';
	const yellowBlob = '/yellowblobsignup.png'
	const [searchData, setSearchData] = useState();
	const [restaurantData, setRestaurantData] = useState();

	//useEffect to set document title and dispatch set selected restaurants
	useEffect(() => {
        document.title = "Restaurant Tinder - New Event"
		dispatch(setSelectedRestaurants([]));
      }, [dispatch])  

	//API call to Yelp API to search for restaraunts that match user's search parameters
	const searchHandler = async (event) => {
		event.preventDefault();
		
		if (!searchData || !searchData.location) {
			alert("Please enter a location");
			return;
		}
		let zipcode = searchData.location;
		let term = (searchData.cuisine ? searchData.cuisine : 'restaurant');
		const restaurants = await axios.get(urls.yelp + "?term=" + term + "&location=" + zipcode, API.createAuthorizedHeaders(props.token)).catch((error) => {
			alert('An error has occured while searching for restaurants');
		})

		//check to see if these restaurants have already been added
		if (props.eventRestaurants.length > 0 && restaurants.data && restaurants.data.length > 0) {
			console.log(JSON.stringify(restaurants.data))
			restaurants.data.map((restaurant) => {
				restaurant.added = (props.eventRestaurants.find((selection) => (restaurant.id === selection.id)));
				return restaurant;
			})
		}

		await setRestaurantData(restaurants.data);
	}

	//Handles state change of date on input
	const handleDateChange = (event) => {
		dispatch(setEventDate(event.target.value));
		handleInputChange(event);
	}

	//Handles state change on input
	const handleInputChange = (event) => {
		event.preventDefault();
		setSearchData((previousSearchData) => {
			return {
				...previousSearchData,
				[event.target.name]: event.target.value
			}
		});
	}

	//API call to Yelp API by Restaurant ID for Hours information
	const handleMoreInfo = async (id) => {
		const moreInfo = await axios.get(urls.yelpById + id, API.createAuthorizedHeaders(props.token));

		//Swapping out restaurant card data with detail data
		let newData = [...restaurantData];
		for(let i = 0; i < newData.length; i++) {
			if (newData[i].id === moreInfo.data.id) {
				newData[i] = moreInfo.data;
				setRestaurantData(newData);
				break;
			}
		}
	}

	//Map hours for display on the restaurant card
	const mapDays = (hour) => {
		var curDay = null;
		if (!hour.open) { return <span>No hours found</span> }
		return hour.open.map((day, index) => {
				const jsxDay = (
					<tr key={index}>
						<th>{curDay !== day.day && numDayToString(day.day)}</th>
						<td>{militaryTimeToStandardTime(day.start)} - {militaryTimeToStandardTime(day.end)}</td>
					</tr>
				);
				curDay = day.day;
				return jsxDay;
			}
		)
	}

	//Handles add and removal of restaraunts to event creation details
	const handleRestaurantAddRemove = (card) => {
		let restaurants = [...props.eventRestaurants];
		if (!card.added) {
			restaurants.push(card);
		} else {
			//remove the element based on the index of the element with the same id as the card
			restaurants.splice(restaurants.indexOf(
				restaurants.find((r) => r.id === card.id)), 1);
		}
		card.added = (!card.added) ? true : false;
		//setting this to the redux store so event js can access it
		dispatch(setSelectedRestaurants(restaurants));
	}

	//Maps search results of restaraunts to seperate div cards
	const restarauntCards = function() {  
		return (
			restaurantData.map(card => (
			<div className="card" key={card.id} >
				<div className='titleSection'>
					<h5 className='card-name'>{card.name}</h5>
					<button className="add-restaurant" onClick={() => handleRestaurantAddRemove(card)}>{!card.added ? "Add" : "Remove"}</button>
				</div>
				<div className='imageSection'>
					{card.hours && card.hours[0] && card.hours[0].is_open_now && <span className='open-now'>Open Now</span>}
					{card.hours && card.hours[0] && !card.hours[0].is_open_now && <span className='closed-now'>Closed</span>}
					{!card.hours && <span className='no-span'></span>}
					<img className='card-img' src={card.image_url} alt="restaurant" />
				</div>
				<div className='infoSection'>
					<div className="address">
						<div>{card.location.address1}</div>
						<div>{card.location.city}, {card.location.state} {card.location.zipcode}</div> 
					</div>
					<div className="restaurant-phone">
						<img src={phoneLogo} className="phoneLogo" alt="📞" />
						<a className="telephone-link" href={`tel:${card.phone}`}>{card.phone}</a>
					</div>
					<div className="categories">
						{(card.categories.map((e) => (<span className="category" key={e.alias}>{e.title}</span>)))}
					</div>
					<a href={`tel:${card.phone}`}><button className='restaurant-call-to-order'>Call to Order</button></a>
					{!card.hours && <button className="restaurant-info" onClick={() => handleMoreInfo(card.id)}>Display Hours</button>}
					<div id="hoursInfo">{card.hours && card.hours.map((hour, index) => {
						return (
							<table key={index}>
								<tbody>
									{mapDays(hour)}
								</tbody>
							</table>
						)
					})}</div>
				</div>
			</div>))
		);
	};


	return (
		<div className='nearme'>
			<motion.div
				initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
			>
				<img src={yellowBlob} className='eventBlob' alt='Yellow Blob' />
			</motion.div>
			<motion.div className='eventSearch'
				initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "50%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 0, transition: { duration: .4 }}}
			>
				<form className="search-form">
					<label className="label-date" htmlFor="date">Date for Event*: <span className="tooltip">*Time zone is based on your local time.</span>
					<input type="datetime-local" name="date" onChange={handleDateChange} defaultValue={props.date} /></label>
					<label className="label-location" htmlFor="location">Location: 
					<input className="input-location" type="text" onChange={handleInputChange} name="location" required/></label>
					<label className="label-cuisine" htmlFor="cuisine">Cuisine: 
					<select className="input-cuisine" name="cuisine" onChange={handleInputChange}>
						<option value="restaurant">None</option>
						<option value="french">French</option>
						<option value="chinese">Chinese</option>
						<option value="japanese">Japanese</option>
						<option value="vietnamese">Vietnamese</option>
						<option value="italian">Italian</option>
						<option value="greek">Greek</option>
						<option value="mexican">Mexican</option>
						<option value="thai">Thai</option>
						<option value="american">American</option>
						<option value="pizza">Pizza</option>
						<option value="burgers">Burgers</option>
					</select></label>
					<button id="search-button" onClick={searchHandler}>Search</button>
				</form>
				<div className='restaurant-cardContainer'>
					{(restaurantData) ? restarauntCards() : (<div></div>)}
				</div>
				{props.eventRestaurants && props.eventRestaurants.length > 1 ? 
						<Link to="/Event"><button id="event-button-mobile">Create Event</button></Link> : <></>}
				<div id="eventCO">
					<ul className='selected-restaurants'>
						{props.eventRestaurants.map((card) => 
							<li style={{color: "black"}} key={card.id}>
								{card.name}
								<button className="remove-restaurant" onClick={() => handleRestaurantAddRemove(card)}>❌</button>
							</li>
						)}
					</ul>
					{props.eventRestaurants && props.eventRestaurants.length > 1 ? 
						<Link to="/Event"><button id="event-button">Create Event</button></Link> : <></>}
				</div>
			</motion.div>
		</div>
	);
}

export default connect(mapStateToProps)(NearMe);