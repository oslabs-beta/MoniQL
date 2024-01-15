import * as types from '../constants/actionTypes';

const initialState ={
    alertsTest: 'hello, world'
}

const alertsReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.CHANGE_TEST:

    return {
      ...state,
      alertsTest: action.payload
    }
    default:
      return state;
  }
}

export default alertsReducer;