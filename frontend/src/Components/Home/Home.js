import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import './Home.css'

function Home(props) {
    
    let currUser = useSelector(state => state.user.username);

    const userBlob = './yellowblobuser.png'
    
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
                    <div className='upcomingCard'>
                        <button>Event Details {'>'}</button>
                        <h5>Emilia's 15th Birthday Party</h5>
                        <div>Saturday, September 17th, 2022 6:00PM</div>
                        <div>Current winning restaraunt: Papa Mario's Pizza</div>
                    </div>
                    <div className='upcomingCard'>
                        <button>Event Details {'>'}</button>
                        <h5>Work Lunch Meeting</h5>
                        <div>Thursday, September 22nd, 2022 6:00PM</div>
                        <div>Current winning restaraunt: Texas Roadhouse</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;