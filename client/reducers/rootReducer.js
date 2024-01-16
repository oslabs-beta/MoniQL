import { combineReducers } from "redux";

//Here are the different slices of our state, each managed by a different reducer file.
//The way Redux works, when we fire off a dispatch, it will be sent through each reducer file.
import alertsReducer from "./alertsReducer";
import diagramReducer from "./diagramReducer";
import userReducer from "./usersReducer";

//combineReducers method combines our reducers so we can import them all as one to the store.js file!
//if we ended up with more reducer files, they would go here. 
//this helps keep things clean and scalable! ⋆｡°✩ヽ( ⌒o⌒)人(⌒-⌒ )ﾉ✩°｡⋆
const rootReducer = combineReducers({
  alerts: alertsReducer,
  diagram: diagramReducer,
  user: userReducer,
});

export default rootReducer;

