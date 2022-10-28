package com.lige110.ppmtool.services

import com.lige110.ppmtool.domain.ProjectTask
import com.lige110.ppmtool.exceptions.ProjectNotFoundException
import com.lige110.ppmtool.repositories.BacklogRepository
import com.lige110.ppmtool.repositories.ProjectTaskRepository
import org.springframework.stereotype.Service
import java.util.Locale

@Service
class ProjectTaskService(
    private val backlogRepository: BacklogRepository,
    private val projectTaskRepository: ProjectTaskRepository
) {

    fun addProjectTask(projectIdentifier: String, projectTask: ProjectTask): ProjectTask {
        var projectIdentifier = projectIdentifier
        projectIdentifier = projectIdentifier.uppercase(Locale.getDefault())

        // exceptions project not found
        // PTs to be added to a specific project, project != null BL exists
        val backlog = backlogRepository.findByProjectIdentifier(projectIdentifier)
            ?: throw ProjectNotFoundException("Project with Identifier '$projectIdentifier' does not exits")
        // set the BL to Pt
        projectTask.backlog = backlog
        // the project sequence should be like this IDPRO-1, IDPRO-2
        var BacklogSequence = backlog.pTSequence
        // update the BL
        BacklogSequence++
        backlog.pTSequence = BacklogSequence
        // add the sequence to hte project task
        projectTask.projectSequence = "$projectIdentifier-$BacklogSequence"
        projectTask.projectIdentifier = projectIdentifier

        // Initial priority when priority null
        if (projectTask.priority == null) { // in the future we need ==0 to handle the form
            projectTask.priority = 3
        }
        // Initial status when status is null
        if (projectTask.status === "") {
            projectTask.status = "TO_DO"
        }
        return projectTaskRepository.save(projectTask)
    }

    fun findBacklogById(id: String): Iterable<ProjectTask> {
        val backlog = backlogRepository.findByProjectIdentifier(id)
            ?: throw ProjectNotFoundException("Project with ID: '" + id.uppercase(Locale.getDefault()) + "' does not exist.")
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id)
    }

    fun findProjectTaskByPTSequence(backlog_id: String, pt_id: String): ProjectTask {
        val backlog = backlogRepository.findByProjectIdentifier(backlog_id)
            ?: throw ProjectNotFoundException("Project with ID: '" + backlog_id.uppercase(Locale.getDefault()) + "' is not found")
        val projectTask = projectTaskRepository.findByProjectSequence(pt_id)
            ?: throw ProjectNotFoundException("Project Task not found")
        if (projectTask.projectIdentifier != backlog_id.uppercase(Locale.getDefault())) {
            throw ProjectNotFoundException(
                "Project Task with sequence: '" + pt_id.uppercase(Locale.getDefault()) + "' does not exist in Project '" + backlog_id.uppercase(
                    Locale.getDefault()
                ) + "'"
            )
        }
        return projectTask
    }

    fun updateByProjectTaskSequence(updatedTask: ProjectTask, backlog_id: String, pt_id: String): ProjectTask {
        // pt_id can be invalid

        // backlog_id can be invalid

        // backlog_id and pt_id should be corresponding to each other
        var projectTask = findProjectTaskByPTSequence(backlog_id, pt_id)
        projectTask = updatedTask
        return projectTaskRepository.save(projectTask)
    }

    fun findAllProjectTasks(): Iterable<ProjectTask?> {
        return projectTaskRepository.findAll()
    }

    fun deleteByProjectSequence(backlog_id: String, pt_id: String) {
        val projectTask = findProjectTaskByPTSequence(backlog_id, pt_id)
        projectTaskRepository.delete(projectTask)
    }
}
