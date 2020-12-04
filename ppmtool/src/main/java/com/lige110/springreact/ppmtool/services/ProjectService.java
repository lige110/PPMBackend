package com.lige110.springreact.ppmtool.services;

import com.lige110.springreact.ppmtool.domain.Project;
import com.lige110.springreact.ppmtool.exceptions.ProjectIdException;
import com.lige110.springreact.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {


    private ProjectRepository projectRepository;

    public ProjectService(@Autowired ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdateProject(Project project){

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase()+"' already exists");
        }
    }

    public Project findProjectByProjectIdentifier(String identifier){

        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());
        if(project == null){
            throw new ProjectIdException("Project does not exist!");
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
