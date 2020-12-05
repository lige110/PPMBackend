import { act } from "react-dom/test-utils";
import { GET_ERRORS } from "../actions/types";

const initialState = {};

const errorReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
