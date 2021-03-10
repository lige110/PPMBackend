import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectBoard extends React.Component<any, any> {
  render() {
    const { id } = this.props.match.params; // there are some problems here
    return (
      <div>
        {/* <!-- Project Board Starts Here MIND OTHER COMPONENTS WHEN COPY AND PASTING --> */}
        <div className="container">
          <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
          {/* <!-- Backlog STARTS HERE --> */}
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-secondary text-white">
                    <h3>TO DO</h3>
                  </div>
                </div>

                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
                <div className="card mb-1 bg-light">
                  <div className="card-header text-primary">
                    ID: projectSequence -- Priority: priorityString
                  </div>
                  <div className="card-body bg-light">
                    <h5 className="card-title">project_task.summary</h5>
                    <p className="card-text text-truncate ">
                      project_task.acceptanceCriteria
                    </p>
                    <Link
                      to={`/updateProjectTask/${id}`}
                      className="btn btn-primary"
                    >
                      View / Update
                    </Link>

                    <button className="btn btn-danger ml-4">Delete</button>
                  </div>
                </div>

                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
              </div>
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-primary text-white">
                    <h3>In Progress</h3>
                  </div>
                </div>
                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}

                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
              </div>
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-success text-white">
                    <h3>Done</h3>
                  </div>
                </div>
                {/* <!-- SAMPLE PROJECT TASK STARTS HERE -->

                    <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
              </div>
            </div>
          </div>

          {/* <!-- Backlog ENDS HERE --> */}
        </div>
      </div>
    );
  }
}

export default ProjectBoard;