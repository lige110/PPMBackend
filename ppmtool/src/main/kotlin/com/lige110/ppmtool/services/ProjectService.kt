package com.lige110.ppmtool.services

import com.lige110.ppmtool.domain.Backlog
import com.lige110.ppmtool.domain.Project
import com.lige110.ppmtool.exceptions.ProjectIdException
import com.lige110.ppmtool.repositories.BacklogRepository
import com.lige110.ppmtool.repositories.ProjectRepository
import com.lige110.ppmtool.web.NewProjectRequestDTO
import org.springframework.stereotype.Service
import java.util.Locale
import javax.transaction.Transactional

@Service
class ProjectService(
    private val projectRepository: ProjectRepository,
    private val backlogRepository: BacklogRepository
) {

    @Transactional
    fun saveProject(projectInput: NewProjectRequestDTO): Project {
        val identifier = projectInput.projectIdentifier.uppercase(Locale.getDefault())
        projectRepository.findByProjectIdentifier(projectInput.projectIdentifier)?.let {
            throw ProjectIdException("Project ID '" + projectInput.projectIdentifier.uppercase(Locale.getDefault()) + "' already exists")
        }

        val project = Project().apply {
            projectName = projectInput.projectName
            projectIdentifier = identifier
            description = projectInput.description
            start_date = projectInput.start_date
            end_date = projectInput.end_date
        }

        val backlog = Backlog()
        project.backlog = backlog
        backlog.project = project
        backlog.projectIdentifier = identifier

        return projectRepository.save(project)
    }

    @Transactional
    fun updateProject(project: Project): Project {
        return try {
            val identifier = project.projectIdentifier.uppercase(Locale.getDefault())
            project.projectIdentifier = identifier

            if (project.id == null) {
                val backlog = Backlog()
                project.backlog = backlog
                backlog.project = project
                backlog.projectIdentifier = identifier
            } else {
                project.backlog = backlogRepository.findByProjectIdentifier(identifier)
            }
            projectRepository.save(project)
        } catch (e: Exception) {
            throw ProjectIdException("Project ID '" + project.projectIdentifier.uppercase(Locale.getDefault()) + "' already exists")
        }
    }

    fun findProjectByProjectIdentifier(identifier: String): Project {
        return projectRepository.findByProjectIdentifier(identifier.uppercase(Locale.getDefault()))
            ?: throw ProjectIdException("Project $identifier does not exist!")
    }

    fun findAllProjects(): MutableIterable<Project> {
        return projectRepository.findAll()
    }

    fun deleteProjectByIdentifier(projectId: String) {
        val project = projectRepository.findByProjectIdentifier(projectId.uppercase(Locale.getDefault()))
            ?: throw ProjectIdException("Project to be deleted not exists")
        projectRepository.delete(project)
    }
}
