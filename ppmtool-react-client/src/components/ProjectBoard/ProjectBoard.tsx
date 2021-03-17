import React from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { getBacklog } from "../../actions/backlogActions";
import { connect } from "react-redux";
import ProjectTask from "../../model/ProjectTask";

class ProjectBoard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errors: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params; // there are some problems here
    this.props.getBacklog(id, this.props.history);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const projectTasks = this.props.backlog.projectTasks;
    const { errors } = this.state;

    let BoardContent: any;

    const boardAlgorithm = (errors: any, project_tasks: ProjectTask[]) => {
      if (project_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog projectTasks={projectTasks} />;
      }
    };

    BoardContent = boardAlgorithm(errors, projectTasks);
    return (
      <div>
        <div className="container">
          <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
          {BoardContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
