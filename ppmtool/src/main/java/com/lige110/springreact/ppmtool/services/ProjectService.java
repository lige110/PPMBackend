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
}
