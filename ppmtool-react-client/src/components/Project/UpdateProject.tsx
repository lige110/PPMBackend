import React, { ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { getProjectById, createProject } from "../../actions/projectActions";
import { Project } from "../../model/Project";
import classnames from "classnames";

interface State extends Project {
  errors: Error;
}

interface Error {
  projectName?: string;
  projectIdentifier?: string;
  description?: string;
}

class UpdateProject extends React.Component<any, State> {
  //set state
  constructor(props: any) {
    super(props);

    this.state = {
      id: undefined,
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ ...this.state, errors: nextProps.errors });
    }

    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProjectById(id, this.props.history);
    //   .then(() => this.setState(this.props.project));
  }

  onChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ ...this.state, [key]: value });
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    // console.log(updateProject);
    this.props.createProject(updateProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    value={this.state.projectIdentifier}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
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
  // state here is the redux state!
  project: state.projects.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectById, createProject })(
  UpdateProject
);
