import { AnyAction } from "redux";
import {
  GET_PROJECT_TASK,
  GET_BACKLOG,
  DELETE_PROJECT_TASK,
} from "../actions/types";
import ProjectTask from "../model/ProjectTask";

const initialState = {
  projectTasks: [],
  projectTask: {},
};

const backlogReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        projectTasks: action.payload,
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload,
      };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          (projectTask: ProjectTask) =>
            projectTask.projectSequence !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default backlogReducer;
