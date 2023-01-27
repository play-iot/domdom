plugins {
    eclipse
    idea
    id(ZeroLibs.Plugins.oss) version ZeroLibs.Version.gradlePlugin
    id(ZeroLibs.Plugins.root) version ZeroLibs.Version.gradlePlugin

    id(PluginLibs.jooq) version PluginLibs.Version.jooq apply false
    id(PluginLibs.nexusPublish) version PluginLibs.Version.nexusPublish
}

project.ext.set("baseName", "domdom")

allprojects {
    apply(plugin = "eclipse")
    apply(plugin = "idea")

    group = "cloud.playio"

    repositories {
        mavenLocal()
        maven { url = uri("https://maven-central-asia.storage-download.googleapis.com/maven2/") }
        maven { url = uri("https://oss.sonatype.org/content/groups/public/") }
        mavenCentral()
    }
    val skipPublish = (gradle as ExtensionAware).extensions["SKIP_PUBLISH"] as Array<*>
    sonarqube {
        isSkipProject = project.path in skipPublish
    }

    tasks {
        withType<AbstractPublishToMaven> {
            enabled = project != rootProject && project.path !in skipPublish
        }
    }
}

subprojects {
    apply(plugin = ZeroLibs.Plugins.oss)

    java {
        sourceCompatibility = JavaVersion.VERSION_11
    }

    dependencies {
        compileOnly(UtilLibs.jetbrainsAnnotations)
        compileOnly(UtilLibs.lombok)
        annotationProcessor(UtilLibs.lombok)

        testImplementation(TestLibs.junit5Api)
        testImplementation(TestLibs.junit5Engine)
        testImplementation(TestLibs.junit5Vintage)
        testImplementation(TestLibs.jsonAssert)
        testCompileOnly(UtilLibs.lombok)
        testAnnotationProcessor(UtilLibs.lombok)
    }

    oss {
        zero88.set(true)
        publishingInfo {
            homepage.set("https://github.com/play-iot/domdom")
            license {
                name.set("The Apache License, Version 2.0")
                url.set("https://github.com/play-iot/domdom/blob/master/LICENSE")
            }
            scm {
                connection.set("scm:git:git://git@github.com:play-iot/domdom.git")
                developerConnection.set("scm:git:ssh://git@github.com:play-iot/domdom.git")
                url.set("https://github.com/play-iot/domdom")
            }
        }
    }
}

nexusPublishing {
    packageGroup.set("io.github.zero88")
    repositories {
        sonatype {
            username.set(project.property("nexus.username") as String?)
            password.set(project.property("nexus.password") as String?)
        }
    }
}
