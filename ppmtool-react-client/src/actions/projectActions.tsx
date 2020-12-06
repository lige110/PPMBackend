import axios from "axios";
import { GET_ERRORS, GET_ALLPROJECTS } from "./types";
import { Project } from "../model/Project";
// import { AnyAction } from "redux";

export const createProject = (project: Project, history: string[]) => async (
  // what is the dispatch here is an function argument, like resolve
  dispatch: any
) => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = (history: string[]) => async (dispatch: any) => {
  try {
    // console.log("get projects action dispatched!");
    const projects: any = await axios.get(
      "http://localhost:8080/api/project/all"
    );
    dispatch({
      type: GET_ALLPROJECTS,
      payload: projects.data,
    });
    history.push("/dashboard");
  } catch (err) {
    console.error(err);
  }
};
