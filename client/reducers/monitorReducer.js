import * as types from '../constants/actionTypes';

const initialState = {
  activeMonitors: [],
  displayMonitors: []
};

const monitorReducer = (state = initialState, action) => {
  let updatedMonitors;
  let updatedDisplayMonitors;

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

  case types.UPDATE_MONITOR:

    updatedMonitors = state.activeMonitors.slice();
    updatedMonitors = updatedMonitors.map((monitor) => {
      if (monitor.monitor_id === action.payload.monitor_id) {
        return action.payload;
      }
      return monitor;
    });
      
    updatedDisplayMonitors = state.activeMonitors.slice();
    updatedDisplayMonitors = updatedDisplayMonitors.map((monitor) => {
      if (monitor.monitor_id === action.payload.monitor_id) {
        return action.payload;
      }
      return monitor;
    });
  
    return {
      ...state,
      activeMonitors: updatedMonitors,
      displayMonitors: updatedDisplayMonitors
    }


  default:
    return state;
  }
};

export default monitorReducer;