import { connect, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Home(props) {
    
    let currUser = useSelector(state => state.user.username);
    
    return(
        <div>
            Welcome, {currUser}
        </div>
    )
}

export default Home;