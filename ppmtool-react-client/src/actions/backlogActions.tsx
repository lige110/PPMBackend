import axios from "axios";
import ProjectTask from "../model/ProjectTask";
import {
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_ERRORS,
  RESET_ERRORS,
} from "./types";

export const addProjectTask = (
  backlog_id: string,
  projectTask: ProjectTask,
  history: string[]
) => async (dispatch: any) => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, projectTask);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: RESET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getBacklog = (backlog_id: string, history: string[]) => async (
  dispatch: any
) => {
  try {
    const results: any = await axios.get(`/api/backlog/${backlog_id}`);

    dispatch({
      type: GET_BACKLOG,
      payload: results.data,
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
    // history.push("/dashboard");
  }
};

export const getProjectTask = (
  backlog_id: string,
  PT_SQ: string,
  history: string[]
) => async (dispatch: any) => {
  try {
    const result = await axios.get(`/api/backlog/${backlog_id}/${PT_SQ}`);

    dispatch({
      type: GET_PROJECT_TASK,
      payload: result.data,
    });
  } catch (error) {
    history.push(`/dashboard`);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const updateProjectTask = (
  backlog_id: string,
  PT_SQ: string,
  updatedProjectTask: ProjectTask,
  history: string[]
) => async (dispatch: any) => {
  try {
    await axios.patch(
      `/api/backlog/${backlog_id}/${PT_SQ}`,
      updatedProjectTask
    );
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: RESET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteProjectTask = (backlog_id: string, PT_SQ: string) => async (
  dispatch: any
) => {
  if (window.confirm(`You are deleting project task ${PT_SQ} ?`)) {
    await axios.delete(`/api/backlog/${backlog_id}/${PT_SQ}`);

    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: PT_SQ,
    });
  }
};
