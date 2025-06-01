pipeline {
    agent { label 'jenkins-agent-dev' }

    environment {
        REGISTRY = "docker.io"
        DOCKERHUB_USERNAME = "denidkr24"
        REPO_NAME = "fe-crud-app"
        IMAGE_TAG = "frontend-${new Date().format('yyyyMMdd-HHmmss')}"
        FULL_IMAGE = "${REGISTRY}/${DOCKERHUB_USERNAME}/${REPO_NAME}:${IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:Deni4h/FE-CRUD-APP.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('FE-CRUD-APP') {
                    sh "docker build -t ${FULL_IMAGE} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    sh "docker push ${FULL_IMAGE}"
                }
            }
        }

        stage('Update docker-compose.yml') {
            steps {
                script {
                    def composeFile = readFile 'docker-compose.yml'
                    def pattern = "image:\\s*" + REGISTRY + "/" + DOCKERHUB_USERNAME + "/" + REPO_NAME + ":[^\\n]+"
                    def updated = composeFile.replaceAll(pattern, "image: ${FULL_IMAGE}")
                    writeFile file: 'docker-compose.yml', text: updated
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose pull frontend'
                sh 'docker-compose up -d frontend'
            }
        }
    }
}
