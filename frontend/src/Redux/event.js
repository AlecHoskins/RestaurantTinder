import * as ActionTypes from "./actionTypes";

export const Event = (
  state = {
	id: undefined,
	hostId: undefined,
	eventTitle: undefined,
    eventDayTime: undefined,
    decisionDeadline: undefined,
    eventRestaurants: [],
	guestList: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_EVENT_DATE:
      return { ...state, eventDayTime: action.payload };
    case ActionTypes.SET_SELECTED_RESTAURANTS:
      return { ...state, eventRestaurants: action.payload };
    case ActionTypes.SET_EVENT_DEADLINE_DATE:
      return { ...state, decisionDeadline: action.payload };
	case ActionTypes.DELETE_EVENT:
		return {...state, hostId: undefined, id: undefined, eventDayTime: undefined, decisionDeadline: undefined, eventTitle: undefined, eventRestaurants: [], guestList: []};
	case ActionTypes.SET_EVENT_TITLE: 
		return {...state, eventTitle: action.payload}
	case ActionTypes.SET_EVENT_GUESTS:
		return {...state, guestList: action.payload}
	case ActionTypes.SET_EVENT_GUEST_VOTES: 
		let updateGuest = state.guestList.find((guest) => guest.id === action.payload.guest.id);
		if (updateGuest) { updateGuest.votes = action.payload.guest.votes }
		return {...state}
	case ActionTypes.SET_EVENT:
		return {
			...state, 
			hostId: action.payload.hostId,
			id: action.payload.id,
			eventTitle: action.payload.eventTitle,
			eventDayTime: action.payload.eventDayTime,
			decisionDeadline: action.payload.decisionDeadline,
			eventRestaurants: (action.payload.eventRestaurants) ? action.payload.eventRestaurants : [],
			guestList: (action.payload.guestList) ? action.payload.guestList : []
		}
    default:
      return state;
  }
};
