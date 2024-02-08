import * as types from '../constants/actionTypes';

// for dev mode:
const initialState = {
  user_id: null,
  username: '',
  uri: '',
  isLoggedIn: false,
};

// for prod mode:
// const initialState = {
//   user_id: null,
//   username: null,
//   uri: null,
//   isLoggedIn: false,
// };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.LOG_IN:
    return {
      ...state,
      user_id: action.payload.user_id,
      username: action.payload.username,
      uri: action.payload.uri,
      isLoggedIn: true,
    };
  case types.LOG_OUT:
    return {
      ...state,
      isLoggedIn: false,
    };
  default:
    return state;
  }
};

export default userReducer;
