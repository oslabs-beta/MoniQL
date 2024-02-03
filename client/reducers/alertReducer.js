import * as types from '../constants/actionTypes';

const initialState = {
  alerts: []
};


const alertReducer = (state = initialState, action) => {
  let updatedAlerts; 

  switch(action.type) {
  case types.ADD_ALERTS:

    updatedAlerts = state.alerts.slice();
    updatedAlerts.push(...action.payload);
    updatedAlerts.sort((a, b) => b.anomalyTime - a.anomalyTime);

    return {
      ...state,
      alerts: updatedAlerts
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
    updatedAlerts = updatedAlerts.map((alert, i) => {
      if (alert.alert_id === action.payload.alert_id) {
        return action.payload;
      }
      return alert;
    });
    updatedAlerts.sort((a, b) => b.anomalyTime - a.anomalyTime);

    return {
      ...state,
      alerts: updatedAlerts
    }

  default:
    return state;
  }

};

export default alertReducer;
