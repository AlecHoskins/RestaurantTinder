import { connect, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Home(props) {
    
    let currUser = useSelector(state => state.user.username);
    
    return(
        <div>
            <h3>Welcome, {currUser}</h3>
			<button>My Events</button>
			<button>New Event</button>
        </div>
    )
}

export default Home;