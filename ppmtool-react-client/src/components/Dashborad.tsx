import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { getProjects } from "../actions/projectActions";
import { connect } from "react-redux";

class Dashborad extends React.Component<any, any> {
  componentDidMount() {
    // console.log("Dashboard mounted!");
    this.props.getProjects(this.props.history);
  }

  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />

              <ProjectItem />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashborad);
