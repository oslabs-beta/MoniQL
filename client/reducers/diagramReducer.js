import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
  focusTable: null,
  depth: 6,
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case types.SAVE_DB:
      return {
        ...state,
        data: action.payload,
      }

    case types.SELECT_TABLE:
      return{
        ...state,
        focusTable: action.payload,
      }  

      case types.SELECT_DEPTH:
        return{
          ...state,
          depth: action.payload,
        }
    default:
      return state;
  }
};

export default diagramReducer;
