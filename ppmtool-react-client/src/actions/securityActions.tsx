import axios from "axios";
import jwt_decode from "jwt-decode";
import setToken from "../securityUtils/setToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const createNewUser =
  (newUser: any, history: string[]) => async (dispatch: any) => {
    try {
      await axios.post("/api/users/register", newUser);
      history.push("/login");
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const login = (LoginRequest: any) => async (dispatch: any) => {
  try {
    // post => login request
    const res: any = await axios.post("api/users/login", LoginRequest);
    // store token in localStorage
    const { token } = res.data;

    localStorage.setItem("jwtToken", token);
    // append the token into each request it sends
    setToken(token);
    // decode the token in React
    const decoded: object = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch: any) => {
  localStorage.removeItem("jwtToken");
  setToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
