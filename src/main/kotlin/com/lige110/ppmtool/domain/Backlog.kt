package com.lige110.ppmtool.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToMany
import javax.persistence.OneToOne

@Entity
class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
    var pTSequence = 0
    var projectIdentifier: String? = null

    // one To one with project
    @OneToOne(mappedBy = "backlog")
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIgnore
    var project: Project? = null

    // OneToMany project tasks
    @OneToMany(cascade = [CascadeType.REFRESH], fetch = FetchType.EAGER, orphanRemoval = true, mappedBy = "backlog")
    var projectTasks: MutableSet<ProjectTask> = mutableSetOf()
}
