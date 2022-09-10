import * as ActionTypes from './actionTypes'

export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})

export const setURLs = (urls) => ({
	type: ActionTypes.SET_URLS,
	payload: urls
})

export const setSelectedRestaurants = (selectedRestaurants) => ({
	type: ActionTypes.SET_SELECTED_RESTAURANTS,
	payload: selectedRestaurants
})

export const setEventDate = (date) => ({
	type: ActionTypes.SET_EVENT_DATE,
	payload: date
})

export const setEventDeadlineDate = (date) => ({
	type: ActionTypes.SET_EVENT_DEADLINE_DATE,
	payload: date
})