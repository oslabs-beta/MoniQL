import * as types from "../constants/actionTypes";

const initialState= {
    user: null,
    username: null,
    uri: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOG_IN:

        return {
            ...state,
            user: action.payload.user,
            username: action.payload.username,
            uri: action.payload.uri
        }
        default:
            return state;
    }
};

export default userReducer;

