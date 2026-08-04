pipeline {
    agent any

    stages {

        stage('Git Checkout') {
            steps {
                echo 'Source code downloaded from GitHub'
            }
        }

        stage('Check Tools') {
            steps {
                sh 'git --version'
                sh 'docker --version'
                sh 'kubectl version --client'
                sh 'helm version'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('app') {
                    sh 'docker build -t jenkins-cicd-demo:v1 .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker rm -f jenkins-demo || true
                docker run -d --name jenkins-demo -p 3000:3000 jenkins-cicd-demo:v1
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
