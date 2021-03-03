package com.lige110.springreact.ppmtool.services;


import com.lige110.springreact.ppmtool.domain.Backlog;
import com.lige110.springreact.ppmtool.domain.ProjectTask;
import com.lige110.springreact.ppmtool.repositories.BacklogRepository;
import com.lige110.springreact.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {


    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        // exceptions project not found

        // PTs to be added to a specific project project != null BL exists
        projectIdentifier = projectIdentifier.toUpperCase();
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        // set the BL to Pt
        projectTask.setBacklog(backlog);
        // the project sequence should be like this IDPRO-1, IDPRO-2
        Integer BacklogSequence = backlog.getPTSequence();
        // update the BL
        BacklogSequence ++;
        backlog.setPTSequence(BacklogSequence);
        // add the sequence to hte project task
        projectTask.setProjectSequence(projectIdentifier+"-"+ BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //Initial priority when priority null
        if(projectTask.getPriority() == null ){ // in the future we need ==0 to handle the form
            projectTask.setPriority(3);
        }
        // Initial status when status is null
        if(projectTask.getStatus() == null || projectTask.getStatus() == ""){
            projectTask.setStatus("TO_DO");
        }


        return projectTaskRepository.save(projectTask);
    }



}
