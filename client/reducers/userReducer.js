import * as types from "../constants/actionTypes";

const initialState= {
    user: null,
    uri: null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LOG_IN:

        return {
            ...state,
            user: action.payload.user,
            uri: action.payload.uri
        }
        default:
            return state;
    }
};

export default userReducer;

