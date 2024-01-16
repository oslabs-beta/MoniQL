import * as types from '../constants/actionTypes';

export const changeTestActionCreator = (testName) => ({
  type: types.CHANGE_TEST,
  payload: testName
})

export const populateTablesActionCreator = (changeData) => ({
    type: types.POPULATE_TABLES,
    payload: changeData
})

export const logInActionCreator = (user, uri) => ({
  type: types.LOG_IN,
  payload: {user, uri}
})


