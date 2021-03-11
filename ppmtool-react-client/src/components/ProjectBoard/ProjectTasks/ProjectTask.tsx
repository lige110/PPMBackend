import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectTask from "../../../model/ProjectTask";
import { deleteProjectTask } from "../../../actions/backlogActions";

interface IMyComponentProps {
  projectTask: ProjectTask;
  deleteProjectTask: any;
}

class ProjectTaskItem extends React.Component<IMyComponentProps, any> {
  constructor(props: IMyComponentProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e: any) {
    this.props.deleteProjectTask();
  }

  render() {
    const { projectTask } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          {projectTask.projectSequence} -- {projectTask.priority}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title"> {projectTask.summary}</h5>
          <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${this.props.projectTask.projectIdentifier}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.props.deleteProjectTask}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteProjectTask })(ProjectTaskItem);
