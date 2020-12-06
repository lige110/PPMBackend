import { AnyAction } from "redux";
import { DELETE_PROJECT, GET_ALLPROJECTS, GET_PROJECT } from "../actions/types";
import { Project } from "../model/Project";

interface ProjectState {
  projectList: Project[];
  project: Project | {};
}

const initialState: ProjectState = {
  projectList: [],
  project: {},
};

const projectReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_PROJECT:
      return { ...state, project: action.payload };
    case GET_ALLPROJECTS:
      //   console.log("Project reducer worked");
      return { ...state, projectList: action.payload };
    case DELETE_PROJECT:
      return {
        ...state,
        projectList: state.projectList.filter(
          (project) => project.projectIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default projectReducer;
