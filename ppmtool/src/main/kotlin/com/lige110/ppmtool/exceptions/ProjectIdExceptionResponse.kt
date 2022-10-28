/*
    Literally the return response, Java object converted into a JSON object
 */
package com.lige110.ppmtool.exceptions

data class ProjectIdExceptionResponse(val projectIdentifier: String)

data class ProjectNotFoundExceptionResponse(val projectNotFound: String)

data class ProjectTaskExceptionResponse(val projectTaskException: String)

data class InvalidLoginResponse(
    val username: String = "Invalid username",
    val password: String = "Invalid password"
)
