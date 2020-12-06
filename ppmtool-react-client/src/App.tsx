import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Dashborad from "./components/Dashborad";
import Header from "./components/Layout/Header";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";

class App extends Component {
  render() {
    // need to wrap the whole project up with <Router> tag
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashborad} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
