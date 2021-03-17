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

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e: any) {
    this.props.deleteProjectTask(
      this.props.projectTask.projectIdentifier,
      this.props.projectTask.projectSequence
    );
  }

  render() {
    const { projectTask } = this.props;
    const backlog_id: string = this.props.projectTask.projectIdentifier;
    const PT_sequence: string | undefined = this.props.projectTask
      .projectSequence;

    let priorityString;
    let priorityClass;

    if (projectTask.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }
    if (projectTask.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }
    if (projectTask.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {projectTask.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title"> {projectTask.summary}</h5>
          <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${backlog_id}/${PT_sequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button className="btn btn-danger ml-4" onClick={this.onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteProjectTask })(ProjectTaskItem);
