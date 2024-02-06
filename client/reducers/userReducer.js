import * as types from '../constants/actionTypes';

// for dev mode:
// const initialState = {
//   user_id: 36,
//   username: 'x',
//   uri: 'postgres://shmginsf:X_0THV9c5J3K3CGt0JnlvJGvwwCorHHy@bubble.db.elephantsql.com/shmginsf',
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
