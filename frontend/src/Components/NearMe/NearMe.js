import axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './NearMe.css';


export default function NearMe() {

	const urls = useSelector(state => state.urls.urls);

	const phoneLogo = '/phone-icon.png';

	const [searchData, setSearchData] = useState();
	const [restaurantData, setRestaurantData] = useState();
	const [restaurantDetail, setRestaurantDetail] = useState();
	const [restaurantDetailId, setRestaurantDetailId] = useState();

	const timeToUnix = (time = new Date()) => {
		return Math.floor(time.getTime() / 1000);
	}

	const searchHandler = async (event) => {
		event.preventDefault();
		if (!searchData || !searchData.location || !searchData.date) {
			alert("Please enter a location and date");
			return;
		}
		let zipcode = searchData.location;
		let term = (searchData.cuisine ? searchData.cuisine : 'restaurant');
		let open_at = timeToUnix(new Date(searchData.date)) 
		const restaurants = await axios.get(urls.yelpUnixSearch + "?term=" + term + "&location=" + zipcode + "&eventUnixTime=" + open_at);
		await setRestaurantData(restaurants.data);
	}

	const handleInputChange = (event) => {
		event.preventDefault();
		setSearchData((previousSearchData) => {
			return {
				...previousSearchData,
				[event.target.name]: event.target.value
			}
		});
	}

	const handleMoreInfo = async (id) => {
		const moreInfo = await axios.get(urls.yelpById + id);
		await setRestaurantDetail(moreInfo.data);
		await setRestaurantDetailId(id);
	}

	const numDayToString = (numDay) => {
		switch(numDay) {
			case 0:
				return "Mon";
			case 1:
				return "Tue";
			case 2:
				return "Wed";
			case 3:
				return "Thu";
			case 4:
				return "Fri";
			case 5:
				return "Sat";
			case 6:
				return "Sun";
			default:
				return "";
		}
	}

	const militaryTimeToStandardTime = (time) => {
		const firstHalf = time.substring(0, 2);
		const secondHalf = time.substring(2);
		let formattedFirstHalf = firstHalf;
		let amPm = "AM";
		if (firstHalf == "24" || firstHalf === "00") {
			formattedFirstHalf = 12;
		} else if (firstHalf > 12) {
			formattedFirstHalf = (firstHalf % 12);
			amPm = "PM";
		} else if (firstHalf == 12) {
			amPm = "PM";
		}
		if (firstHalf < 10 && formattedFirstHalf !== 12) {
			formattedFirstHalf = ("" + formattedFirstHalf).substring(1)
		}
		return formattedFirstHalf + ":" + secondHalf + " " + amPm;
	}

	const restarauntCards = function() {  
		return restaurantData.map(card => (
			<div className="card" key={card.id}>
				<div>
					<h5 className='card-name'>{card.name}</h5>
					<img className='card-img' src={card.image_url} alt="restaurant" />
				</div>
				<div>
					<button className="add-restaurant">Add</button>
					<div className="address">
						<div>{card.location.address1}</div>
						<div>{card.location.city}, {card.location.state} {card.location.zipcode}</div> 
					</div>
					<div className="restaurant-phone"><img src={phoneLogo} className="phoneLogo" /><a className="telephone-link" href={`tel:${card.phone}`}>{card.phone}</a></div>
					<div className="categories">
						{(card.categories.map((e) => (<span className="category" key={e.alias}>{e.title}</span>)))}
					</div>
					<button className="restaurant-info" onClick={() => handleMoreInfo(card.id)}>Display Hours</button>
					<div>{restaurantDetailId === card.id && restaurantDetail && restaurantDetail.hours.map((hour) => {
						console.log(restaurantDetailId);
						return (
							<table>
							<tbody>
							{hour.open.map((day) => (
								<tr>
									<th>{numDayToString(day.day)}</th>
									<td>{militaryTimeToStandardTime(day.start)} - {militaryTimeToStandardTime(day.end)}</td>
								</tr>)
							)}
							</tbody>
							</table>
						)
					})}</div>
				</div>
			</div>)) 
	};


	return (
		<div className='nearme'>
			<form>
				<label className="label-date" htmlFor="date">Date for Event*: <span className="tooltip">*Time zone is based on your local time.</span>
				<input type="datetime-local" name="date" onChange={handleInputChange} /></label>
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
				<button id="search-button" onClick={searchHandler}>Let's go</button>
			</form>
			<div className='restaurant-cardContainer'>
				{(restaurantData) ? restarauntCards() : (<div></div>)}
			</div>
		</div>
	);
}