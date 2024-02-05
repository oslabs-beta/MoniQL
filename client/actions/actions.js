import * as types from '../constants/actionTypes';

export const addAlertsActionCreator = (alertsArray) => ({
  type: types.ADD_ALERTS,
  payload: alertsArray
})

export const deleteAlertActionCreator = (alert_id) => ({
  type: types.DELETE_ALERT,
  payload: alert_id
})

export const updateAlertActionCreator = (alertObj) => ({
  type: types.UPDATE_ALERT,
  payload: alertObj
})

export const logInActionCreator = (user_id, username, uri) => ({
  type: types.LOG_IN,
  payload: {user_id, username, uri}
})

export const saveDBActionCreator = (dbArray) => ({
  type: types.SAVE_DB,
  payload: dbArray
})

export const selectTableActionCreator = (tableName) => ({
  type: types.SELECT_TABLE,
  payload: tableName
})

export const selectDepthActionCreator = (depth) => ({
  type: types.SELECT_DEPTH,
  payload: depth
})  

export const selectPageActionCreator = (page) => ({
  type: types.SELECT_PAGE,
  payload: page
})

export const addMonitorsActionCreator = (monitorsArray) => ({
  type: types.ADD_MONITORS,
  payload: monitorsArray
})