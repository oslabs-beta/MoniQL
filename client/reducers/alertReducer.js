import * as types from '../constants/actionTypes';

const initialState = {
  alerts: [
    {
      "alert_id": "f61707a2-c52a-41db-98d0-e7006c250f02",
      "table": "weather_data",
      "monitorType": "custom range",
      "anomalyType": "out of range",
      "severity": "error",
      "column": "Temperature (C)",
      "anomalyValue": "39.58888888888889",
      "anomalyTime": "Sat 07-21-2007 08:00:00 am",
      "notes": [],
      "resolved_at": null,
      "resolved": false,
      "resolved_by": null,
      "display": true,
      "detected_at": "Tue 01-23-2024 08:13:17 pm"
    },
    {
      "alert_id": "7b8567d0-5c46-49ba-aed0-9423f8b2ab77",
      "table": "weather_data",
      "monitorType": "custom range",
      "anomalyType": "out of range",
      "severity": "error",
      "column": "Temperature (C)",
      "anomalyValue": "39.90555555555555",
      "anomalyTime": "Sun 07-22-2007 06:00:00 am",
      "notes": [],
      "resolved_at": null,
      "resolved": false,
      "resolved_by": null,
      "display": true,
      "detected_at": "Tue 01-23-2024 08:13:17 pm"
    }
  ]
};


const alertReducer = (state = initialState, action) => {
  let updatedAlerts; 

  switch(action.type) {
  case types.ADD_ALERT:

    updatedAlerts = state.alerts.slice();
    updatedAlerts.push(action.payload);
    updatedAlerts.sort((a, b) => b.detected_at - a.detected_at);

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
    updatedAlerts = updatedAlerts.filter(alert => alert.alert_id !== action.payload.alert_id);
    updatedAlerts.push(action.payload);
    updatedAlerts.sort((a, b) => b.detected_at - a.detected_at);

    return {
      ...state,
      alerts: updatedAlerts
    }

  default:
    return state;
  }

};

export default alertReducer;
