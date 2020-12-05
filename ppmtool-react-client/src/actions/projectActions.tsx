import axios from "axios";
import { GET_ERRORS } from "./types";
import { Project } from "../model/Project";

export const createProject = (project: Project, history: string[]) => async (
  dispatch: (arg0: { type: string; payload: any }) => void
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
