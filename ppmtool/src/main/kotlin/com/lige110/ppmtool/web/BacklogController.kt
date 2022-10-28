package com.lige110.ppmtool.web

import com.lige110.ppmtool.domain.ProjectTask
import com.lige110.ppmtool.services.MapValidationErrorService
import com.lige110.ppmtool.services.ProjectTaskService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Locale
import javax.validation.Valid

@RestController
@RequestMapping("api/backlog")
@CrossOrigin
class BacklogController(
    private val projectTaskService: ProjectTaskService,
    private val mapValidationErrorService: MapValidationErrorService
) {
    @PostMapping("/{backlog_id}")
    fun addPTtoBacklog(
        @RequestBody projectTask: @Valid ProjectTask,
        @PathVariable backlog_id: String,
        result: BindingResult
    ): ResponseEntity<*> {
        val errorMap = mapValidationErrorService.mapValidationService(result)
        errorMap?.let { return errorMap }
        val projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask)
        return ResponseEntity(projectTask1, HttpStatus.CREATED)
    }

    @GetMapping("/{backlog_id}")
    fun getProjectBacklog(@PathVariable backlog_id: String): Iterable<ProjectTask> {
//        return projectTaskService.findAllProjectTasks();
        return projectTaskService.findBacklogById(backlog_id) // if the backlog not exist, will be handled later
    }

    @GetMapping("/{backlog_id}/{pt_id}")
    fun getProjectTask(@PathVariable backlog_id: String, @PathVariable pt_id: String): ResponseEntity<ProjectTask> {
        val projectTask = projectTaskService.findProjectTaskByPTSequence(backlog_id, pt_id)
        return ResponseEntity(projectTask, HttpStatus.OK)
    }

    @PatchMapping("/{backlog_id}/{pt_id}")
    fun updateProjectTask(
        @RequestBody projectTask: @Valid ProjectTask,
        result: BindingResult,
        @PathVariable backlog_id: String,
        @PathVariable pt_id: String
    ): ResponseEntity<*> {
        val errorMap = mapValidationErrorService.mapValidationService(result)
        if (errorMap != null) return errorMap
        projectTaskService.updateByProjectTaskSequence(projectTask, backlog_id, pt_id)
        return ResponseEntity(projectTask, HttpStatus.OK)
    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    fun deleteProjectTask(@PathVariable backlog_id: String, @PathVariable pt_id: String): ResponseEntity<*> {
        projectTaskService.deleteByProjectSequence(
            backlog_id.apply { uppercase(Locale.getDefault()) },
            pt_id.apply { uppercase(Locale.getDefault()) }
        )
        return ResponseEntity("Project Task in project '$backlog_id' with sequence '$pt_id' is deleted", HttpStatus.OK)
    }
}
