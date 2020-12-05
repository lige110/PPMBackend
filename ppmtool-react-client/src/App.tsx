import React, { Component } from "react";
import "./App.css";
import Dashborad from "./components/Dashborad";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";

class App extends Component {
  render() {
    // need to wrap the whole project up with <Router> tag
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashborad} />
          <Route exact path="/addProject" component={AddProject} />
        </div>
      </Router>
    );
  }
}

export default App;
