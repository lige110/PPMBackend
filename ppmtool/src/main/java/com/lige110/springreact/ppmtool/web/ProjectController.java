package com.lige110.springreact.ppmtool.web;


import com.lige110.springreact.ppmtool.domain.Project;
import com.lige110.springreact.ppmtool.services.MapValidationErrorService;
import com.lige110.springreact.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("api/project")
@CrossOrigin
public class ProjectController {

    private ProjectService projectService;
    private MapValidationErrorService mapValidationErrorService;

    public ProjectController(
            @Autowired ProjectService projectService,
            @Autowired MapValidationErrorService mapValidationErrorService) {
        this.projectService = projectService;
        this.mapValidationErrorService = mapValidationErrorService;
    }


    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project,principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal){  // the variable name should be matched

        Project project = projectService.findProjectByProjectIdentifier(projectId, principal.getName());

        return new ResponseEntity<Project>(project,HttpStatus.OK);
    }

    @GetMapping("/all/user")
    public Iterable<Project> finaAllProjects(Principal principal){
        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping("/all")
    public Collection<Project> fetchAllProjects(){
        return projectService.fetchAllProjects();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal){
        projectService.deleteProjectByIdentifier(projectId, principal.getName());

        return new ResponseEntity<>("Project with ProjectId '" + projectId + "' is deleted", HttpStatus.OK);
    }

}
