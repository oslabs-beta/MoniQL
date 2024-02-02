import * as types from '../constants/actionTypes';

const initialState = {
  activeMonitors: []
};

const monitorReducer = (state = initialState, action) => {
  switch(action.type) {
  case types.ADD_MONITOR:
    console.log('payload in monitorReducer: ', action.payload)
    return {
      ...state,
      activeMonitors: action.payload
    }
  default:
    return state;
  }
};

export default monitorReducer;