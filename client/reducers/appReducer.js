import * as types from '../constants/actionTypes';

const initialState = {
  // page: 'Dashboard'
  page: 'Alerts'
};

const appReducer = (state = initialState, action)  => {
  switch (action.type) {
  case types.SELECT_PAGE:
    return {
      ...state,
      page: action.payload
    } 

  default: 
    return state;
  }
}

export default appReducer;