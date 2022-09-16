import React from "react";
import { useParams } from "react-router";
import './EventView.css';
import {connect} from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import {setEventGuestVotes, setEvent} from '../../Redux/actionCreators'

const mapStateToProps = state => {
    return {
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

	const [guest, setGuest] = useState();
	const [votes, setVotes] = useState([]);

	const loadEvent = async() => {
		if (props.event.id === undefined) {
			const myEvents = await axios.get(props.urls.urls.getEvent + props.match.params.id).catch((error) => {
				alert('An error has occurred while attempting to retrieve the event details');
			})
			if (myEvents) { 
				props.dispatch(setEvent(myEvents.data)) 
			}
		}
	}

	useEffect(() => {
		//const guestInfo = axios.get('some url to get');
		//setGuest(guestInfo);
		loadEvent();
		setGuest({nickname: 'John', id: 1, inviteUrl: props.match.params.guestcode, vote: [], eventId: 1});
		setVotes((props.event.guestList.length > 0 && props.event.guestList[0].votes) ? props.event.guestList[0].votes : []);
        document.title = "Restaurant Tinder - Event"
	}, []);

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
		if (vote && vote.upVote && thumbsup) {
			return tuGreen;
		} else if (vote && !vote.upVote && !thumbsup) {
			return tdRed;
		} else {
			return (thumbsup) ? tuBlack : tdBlack;
		}
	}

	const voteSubmitHandler = async(event) => {
		//do vote submission here - no URL for this yet
		console.log("voted!");
		props.dispatch(setEventGuestVotes(guest, votes))
	}

	//pull name as well in the link?

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
                    </div>
                </div> 
        )))
    }

    return (
        <div className="eventView">
            <div>
                <img src={blob} className='eventBlob' alt='Yellow Blob'/>
            </div>
            <div className="eventCard">
                <div className="eventInfo">
                    {/* If a User is a guest*/}
					{(guest) ? <h1>Welcome, {guest.nickname}!</h1>
					: <></>
					}
                    {/* */}
                    <h1>{props.event.eventTitle}</h1>
                    <h2>Event Date and Time: {new Date(props.event.eventDayTime).toLocaleDateString('en-US')}</h2>
                    <h2>Event Due Date: {new Date(props.event.decisionDeadline).toLocaleDateString('en-US')}</h2>
                    <a>How do I start?</a>
                    {/* User is the Event Creator */}
					{(!guest && props.token) ? 
						<button className="eventEdit">Edit Event</button>
						: <></>
					}
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

export default withRouter(connect(mapStateToProps)(EventView));