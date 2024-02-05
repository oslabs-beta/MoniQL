import * as types from '../constants/actionTypes';

const initialState = {
  alerts: [],
  displayAlerts: [],
};


const alertReducer = (state = initialState, action) => {
  let updatedAlerts; 

  switch(action.type) {
  case types.ADD_ALERTS:

    updatedAlerts = state.alerts.slice();
    updatedAlerts.push(...action.payload);
    updatedAlerts = updatedAlerts.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));

    return {
      ...state,
      alerts: updatedAlerts,
      displayAlerts: updatedAlerts
    }

  case types.DELETE_ALERT:

    updatedAlerts = state.alerts.slice()
    updatedAlerts = updatedAlerts.filter(alert => alert.alert_id !== action.payload.alert_id);

    return {
      ...state,
      alerts: updatedAlerts
    }

  case types.UPDATE_ALERT:

    updatedAlerts = state.alerts.slice();
    updatedAlerts = updatedAlerts.map((alert) => {
      if (alert.alert_id === action.payload.alert_id) {
        return action.payload;
      }
      return alert;
    });
    updatedAlerts = updatedAlerts.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));

    return {
      ...state,
      alerts: updatedAlerts
    }

  case types.DISPLAY_ALERTS:
    updatedAlerts = action.payload.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
    
    return {
      ...state,
      displayAlerts: updatedAlerts
    }

  default:
    return state;
  }

};

export default alertReducer;
