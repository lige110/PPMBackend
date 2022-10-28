package com.lige110.ppmtool

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [ErrorMvcAutoConfiguration::class])
class PpmtoolApplication

fun main(args: Array<String>) {
    runApplication<PpmtoolApplication>(*args)
}
