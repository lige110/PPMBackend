import axios from "axios";
import {
  GET_ERRORS,
  GET_ALLPROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
} from "./types";
import { Project } from "../model/Project";
// import { AnyAction } from "redux";

export const createProject = (project: Project, history: string[]) => async (
  // what is the dispatch here is an function argument, like resolve
  dispatch: any
) => {
  try {
    console.log("create projects action dispatched!");
    const res = await axios.post("/api/project", project);

    history.push("/dashboard");
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

export const getProjects = (history: string[]) => async (dispatch: any) => {
  try {
    // console.log("get projects action dispatched!");
    const projects: any = await axios.get("/api/project/all");
    dispatch({
      type: GET_ALLPROJECTS,
      payload: projects.data,
    });
    history.push("/dashboard");
  } catch (err) {
    console.error(err);
  }
};

export const getProjectById = (id: string, history: string[]) => async (
  dispatch: any
) => {
  try {
    // console.log("get projects action dispatched!");
    const res: any = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteProject = (id: string) => async (dispatch: any) => {
  await axios.delete(`/api/project/${id}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: id,
  });
};
