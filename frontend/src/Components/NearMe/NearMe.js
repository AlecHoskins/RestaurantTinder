import axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';


export default function NearMe() {

	const urls = useSelector(state => state.urls.urls);

	const [searchData, setSearchData] = useState();
	const [restaurantData, setRestaurantData] = useState();

	const searchHandler = async (event) => {
		event.preventDefault();
		let zipcode = searchData.location;
		let term = searchData.cuisine;
		const restaurants = await axios.get(urls.yelp + "?term=" + term + "&location=" + zipcode);
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

	const restarauntCards = function() { console.log(restaurantData); 
		return restaurantData.map(card => (
			<div className="card" key={card.restarauntId}>
				<h5>{card.name}</h5>
				<img src={card.image_url} alt="restaurant" style={{width: "40px"}} />
				<div>{card.info}</div>
			</div>)) 
	};


	return (
		<div>
			<div>
				<input type="text" onChange={handleInputChange} name="location"/>
				<select name="cuisine" onChange={handleInputChange}>
					<option value="french">french</option>
					<option value="vietnamese">vietnamese</option>
					<option value="italian">italian</option>
				</select>
				<button id="search-button" onClick={searchHandler}>Let's go</button>
			</div>
			<div>
				{(restaurantData) ? restarauntCards() : (<div></div>)}
			</div>
		</div>
	);
}