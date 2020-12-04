package com.lige110.springreact.ppmtool.services;

import com.lige110.springreact.ppmtool.domain.Project;
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

        // logic

        return projectRepository.save(project);
    }
}
