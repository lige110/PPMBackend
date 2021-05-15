import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  projects: projectReducer,
  backlog: backlogReducer,
  security: securityReducer,
});
