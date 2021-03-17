import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProjectTask } from "../../../actions/backlogActions";
import ProjectTask from "../../../model/ProjectTask";
import classNames from "classnames";

interface IMyState extends ProjectTask {
  errors: any;
}

class AddProjectTask extends React.Component<any, IMyState> {
  constructor(props: any) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      summary: "",
      status: "",
      acceptanceCriteria: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: id,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // on change
  onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const key: string = e.target.name;
    const value: string = e.target.value;

    this.setState({ ...this.state, [key]: value }); // why [] is needed
  }

  // on submit
  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("onsubmit fired");

    const newProjectTask: ProjectTask = {
      summary: this.state.summary,
      status: this.state.status,
      acceptanceCriteria: this.state.acceptanceCriteria,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
    };

    console.log(newProjectTask);

    this.props.addProjectTask(
      this.state.projectIdentifier,
      newProjectTask,
      this.props.history
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${id}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
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
  errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
