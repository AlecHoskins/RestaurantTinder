import React from "react";
import './EventView.css';
import {connect} from 'react-redux'
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ViewGuestList from '../Modal/ViewGuestList'
import {setEventGuestVotes, setEvent, setURLs} from '../../Redux/actionCreators'
import {militaryTimeToStandardTime, numDayToString, deadlineHasPassed} from '../../Shared/timeFormatting'
import baseUrl from '../../Shared/baseUrl'

import { API } from '../../Shared/API'

//Map State to props
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

	//Set constants and states
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
	const [eventLoaded, setEventLoaded] = useState(false);
	const [guestLoaded, setGuestLoaded] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [isFinal, setIsFinal] = useState(false);
	const [finalVotes, setFinalVotes] = useState(null);
	const eventId = props.event.id;
	const userId = props.userId;
	const {id} = useParams();
	const {guestid} = useParams();
	const dispatch = props.dispatch;
	const token = props.token.token;
	const urlRoot = "http://localhost:3000";

	//Get Guest Info
	const loadGuest = async(urls) => {
		//if not a logged in user
		if (!props.userId) {
			const curGuest = await axios.get(urls.getGuest + guestid).catch((error) => {
				alert('An error has occurred while attempting to retreive the guest information');
				//this should then navigate
			})
			setGuest(curGuest.data);
			setVotes(curGuest.data.vote);
			setGuestLoaded(true);
		} 
	}

	//Load Users Events
	const loadEvent = async(urls) => {
		let url = (props.userId) ? urls.getEvent + id : urls.getGuestEvent + guestid;
		const myEvents = await axios.get(url, (props.token ? API.createAuthorizedHeaders(props.token) : {})).catch((error) => {
			alert('An error has occurred while attempting to retrieve the event details');
		})
		const data = myEvents.data;
		
		await dispatch(setEvent(data));
	
		let currentGuest = null;
		if(token /* the user is logged in */) {
			currentGuest = data.guestList.find((guest) => guest.userId === userId);
		} else { /* the user is not logged in */
			const guestId = guestid;
			currentGuest = data.guestList.find((guest) => {return guest.inviteUrl == guestId});
		}
		if (currentGuest) {
			setGuest(currentGuest);
			setVotes(currentGuest.vote);
		}
		//set as guest if the host Id is not the logged in user
		const isGuest = (data.hostId !== userId && guestid != null)
		const isFinal = deadlineHasPassed(data.decisionDeadline);
		setIsGuest(isGuest);
		setEventLoaded(true);
		setIsFinal(isFinal);
		setFinalVotes(data.votes);
	}

	//Load all events
	const loadAll = async(urls) => {
		await loadGuest(urls);
		await loadEvent(urls);
	}

	//useEffect to get urls, set document title, and set Modal state
	useEffect(() => {
		if (props.urls.urls) {
			loadAll(props.urls.urls);
		} else {
			axios.get(baseUrl).then((response) => {
				dispatch(setURLs(response.data))
				loadAll(response.data);
			})
		}
        document.title = "Restaurant Tinder - Event"
		setOpenModal(false);
	},[]);

	//Updating the state if user votes a thumbs up
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

	//Updates to show if there is already a thumbs up
	const thumbsUpHandler = (card) => {
		updateThumbsUp({
			restaurantId: card.id,
			upVote: true
		});
	}

	//Updates to show if there is already a thumbs down
	const thumbsDownHandler = (card) => {
		updateThumbsUp({
			restaurantId: card.id,
			upVote: false
		});
	}

	//Function to conditionally display thumbs images
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

	//Handles API call to submit votes
	const voteSubmitHandler = async(event) => {
		//do vote submission here
		if (!guest) { console.log('did not vote'); return; }
		let sendGuest = {...guest};
		sendGuest.vote = votes;
		await axios.put(props.urls.urls.updateVote, sendGuest).catch((error) => {
			alert('Votes failed to update.');
		})
		alert('votes submitted');
		props.dispatch(setEventGuestVotes(guest, votes))
	}

	//Maps hours to the restaraunt cards
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

	//Get total votes of restaurants
	const getRestaurantTotalVotes = (restaurantId) => {
		const voteFinalDTO = (finalVotes) ? finalVotes.find((v) => v.restaurantId === restaurantId) : null;
		return (voteFinalDTO ? voteFinalDTO.upVotes : null);
	}
	
    //Maps through restaurants to display on page
    const eventRestaurantCards = function() {
        return (
            props.event.eventRestaurants.map(card => (
                <div className="restaurantCard" key={card.id}>
                    <div className="titleSection">
                        <h5 className="card-name">{card.name}</h5>
                    </div>
					{!isFinal ?
                    <div className="thumbs">
						<img onClick={() => thumbsUpHandler(card)} src={getThumbImage(card, true)} alt="Thumbs Up"/>
						<img onClick={() => thumbsDownHandler(card)} src={getThumbImage(card, false)} alt="Thumbs Down"/>
					</div>
					: 
					<div className="thumbs">
						<img src={tuBlack} className="thumbsNoClick" alt="Thumbs Up" />
						<div>{getRestaurantTotalVotes(card.id)}</div>
					</div>
					}
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

	//Handles Opening and Closing of Modals
	const handleModalChange = () => {
		setOpenModal(true);
	}

    return (
        <div className="eventView">
			{(eventLoaded && !token && !guest && guestLoaded) ? <Navigate to="/login" /> : <></>}
			{(eventLoaded && isFinal && isGuest) ? <Navigate to="/home" /> : <></>}
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
					{!isFinal ? 
						<h5>Voting Ends: {new Date(props.event.decisionDeadline).toLocaleDateString('en-US', dateOptions)} @ {new Date(props.event.decisionDeadline).toLocaleTimeString('en-US', timeOptions)}</h5>
					: <h5>Voting has ended</h5>
					}
                    {/*<a>How do I start?</a>*/}
                    {/* User is the Event Creator */}
					{(eventLoaded && token && props.event.hostId === props.userId) ? 
						<button className="viewGLButton" onClick={handleModalChange}>View Guest List</button>
						:
						<></>
					}
                    {/* */}
                    {!isFinal ? <button className="eventSubmit" onClick={voteSubmitHandler}>Submit</button> : <></>}
                </div>
                <div className="eventRestaurants">
					{isGuest && guest && isFinal?
						<h3>The voting for this event has ended.</h3>
						:
						eventRestaurantCards()
					}
                </div>
            </div>
			<ViewGuestList open={openModal} thisGuestList={props.event.guestList} hostId={props.event.hostId} thisEventId={eventId} onClose={() => setOpenModal(false)} />
			{/* {loaded && props.event.id === undefined ? <Redirect to='/home/' /> : <></>} */}
        </div>
    )
}

export default connect(mapStateToProps)(EventView);