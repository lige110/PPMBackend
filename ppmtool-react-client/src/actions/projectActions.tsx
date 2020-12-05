import axios from "axios";
import { GET_ERRORS } from "./types";
import { Project } from "../model/Project";
import { AnyAction } from "redux";

export const createProject = (project: Project, history: string[]) => async (
  // what is the dispatch here????
  dispatch: any
) => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);

    history.push("/dashboard"); // seems to jump to dashboard page
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
