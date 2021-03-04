package com.lige110.springreact.ppmtool.services;


import com.lige110.springreact.ppmtool.domain.Backlog;
import com.lige110.springreact.ppmtool.domain.ProjectTask;
import com.lige110.springreact.ppmtool.exceptions.ProjectNotFoundException;
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
        projectIdentifier = projectIdentifier.toUpperCase();

        // exceptions project not found
        // PTs to be added to a specific project project != null BL exists

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with Identifier '"+ projectIdentifier +"' does not exits");
        }
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

    public Iterable<ProjectTask> findBacklogById(String id){

        Backlog backlog = backlogRepository.findByProjectIdentifier(id);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with ID: '"+id.toUpperCase()+"' does not exist.");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findProjectTaskByPTSequence(String backlog_id, String pt_id){
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with ID: '" + backlog_id.toUpperCase()+"' is not found");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask == null) throw new ProjectNotFoundException("Project Task not found");

        if(!projectTask.getProjectIdentifier().equals(backlog_id.toUpperCase())){
            throw new ProjectNotFoundException("Project Task with sequence: '"+pt_id.toUpperCase()+"' does not exist in Project '"+backlog_id.toUpperCase()+"'");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectTaskSequence(ProjectTask updatedTask, String backlog_id, String pt_id){

        // pt_id can be invalid

        // backlog_id can be invalid

        // backlog_id and pt_id should be corresponding to each other



        ProjectTask projectTask = this.findProjectTaskByPTSequence(backlog_id, pt_id);

        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public  Iterable<ProjectTask> findAllProjectTasks(){
        return projectTaskRepository.findAll();
    }

    public void deleteByProjectSequence(String backlog_id, String pt_id){

        ProjectTask projectTask = findProjectTaskByPTSequence(backlog_id,pt_id);

        projectTaskRepository.delete(projectTask);
    }



}
