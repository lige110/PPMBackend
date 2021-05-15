import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setToken from "./securityUtils/setToken";

import Dashborad from "./components/Dashborad";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import { SET_CURRENT_USER } from "./actions/types";

const JWT: string = localStorage.jwtToken;

if (JWT) {
  setToken(JWT);
  const decoded_Token: any = jwt_decode(JWT);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_Token,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_Token.exp < currentTime) {
    localStorage.removeItem("jwtToken");
    setToken(false);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: {},
    });
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    // need to wrap the whole project up with <Router> tag
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {
              // public routes
            }
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {
                // private routes
              }

              <Route exact path="/dashboard" component={Dashborad} />
              <Route exact path="/addProject" component={AddProject} />
              <Route
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <Route exact path="/projectBoard/:id" component={ProjectBoard} />
              <Route
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <Route
                exact
                path="/updateProjectTask/:backlog_id/:PT_SQ"
                component={UpdateProjectTask}
              />
              <Route component={Landing} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
