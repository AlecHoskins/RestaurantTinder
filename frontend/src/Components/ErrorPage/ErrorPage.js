import React from 'react';
import axios from 'axios';
import baseUrl from '../../Shared/baseUrl'
import {connect} from 'react-redux'
import { useEffect } from 'react';
import { setURLs } from '../../Redux/actionCreators'

const mapStateToProps = state => {
    return {
		urls: state.urls
    }
}

function ErrorPage(props) {

	useEffect(() => {
		if (!props.urls) {
			tryToGetUrls();
			console.log("attempting to connect to server...");

		}
	})

	const tryToGetUrls = () => {
		axios.get(baseUrl).then((response) => {
			setURLs(response.data);
		})
	}

	return (
		<div>
			<h1>Error!</h1>
			<p style={{"text-align": "center"}}>We're sorry but the website is currently down.  Please try again later.</p>
		</div>
	);
}

export default connect(mapStateToProps)(ErrorPage);