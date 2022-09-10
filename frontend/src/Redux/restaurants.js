import * as ActionTypes from './actionTypes'

export const RestaurantReducer = (state = {selectedRestaurants: []}, action) => {
	switch(action.type) {
		case ActionTypes.SET_SELECTED_RESTAURANTS:
			return {...state, selectedRestaurants: action.payload}
		default:
			return {...state}
	}
}