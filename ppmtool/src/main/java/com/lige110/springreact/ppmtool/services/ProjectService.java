package com.lige110.springreact.ppmtool.services;

import com.lige110.springreact.ppmtool.domain.Backlog;
import com.lige110.springreact.ppmtool.domain.Project;
import com.lige110.springreact.ppmtool.exceptions.ProjectIdException;
import com.lige110.springreact.ppmtool.repositories.BacklogRepository;
import com.lige110.springreact.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {


    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;

    public ProjectService(@Autowired ProjectRepository projectRepository,
                          @Autowired BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    public Project saveOrUpdateProject(Project project){
        try {
            String identifier = project.getProjectIdentifier().toUpperCase();
            project.setProjectIdentifier(identifier);


            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(identifier);

            }else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(identifier));
            }

            return projectRepository.save(project); // judge if the ID already exists here

        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase()+"' already exists");
        }
    }

    public Project findProjectByProjectIdentifier(String identifier){

        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project "+ identifier +" does not exist!");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project to be deleted not exists");
        }

        projectRepository.delete(project);
    }

}
