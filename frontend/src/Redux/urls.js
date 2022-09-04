import * as ActionTypes from "./actionTypes";


export const URLs = (
  state = {
    urls: undefined,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_URLS:
      return { ...state, urls: action.payload };
    default:
      return state;
  }
};
