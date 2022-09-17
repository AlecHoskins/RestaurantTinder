import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
import './Home.css'

const mapStateToProps = state => {
	return {
		userId: state.user.id,
		urls: state.urls.urls,
		dispatch: state.dispatch,
		eventDate: state.event.date
	}
}

function Home(props) {
    
    let currUser = useSelector(state => state.user.username);

    const [events, setEvents] = useState([]);
    const userBlob = './yellowblobuser.png'

    useEffect(() => {
        document.title = "Restaurant Tinder - Home"
		console.log(props);
        loadEvents();
      }, [])

    const loadEvents = async() => {
        if (props.userId === null) { return; }
	    const myEvents = await axios.get(props.urls.getHostEvents + props.userId).catch((error) => {
			alert('There was an error while retrieving the events');
		});
		if (myEvents) { setEvents(myEvents.data); }
	}


    const getMapOfUpcomingEvents = (eventCards) => {
        const numWeeks = 2;
        const now = new Date();
        now.setDate(now.getDate() + numWeeks * 7);
        console.log(now);
        console.log(eventCards);
        return (
            eventCards.map((e) => {
                const newDate = new Date(e.eventDayTime)
                console.log('HEREEEEE');
                if(newDate <= now) {
                    return (
                        <div key={e.id} className='upcomingCard'>
                            <Link to={`/eventview/${e.id}`}><button>Event Details {'>'}</button></Link>
                            <h5>{e.eventTitle}</h5>
                            <div>{newDate.toLocaleDateString('en-US')}</div>
                        </div>
                    ) 
                }
            })
        )
    }  

    
    return(
        <div>
            <div>
                <img src={userBlob} alt="Yellow Blob" id='homeBlob' />
            </div>
            <div className='userInfo'>
                <div className='welcomeCard'>
                    <h3>Welcome, {currUser}</h3>
                    <h5>You have <span id="yellow">2</span> upcoming events {'>'}</h5>
                    <Link to='/myevents'><button>My Events</button></Link>
                    <Link to='/nearme'><button>New Event</button></Link>
                </div>
                <div className='upcomingEvents'>
                    {getMapOfUpcomingEvents(events)}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Home);