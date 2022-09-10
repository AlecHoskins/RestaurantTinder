import * as ActionTypes from "./actionTypes";

export const Event = (
  state = {
    date: undefined,
    deadlineDate: undefined,
    selectedRestaurants: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_EVENT_DATE:
      return { ...state, date: action.payload };
    case ActionTypes.SET_SELECTED_RESTAURANTS:
      return { ...state, selectedRestaurants: action.payload };
    case ActionTypes.SET_EVENT_DEADLINE_DATE:
      return { ...state, deadlineDate: action.payload };
    default:
      return state;
  }
};
