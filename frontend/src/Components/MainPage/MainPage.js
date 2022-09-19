import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './MainPage.css';

function MainPage() {
    
    //Constants Declaration
    const foodPlate = "/foodplate.png";
    const blob = "/yellowblob.png";

    //Use Effect to set document title
    useEffect(() => {
        document.title = "Restaurant Tinder"
      }, [])

    return(
        <div className="mainPage">
            <motion.div 
                className="mainPage-content"
                initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                animate={{ left: "15%", opacity: 1, transition: { duration: .4, delay: .4, type: 'spring', damping: 18 } }}
                exit={{ left: "-1000px", opacity: 0, transition: { duration: .4 }}}
            >
                <h1>Take the stress out of planning with <span id="name">Restaurant Tinder</span></h1>
                <p>Restaurant Tinder was designed with <span id="you">YOU</span> in mind. With Restaurant Tinder you can simply create an event and invite your many friends to join in and rank your favorite restaurants that you pick. When your event comes close only the top restaurant will remain as your friend upvote and downvote the restaurants.</p>
                <Link to='/login'><button id="get-started">Get Started {">"}</button></Link>
            </motion.div>
            <motion.div className="mainPage-imgs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <img id="imageBlob" alt="Rotating Plate of Food" src={blob}/>
                <img id="plate" alt="Yellow Blob" src={foodPlate}/>
                <div id="img-bg"></div>
            </motion.div>
        </div>
    )
}

export default MainPage;