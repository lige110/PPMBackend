package com.lige110.ppmtool.repositories

import com.lige110.ppmtool.domain.Backlog
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface BacklogRepository : CrudRepository<Backlog, Long> {
    fun findByProjectIdentifier(identifier: String): Backlog?
}
