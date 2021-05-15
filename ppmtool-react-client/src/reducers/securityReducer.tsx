import { AnyAction } from "redux";
import { SET_CURRENT_USER } from "../actions/types";

interface SecurityState {
  user: {};
  validToken: boolean;
}

const initialState: SecurityState = {
  user: {},
  validToken: false,
};

const securityReducer = (
  state: SecurityState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default securityReducer;
