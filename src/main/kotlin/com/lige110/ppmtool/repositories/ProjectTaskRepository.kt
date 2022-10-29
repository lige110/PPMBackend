package com.lige110.ppmtool.repositories

import com.lige110.ppmtool.domain.ProjectTask
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectTaskRepository : CrudRepository<ProjectTask, Long> {
    fun findByProjectIdentifierOrderByPriority(id: String): List<ProjectTask>
    fun findByProjectSequence(projectSequence: String): ProjectTask?
}
