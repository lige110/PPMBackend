package com.lige110.ppmtool.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestController
@ControllerAdvice
class CustomResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler
    fun handleProjectIdException(ex: ProjectIdException, request: WebRequest?): ResponseEntity<Any> {
        val exceptionResponse = ProjectIdExceptionResponse(ex.message!!)
        return ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler
    fun handleProjectNotFoundException(ex: ProjectNotFoundException, request: WebRequest?): ResponseEntity<Any> {
        val exceptionResponse = ProjectNotFoundExceptionResponse(ex.message!!)
        return ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler
    fun handleProjectTaskException(ex: ProjectTaskException, request: WebRequest?): ResponseEntity<Any> {
        val exceptionResponse = ProjectTaskExceptionResponse(ex.message!!)
        return ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST)
    }
}
