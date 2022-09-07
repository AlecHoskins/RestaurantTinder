import axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './NearMe.css';


export default function NearMe() {

	const urls = useSelector(state => state.urls.urls);

	const [searchData, setSearchData] = useState();
	const [restaurantData, setRestaurantData] = useState();

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

	const restarauntCards = function() {  
		return restaurantData.map(card => (
			<div className="card" key={card.id}>
				<div>
					<h5>{card.name}</h5>
					<img src={card.image_url} alt="restaurant" style={{width: "40px"}} />
				</div>
				<div>
					<button className="add-restaurant">Add</button>
					<div className="address">
						<div>{card.location.address1}</div>
						<div>{card.location.city}, {card.location.state} {card.location.zipcode}</div> 
					</div>
					<div className="restaurant-phone">{card.phone}</div>
					<div className="categories">
						{(card.categories.map((e) => (<span className="category" key={e.alias}>{e.title}</span>)))}
					</div>
					<button className="restaurant-info">More Info</button>
				</div>
			</div>)) 
	};


	return (
		<div>
			<form>
				<label className="label-date" for="date">Date for Event*: <span className="tooltip">*Time zone is based on your local time.</span></label>
				<input type="datetime-local" name="date" onChange={handleInputChange} />
				<label className="label-location" for="location">Location: </label>
				<input type="text" onChange={handleInputChange} name="location" required/>
				<label className="label-cuisine" for="cuisine">Cuisine: </label>
				<select name="cuisine" onChange={handleInputChange}>
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
				</select>
				<button id="search-button" onClick={searchHandler}>Let's go</button>
			</form>
			<div>
				{(restaurantData) ? restarauntCards() : (<div></div>)}
			</div>
		</div>
	);
}