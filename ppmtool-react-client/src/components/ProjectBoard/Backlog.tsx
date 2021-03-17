import React from "react";
import ProjectTask from "../../model/ProjectTask";
import ProjectTaskItem from "./ProjectTasks/ProjectTaskItem";

// interface IMyComponentProps {
//   backlog_id: string;
//   getBacklog: any;
// }

class Backlog extends React.Component<any, any> {
  render() {
    const { projectTasks } = this.props;
    // console.log(projectTasks);

    const todoTasks = projectTasks.filter(
      (projectTask: ProjectTask) => projectTask.status === "TO_DO"
    );
    const inprogressTasks = projectTasks.filter(
      (projectTask: ProjectTask) => projectTask.status === "IN_PROGRESS"
    );
    const finishedTasks = projectTasks.filter(
      (projectTask: ProjectTask) => projectTask.status === "DONE"
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>

            {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
            {todoTasks.map((projectTask: ProjectTask) => (
              <ProjectTaskItem
                key={projectTask.projectSequence}
                projectTask={projectTask}
              />
            ))}
            {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>

            {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
            {inprogressTasks.map((projectTask: ProjectTask) => (
              <ProjectTaskItem
                key={projectTask.projectSequence}
                projectTask={projectTask}
              />
            ))}
            {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>

            {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
            {finishedTasks.map((projectTask: ProjectTask) => (
              <ProjectTaskItem
                key={projectTask.projectSequence}
                projectTask={projectTask}
              />
            ))}
            {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
