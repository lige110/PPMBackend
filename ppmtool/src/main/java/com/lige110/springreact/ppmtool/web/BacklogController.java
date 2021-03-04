package com.lige110.springreact.ppmtool.web;


import com.lige110.springreact.ppmtool.domain.ProjectTask;
import com.lige110.springreact.ppmtool.services.MapValidationErrorService;
import com.lige110.springreact.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result, @PathVariable String backlog_id){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;


        ProjectTask projectTask1= projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id){


//        return projectTaskService.findAllProjectTasks();

        return projectTaskService.findBacklogById(backlog_id); // if the backlog not exist, will be handled later

    }

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<ProjectTask> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id){

        ProjectTask projectTask = projectTaskService.findProjectTaskByPTSequence(backlog_id,pt_id);
        return new ResponseEntity<>(projectTask,HttpStatus.OK);
    }

}
