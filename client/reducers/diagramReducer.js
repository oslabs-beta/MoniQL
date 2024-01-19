import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case types.SAVE_DB:

      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
};

export default diagramReducer;
