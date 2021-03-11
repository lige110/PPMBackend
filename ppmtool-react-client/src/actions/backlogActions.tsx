import axios from "axios";
import ProjectTask from "../model/ProjectTask";
import {
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_ERRORS,
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

export const getBacklog = (backlog_id: string, history: []) => async (
  dispatch: any
) => {
  const results: any = await axios.get(`/api/backlog/${backlog_id}`);

  dispatch({
    type: GET_BACKLOG,
    payload: results.data,
  });
};

export const getProjectTask = (backlog_id: string, history: []) => async (
  dispatch: any
) => {};

export const deleteProjectTask = (backlog_id: string, history: []) => async (
  dispatch: any
) => {};
