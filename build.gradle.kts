/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    kotlin("jvm") version "1.6.21"
    id("org.springframework.boot") version "2.4.0"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("plugin.spring") version "1.6.21"
}

repositories {
    mavenLocal()
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.4.0")
    implementation("org.springframework.boot:spring-boot-starter-web:2.4.0")
    implementation("javax.validation:validation-api:2.0.1.Final")
    implementation("org.springframework.boot:spring-boot-starter-validation:2.3.2.RELEASE")
    implementation("com.google.code.gson:gson:2.8.5")
    implementation("io.jsonwebtoken:jjwt:0.9.0")
    implementation("org.postgresql:postgresql:42.5.0")

    runtimeOnly("org.springframework.boot:spring-boot-devtools:2.4.0")
    runtimeOnly("com.h2database:h2:1.4.200")
    runtimeOnly("mysql:mysql-connector-java:8.0.22")

    implementation(platform("org.jetbrains.kotlin:kotlin-bom"))
    runtimeOnly("org.jetbrains.kotlin:kotlin-reflect:2.1.0")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("com.google.guava:guava:31.0.1-jre")

    testImplementation("org.springframework.boot:spring-boot-starter-test:2.4.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
}

group = "com.lige110.springReact"
version = "0.0.1-SNAPSHOT"
description = "ppmtool"
java.sourceCompatibility = JavaVersion.VERSION_1_8

tasks.withType<JavaCompile>() {
    options.encoding = "UTF-8"
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}
