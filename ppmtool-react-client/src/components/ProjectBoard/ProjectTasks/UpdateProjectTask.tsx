import classNames from "classnames";
import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectTask from "../../../model/ProjectTask";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";

interface IMyComponentState extends ProjectTask {
  errors: any;
}

class UpdateProjectTask extends React.Component<any, IMyComponentState> {
  constructor(props: any) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      id: undefined,
      summary: "",
      status: "",
      acceptanceCriteria: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: "",
      projectSequence: "",
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ ...this.state, errors: nextProps.errors });
    }

    const {
      id,
      summary,
      status,
      acceptanceCriteria,
      priority,
      dueDate,
      projectIdentifier,
      projectSequence,
    } = nextProps.projectTask;

    this.setState({
      id,
      summary,
      status,
      acceptanceCriteria,
      priority,
      dueDate,
      projectIdentifier,
      projectSequence,
    });
  }

  componentDidMount() {
    const { backlog_id, PT_SQ } = this.props.match.params;
    this.props.getProjectTask(backlog_id, PT_SQ, this.props.history);
  }

  public onSubmit(e: FormEvent) {
    e.preventDefault();

    const updatedProjectTask: ProjectTask = {
      id: this.state.id,
      summary: this.state.summary,
      status: this.state.status,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      projectSequence: this.state.projectSequence,
    };

    console.log(updatedProjectTask);

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      updatedProjectTask,
      this.props.history
    );
  }

  public onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const key: string = e.target.name;
    const value: string = e.target.value;

    this.setState({ ...this.state, [key]: value }); // why [] is needed
  }

  render() {
    const { backlog_id } = this.props.match.params;
    const errors = this.state.errors;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">
                Project ID:{this.state.projectIdentifier} | ProjectTask ID:
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  projectTask: state.backlog.projectTask,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
