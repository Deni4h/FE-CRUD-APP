pipeline {
  agent any

  parameters {
    string(name: 'GIT_TAG', defaultValue: 'v1.0.0', description: 'Tag Git yang akan dibuild')
  }

  environment {
    DOCKER_USER = "denidkr24"         // Ganti dengan Docker Hub kamu
    IMAGE_NAME = "frontend"
    REPO_URL = "git@github.com:Deni4h/FE-CRUD-APP.git"  // Ganti dengan repo kamu
    DOCKER_COMPOSE_DIR = "/home/deni"
  }

  stages {
    stage('Checkout FE Repo') {
      steps {
        git branch: "${params.GIT_TAG}", url: "${REPO_URL}"
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_USER/$IMAGE_NAME:${params.GIT_TAG} ."
      }
    }

    stage('Login Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
        }
      }
    }

    stage('Push Image') {
      steps {
        sh "docker push $DOCKER_USER/$IMAGE_NAME:${params.GIT_TAG}"
      }
    }

    stage('Deploy Frontend') {
      steps {
        sh """
          echo "VERSION=${params.GIT_TAG}" | sudo tee $DOCKER_COMPOSE_DIR/.env > /dev/null
          cd $DOCKER_COMPOSE_DIR
          docker-compose pull frontend
          docker-compose up -d frontend
        """
      }
    }
  }
}
