import * as types from '../constants/actionTypes';

export const changeTestActionCreator = (testName) => ({
  type: types.CHANGE_TEST,
  payload: testName
})

export const logInActionCreator = (user, username, uri) => ({
  type: types.LOG_IN,
  payload: {user, username, uri}
})

export const saveDBActionCreator = (dbArray) => ({
  type: types.SAVE_DB,
  payload: dbArray
})

