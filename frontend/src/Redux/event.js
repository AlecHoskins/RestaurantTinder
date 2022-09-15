import * as ActionTypes from "./actionTypes";

export const Event = (
  state = {
	eventTitle: undefined,
    eventDayTime: undefined,
    decisionDeadline: undefined,
    selectedRestaurants: [],
	guestList: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_EVENT_DATE:
      return { ...state, eventDayTime: action.payload };
    case ActionTypes.SET_SELECTED_RESTAURANTS:
      return { ...state, selectedRestaurants: action.payload };
    case ActionTypes.SET_EVENT_DEADLINE_DATE:
      return { ...state, decisionDeadline: action.payload };
	case ActionTypes.DELETE_EVENT:
		return {...state, eventDayTime: undefined, decisionDeadline: undefined, eventTitle: undefined, selectedRestaurants: [], guestList: []};
	case ActionTypes.SET_EVENT_TITLE: 
		return {...state, eventTitle: action.payload}
	case ActionTypes.SET_EVENT_GUESTS:
		return {...state, guestList: action.payload}
	case ActionTypes.SET_EVENT_GUEST_VOTES: 
		let updateGuest = state.guestList.find((guest) => guest.id === action.payload.guest.id);
		if (updateGuest) { updateGuest.votes = action.payload.guest.votes }
		return {...state}
    default:
      return state;
  }
};
