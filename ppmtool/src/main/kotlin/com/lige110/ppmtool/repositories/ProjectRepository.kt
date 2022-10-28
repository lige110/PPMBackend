package com.lige110.ppmtool.repositories

import com.lige110.ppmtool.domain.Project
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : CrudRepository<Project, Long> {
    fun findByProjectIdentifier(identifier: String): Project?
}
