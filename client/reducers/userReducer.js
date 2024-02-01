import * as types from '../constants/actionTypes';

const initialState = {
  user: 1,
  username: null,
  uri: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case types.LOG_IN:

    return {
      ...state,
      user: action.payload.user,
      username: action.payload.username,
      uri: action.payload.uri,
      isLoggedIn: true,
            
    }
  default:
    return state;
  }
};

export default userReducer;
