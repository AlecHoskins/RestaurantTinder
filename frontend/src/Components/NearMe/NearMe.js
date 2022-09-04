import React, { useState } from 'react';


export default function NearMe() {


	const [searchData, setSearchData] = useState();
	const [restaurantData, setRestaurantData] = useState();

	const searchHandler = (event) => {
		event.preventDefault();
		//call the API and get back the restaurants
		//dummy data
		const data = [{
			restaurantId: 1,
			name: 'restaurant 1',
			imgUrl: 'asdf.jpg',
			info: 'restaurant info'
		},
		{
			restaurantId: 2,
			name: 'restaurant 2',
			imgUrl: 'asdasdff.jpg',
			info: 'restaurant info'
		}];
		setRestaurantData(data);
	}

	const handleInputChange = (event) => {
		event.preventDefault();
		setSearchData({[event.target.name]: event.target.value});
	}

	const restarauntCards = function() { return restaurantData.map(card => (
	<div className="card" key={card.restarauntId}>
		<h5>{card.name}</h5>
		<img src={card.imgUrl} alt="restaurant" />
		<div>{card.info}</div>
	</div>)) };


	return (
		<div>
			<div>
				<input type="text" onChange={handleInputChange} name="city-zipcode"/>
				<select name="type" onChange={handleInputChange}>
					<option value="type1">type1</option>
					<option value="type2">type2</option>
					<option value="type3">type3</option>
				</select>
				<button id="search-button" onClick={searchHandler}>Let's go</button>
			</div>
			<div>
				{(restaurantData) ? restarauntCards() : (<div></div>)}
			</div>
		</div>
	);
}