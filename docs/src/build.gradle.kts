java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

dependencies {
}

apply<antora.AntoraDocComponentPlugin>()
configure<antora.AntoraDocComponentExtension> {
    asciiAttributes.set(mapOf("domdom-version" to project.version))
    javadocTitle.set("PlayIO domdom ${project.version} API")
    javadocProjects.set(
        when (gradle) {
            is ExtensionAware -> ((gradle as ExtensionAware).extensions["PROJECT_POOL"] as Map<*, Array<String>>)["backend"]!!
            else              -> emptyArray()
        }.map(project::project)
    )
}
