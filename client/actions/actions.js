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

export const logOutActionCreator = () => ({
  type: types.LOG_OUT
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

export const updateMonitorActionCreator = (monitorObj) => ({
  type: types.UPDATE_MONITOR,
  payload: monitorObj
})

export const addTablesWeightsActionCreator = (tablesWeightsObj) => ({
  type: types.ADD_TABLES_WEIGHTS,
  payload: tablesWeightsObj
})

export const displayAlertsActionCreator = (alertsArray) => ({
  type: types.DISPLAY_ALERTS,
  payload: alertsArray
})

export const displayMonitorsActionCreator = (monitorsArray) => ({
  type: types.DISPLAY_MONITORS,
  payload: monitorsArray
})