import * as types from '../constants/actionTypes';

// for dev mode:
// const initialState = {
//   user_id: 21,
//   username: 'Ebo',
//   uri: 'postgres://brcinqqs:vVcwddQCC_ebHwGbKefRAacN2dIFO0XO@bubble.db.elephantsql.com/brcinqqs',
//   isLoggedIn: true,
// };

// for prod mode:
const initialState = {
  user_id: null,
  username: null,
  uri: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case types.LOG_IN:

    return {
      ...state,
      user_id: action.payload.user_id,
      username: action.payload.username,
      uri: action.payload.uri,
      isLoggedIn: true,
    }

  default:
    return state;
  }
};

export default userReducer;
