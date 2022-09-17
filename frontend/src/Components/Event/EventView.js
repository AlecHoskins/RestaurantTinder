import React from "react";
import './EventView.css';
import {connect} from 'react-redux'
<<<<<<< HEAD
import { Redirect, withRouter } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
=======
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
>>>>>>> 6cf9a229d57489e90e6289267ce41d52d9d1588b
import axios from "axios";
import {setEventGuestVotes, setEvent} from '../../Redux/actionCreators'
import {militaryTimeToStandardTime, numDayToString} from '../../Shared/timeFormatting'

const mapStateToProps = state => {
    return {
		userId: (state.user) ? state.user.id : 0,
		event: state.event,
        token: state.token,
		urls: state.urls,
		dispatch: state.dispatch,
    }
}

function EventView(props) {
	/*
    const dummyData = [{"id":"SCxEMLXGhbVpoQRIv4bOdg","name":"Anong's","categories":[{"alias":"thai","title":"Thai"}],"location":{"address1":"101 E Ivinson Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077456262","hours":null,"closed":false,"image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/dulTbK6KQKrvJ-hsMzbhfw/o.jpg","is_closed":false,"display_phone":"(307) 745-6262"},{"id":"86T-CAGwj9aclTnOfxPOzg","name":"Thai Spice","categories":[{"alias":"thai","title":"Thai"}],"location":{"address1":"204 S 3rd St","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13074603440","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/oD1l2Qq83VDCedRufmepOg/o.jpg","is_closed":false,"display_phone":"(307) 460-3440"},{"id":"EbA1nez8RPB8kFYBKFZGfQ","name":"The New Mandarin","categories":[{"alias":"chinese","title":"Chinese"}],"location":{"address1":"1254 N 3rd St","city":"Laramie","state":"WY","zip_code":"82072"},"phone":"+13077428822","hours":null,"closed":false,"image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/i_yuaae7NcOgtXbCk5lquw/o.jpg","is_closed":false,"display_phone":"(307) 742-8822"},{"id":"VXagSQWvu9sKKtujh5S6Zw","name":"Sweet Melissa's","categories":[{"alias":"vegetarian","title":"Vegetarian"},{"alias":"bars","title":"Bars"},{"alias":"cafes","title":"Cafes"}],"location":{"address1":"213 S 1st St","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077429607","hours":null,"closed":false,"image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/3eO14T91ahdyleL_27MdTw/o.jpg","is_closed":false,"display_phone":"(307) 742-9607"},{"id":"H2kyfGjQJZYoZdNMQvP3zQ","name":"Speedgoat","categories":[{"alias":"mexican","title":"Mexican"},{"alias":"asianfusion","title":"Asian Fusion"},{"alias":"tex-mex","title":"Tex-Mex"}],"location":{"address1":"213 Grand Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13074603396","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/EtTVx2PEQl9eSLv41-PcTw/o.jpg","is_closed":false,"display_phone":"(307) 460-3396"},{"id":"anFMxAcBOHOI26tzDU8GgQ","name":"Sushi Boat","categories":[{"alias":"sushi","title":"Sushi Bars"},{"alias":"korean","title":"Korean"},{"alias":"japanese","title":"Japanese"}],"location":{"address1":"421 Boswell Dr","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077420355","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/klyjQ_ttXngACO1LSQtr9A/o.jpg","is_closed":false,"display_phone":"(307) 742-0355"},{"id":"ErnRwQoJGrePU4FBpMDDng","name":"Jeffrey's Bistro","categories":[{"alias":"salad","title":"Salad"},{"alias":"soup","title":"Soup"},{"alias":"sandwiches","title":"Sandwiches"}],"location":{"address1":"123 E Ivinson Ave","city":"Laramie","state":"WY","zip_code":"82070"},"phone":"+13077427046","hours":null,"closed":false,"image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/Iqjh5BNJZcP7dOvACSeIyg/o.jpg","is_closed":false,"display_phone":"(307) 742-7046"}];
	*/

    const tuBlack = '/thumbsupblack.png';
    const tuGreen = '/thumbsupgreen.png';
    const tdBlack = '/thumbsdownblack.png';
    const tdRed = '/thumbsdownred.png';
    const phoneLogo = '/phone-icon.png';
    const blob = '/yellowblobsignup.png';
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { timeStyle: 'short'};

	const [guest, setGuest] = useState(null);
	const [isGuest, setIsGuest] = useState(true);
	const [votes, setVotes] = useState([]);
	
	const eventId = props.event.id;
	const userId = props.userId;
	const params = props.match.params;
	const getEventUrl = props.urls.urls.getEvent;
	const dispatch = props.dispatch;
	const token = props.token.token;

	const loadEvent = useCallback(async() => {
		if (eventId === undefined) {
			const myEvents = await axios.get(getEventUrl + params.id).catch((error) => {
				alert('An error has occurred while attempting to retrieve the event details');
			})
			const data = myEvents.data;
			if (data) { 
				await dispatch(setEvent(data)) 
				if (data.guestList && data.guestList.length > 0) { /*The event has guests - Should always have guests in theory */
					let currentGuest = null;
					if(token /* the user is logged in */) {
						currentGuest = data.guestList.find((guest) => guest.userId === userId);
					} else { /* the user is not logged in */
						const guestId = params.guestcode;
						currentGuest = data.guestList.find((guest) => {return parseInt(guest.inviteUrl) == guestId});
					}
					if (currentGuest) {
						setGuest(currentGuest);
						setVotes(currentGuest.vote);
					}
					//set as guest if the host Id is not the logged in user
					setIsGuest((data.hostId !== userId && currentGuest));

					console.log(isGuest + ", " + JSON.stringify(guest));
				}
			}
		}
	}, [eventId, getEventUrl, params.guestcode, params.id, dispatch, token, userId]);

	useEffect(() => {
		//const guestInfo = axios.get('some url to get');
		//setGuest(guestInfo);
		loadEvent();
		//setGuest({nickname: 'John', id: 1, inviteUrl: props.match.params.guestcode, vote: [], eventId: 1});
		//setVotes((props.event.guestList.length > 0 && props.event.guestList[0].votes) ? props.event.guestList[0].votes : []);
		console.log('useEffect');
        document.title = "Restaurant Tinder - Event"
	},[]);

	const updateThumbsUp = (vote) => {
		//figure out the index of the vote for this restaurant if it exists
		const index = votes.findIndex((oldvotes) => (vote.restaurantId === oldvotes.restaurantId));
		let newVotesList = [...votes];
		if (index < 0) { 
			newVotesList.push(vote);
		} else {
			//remove a vote at index and add the new vote at the index
			newVotesList.splice(index, 1, vote);
		}
		setVotes(newVotesList);
	}

	const thumbsUpHandler = (card) => {
		updateThumbsUp({
			restaurantId: card.id,
			upVote: true
		});
	}

	const thumbsDownHandler = (card) => {
		updateThumbsUp({
			restaurantId: card.id,
			upVote: false
		});
	}

	const getThumbImage = (card, thumbsup = true) => {
		const vote = votes.find((vote) => card.id === vote.restaurantId);
		if (vote && vote.upVote === true && thumbsup) {
			return tuGreen;
		} else if (vote && vote.upVote === false && !thumbsup) {
			return tdRed;
		} else {
			return (thumbsup) ? tuBlack : tdBlack;
		}
	}

	const voteSubmitHandler = async(event) => {
		//do vote submission here
		console.log("voted!");
		//as of right now will have to make an axios call for each restaurant
		//just try to update the first vote for now
		//TODO: UPDATE THIS URL WHEN THE URLSDTO GETS UPDATED
		votes.forEach((vote) => {
			axios.put(props.urls.urls.updateVote + guest.id, vote).catch((error) => {
				alert('Votes failed to update.');
			})
		})
		props.dispatch(setEventGuestVotes(guest, votes))
	}

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

    //Maps through restaurants to display on page
    const eventRestaurantCards = function() {
        return (
            props.event.eventRestaurants.map(card => (
                <div className="restaurantCard" key={card.id}>
                    <div className="titleSection">
                        <h5 className="card-name">{card.name}</h5>
                    </div>
                    <div className="thumbs">
						<img onClick={() => thumbsUpHandler(card)} src={getThumbImage(card, true)} alt="Thumbs Up"/>
						<img onClick={() => thumbsDownHandler(card)} src={getThumbImage(card, false)} alt="Thumbs Down"/>
                    </div>
                    <div className="imageSection">
                        <img className="card-img" src={card.image_url} alt="Restaurant" />
                    </div>
                    <div className="infoSection">
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
                </div> 
        )))
    }

    return (
        <div className="eventView">
			{/* {(!token && !guest) ? <Redirect to="/login" /> : <></>} */}
            <div>
                <img src={blob} className='eventBlob' alt='Yellow Blob'/>
            </div>
            <div className="eventCard">
                <div className="eventInfo">
                    {/* If a User is a guest*/}
					{isGuest && guest ? <h1>Welcome, {guest.nickname}!</h1>
					: <></>
					}
                    {/* */}
                    <h1>{props.event.eventTitle}</h1>
                    <h2>{new Date(props.event.eventDayTime).toLocaleDateString('en-US', dateOptions)} @ {new Date(props.event.eventDayTime).toLocaleTimeString('en-US', timeOptions)}</h2>
                    <h5>Voting Ends: {new Date(props.event.decisionDeadline).toLocaleDateString('en-US', dateOptions)} @ {new Date(props.event.decisionDeadline).toLocaleTimeString('en-US', timeOptions)}</h5>
                    <a>How do I start?</a>
                    {/* User is the Event Creator */}
					{/* {(!guest && props.token) ? 
						<button className="eventEdit">Edit Event</button>
						: <></>
					} */}
                    {/* */}
                    {new Date(props.event.decisionDeadline) >= new Date() ? <button className="eventSubmit" onClick={voteSubmitHandler}>Submit</button> : <></>}
                </div>
                <div className="eventRestaurants">
                    {eventRestaurantCards()}
                </div>
            </div>
			{/* {loaded && props.event.id === undefined ? <Redirect to='/home/' /> : <></>} */}
        </div>
    )
}

export default connect(mapStateToProps)(EventView);