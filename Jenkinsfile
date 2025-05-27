pipeline {
  agent any

  parameters {
    string(name: 'GIT_TAG', defaultValue: 'v1.0.0', description: 'Tag Git yang akan dibuild')
  }

  environment {
    VERSION = "${params.GIT_TAG}"
    DOCKER_USER = "denidkr24"  // Ganti sesuai akun Docker Hub kamu
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: "${params.GIT_TAG}", url: 'git@github.com:Deni4h/FE-CRUD-APP.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh """
          docker build -t $DOCKER_USER/frontend:${VERSION} ./FE-CRUD-APP
        """
      }
    }

    stage('Login Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        sh "docker push $DOCKER_USER/frontend:${VERSION}"
      }
    }

    stage('Deploy Frontend') {
      steps {
        script {
          // Buat file .env untuk versi docker-compose
          writeFile file: '.env', text: "VERSION=${VERSION}"

          sh """
            docker-compose pull frontend
            docker-compose up -d frontend
          """
        }
      }
    }
  }
}
