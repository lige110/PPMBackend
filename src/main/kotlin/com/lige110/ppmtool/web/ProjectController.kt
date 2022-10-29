package com.lige110.ppmtool.web

import com.lige110.ppmtool.domain.Project
import com.lige110.ppmtool.services.MapValidationErrorService
import com.lige110.ppmtool.services.ProjectService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Date
import javax.validation.Valid

@RestController
@RequestMapping("api/project")
@CrossOrigin
class ProjectController(
    private val projectService: ProjectService,
    private val mapValidationErrorService: MapValidationErrorService
) {
    @PostMapping("")
    fun createNewProject(@RequestBody projectInput: NewProjectRequestDTO, result: BindingResult): ProjectDTO {
        val project = projectService.saveProject(projectInput)
        return project.toDto()
    }

    @PostMapping("/{projectId}")
    fun updateProject(
        @RequestBody project: @Valid Project,
        @PathVariable projectId: String,
        result: BindingResult
    ): ResponseEntity<*> {
        val errorMap = mapValidationErrorService.mapValidationService(result)
        if (errorMap != null) return errorMap
        val project1 = projectService.updateProject(project)
        return ResponseEntity(project1, HttpStatus.CREATED)
    }

    @GetMapping("/{projectId}")
    fun getProjectById(@PathVariable projectId: String): ProjectDTO { // the variable name should be matched
        val project = projectService.findProjectByProjectIdentifier(projectId)
        return project.toDto()
    }

    @GetMapping("/all")
    fun finaAllProjects(): List<ProjectDTO> {
        return projectService.findAllProjects().map(Project::toDto)
    }

    @DeleteMapping("/{projectId}")
    fun deleteProject(@PathVariable projectId: String): ResponseEntity<*> {
        projectService.deleteProjectByIdentifier(projectId)
        return ResponseEntity("Project with ProjectId '$projectId' is deleted", HttpStatus.OK)
    }
}

data class NewProjectRequestDTO(
    val projectName: String,
    val projectIdentifier: String,
    val description: String,
    val start_date: Date?,
    val end_date: Date?
)

data class ProjectDTO(
    val id: Long?,
    val projectName: String,
    val projectIdentifier: String,
    val description: String,
    val start_date: Date?,
    val end_date: Date?,
    val created_At: Date?,
    val updated_At: Date?
)

fun Project.toDto() = ProjectDTO(
    id = id,
    projectName = projectName,
    projectIdentifier = projectIdentifier,
    description = description,
    start_date = start_date,
    end_date = end_date,
    created_At = created_At,
    updated_At = updated_At
)
