package com.lige110.ppmtool.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class ProjectIdException(message: String = "Project Id Exception") : RuntimeException(message)

@ResponseStatus(HttpStatus.BAD_REQUEST)
class ProjectNotFoundException(message: String?) : RuntimeException(message)

@ResponseStatus(HttpStatus.BAD_REQUEST)
class ProjectTaskException(message: String?) : RuntimeException(message)
