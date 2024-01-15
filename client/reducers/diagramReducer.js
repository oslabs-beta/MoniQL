import * as types from '../constants/actionTypes';

const initialState = {
  data: 'diagram',
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POPULATE_TABLES:
      // functionality what to do to data

      return {
        ...state,
        data: action.payload,
      }
    default:
      return state;
  }
};

export default diagramReducer;
