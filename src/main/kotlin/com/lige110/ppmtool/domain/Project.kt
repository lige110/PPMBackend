package com.lige110.ppmtool.domain

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.Date
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToOne
import javax.persistence.PrePersist
import javax.persistence.PreUpdate
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @NotBlank(message = "Project name is required")
    var projectName: String = ""

    @Column(updatable = false, unique = true)
    @NotBlank(message = "Project Identifier is required")
    @Size(
        min = 4,
        max = 5,
        message = "please use 4 to 5 characters"
    )
    var projectIdentifier: String = "ddd"

    @NotBlank(message = "Project description is required")
    var description: String = "default description"

    @JsonFormat(pattern = "yyyy-mm-dd")
    var start_date: Date? = null

    @JsonFormat(pattern = "yyyy-mm-dd")
    var end_date: Date? = null

    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    var created_At: Date? = null

    @JsonFormat(pattern = "yyyy-mm-dd")
    var updated_At: Date? = null

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JsonIgnore
    var backlog: Backlog? = null

    @PrePersist
    protected fun onCreate() {
        created_At = Date()
    }

    @PreUpdate
    protected fun onUpdate() {
        updated_At = Date()
    }
}
