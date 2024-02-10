import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
  focusTable: null,
  depth: 6,
  tablesWeightsObj: {},
  dashDisplayAlertsTimeRange: [new Date() - 1000 * 60 * 60 * 24 * 7, new Date(Date.now() + 2 * 60 * 60 * 1000)],
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

  case types.ADD_TABLES_WEIGHTS:
    return{
      ...state,
      tablesWeightsObj: action.payload,
    }

  case types.UPDATE_DASH_DISPLAY_TIME_RANGE:
    return {
      ...state,
      dashDisplayAlertsTimeRange: action.payload,
    }

  default:
    return state;
  }
};

export default diagramReducer;
