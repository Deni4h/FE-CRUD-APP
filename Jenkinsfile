pipeline {
  agent any

  tools {
    nodejs "NodeJS 18"
  }

  environment {
    NODE_ENV = "production"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Deni4h/FE-CRUD-APP.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'chmod +x scripts/deploy.sh'
        sh './scripts/deploy.sh'
      }
    }
  }

  post {
    success {
      echo '✅ Deployment berhasil!'
    }
    failure {
      echo '❌ Build/Deploy gagal!'
    }
  }
}
