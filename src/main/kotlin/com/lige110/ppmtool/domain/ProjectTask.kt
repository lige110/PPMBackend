package com.lige110.ppmtool.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.Date
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.PrePersist
import javax.persistence.PreUpdate
import javax.validation.constraints.NotBlank

@Entity
class ProjectTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(updatable = false, unique = true)
    var projectSequence: String? = null

    @NotBlank(message = "Please include a project summary")
    var summary: String? = null

    var acceptanceCriteria: String? = null
    var status: String = "default"
    var priority: Int? = null
    var dueDate: Date? = null

    @Column(updatable = false)
    var projectIdentifier: String? = null

    var create_At: Date? = null
    var update_At: Date? = null

    // ManyToOne with Backlog
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    var backlog: Backlog? = null

    @PrePersist
    protected fun onCreate() {
        create_At = Date()
    }

    @PreUpdate
    protected fun onUpdate() {
        update_At = Date()
    }

    override fun toString(): String {
        return "ProjectTask{" +
            "id=" + id +
            ", projectSequence='" + projectSequence + '\'' +
            ", summary='" + summary + '\'' +
            ", acceptanceCriteria='" + acceptanceCriteria + '\'' +
            ", status='" + status + '\'' +
            ", priority=" + priority +
            ", dueDate=" + dueDate +
            ", projectIdentifier='" + projectIdentifier + '\'' +
            ", create_At=" + create_At +
            ", update_At=" + update_At +
//            ", backlog=" + backlog +
            '}'
    }
}
