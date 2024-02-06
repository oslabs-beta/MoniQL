import * as types from '../constants/actionTypes';

const initialState = {
  activeMonitors: [],
  displayMonitors: []
};

const monitorReducer = (state = initialState, action) => {
  switch(action.type) {
  case types.ADD_MONITORS:
    console.log('payload in monitorReducer: ', action.payload)

    return {
      ...state,
      activeMonitors: action.payload,
      displayMonitors: action.payload
    }

  case types.DISPLAY_MONITORS:

    return {
      ...state,
      displayMonitors: action.payload
    }

  default:
    return state;
  }
};

export default monitorReducer;