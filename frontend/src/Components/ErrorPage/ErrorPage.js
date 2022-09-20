import React from 'react';
import axios from 'axios';
import baseUrl from '../../Shared/baseUrl'
import { motion } from 'framer-motion';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import { setURLs } from '../../Redux/actionCreators'
import "./ErrorPage.css"

//Map State to Props
const mapStateToProps = state => {
    return {
		urls: state.urls
    }
}

function ErrorPage(props) {

	//Set constants
	const yellowBlob = '/yellowbloblogin.png';

	//useEffect to check API attempt to get URLs
	useEffect(() => {
		if (!props.urls) {
			tryToGetUrls();
			console.log("attempting to connect to server...");

		}
	})

	//API call to get URLs
	const tryToGetUrls = () => {
		axios.get(baseUrl).then((response) => {
			setURLs(response.data);
		})
	}

	return (
		<div>
			<motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
            >
                    <img src={yellowBlob} alt="Yellow Blob" id="erroredBlob" />
            </motion.div>
			<motion.div className='errorDiv'
                    initial={{ left: "3300px", opacity: 1, transition: { duration: .4 } }}
                    animate={{ left: "50%", transition: { duration: .2, type: 'spring', damping: 17, stiffness: 500 } }}
                    exit={{ left: "-1000px", opacity: 1, transition: { duration: .4 }}}
            >
				<h1>Error!</h1>
				<p style={{"text-align": "center"}}>We're sorry but the website is currently down.  Please try again later.</p>
			</motion.div>
		</div>
	);
}

export default connect(mapStateToProps)(ErrorPage);