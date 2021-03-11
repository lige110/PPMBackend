import React from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";

class ProjectBoard extends React.Component<any, any> {
  render() {
    const { id } = this.props.match.params; // there are some problems here
    return (
      <div>
        <div className="container">
          <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
          <Backlog backlog_id={id} />
        </div>
      </div>
    );
  }
}

export default ProjectBoard;
