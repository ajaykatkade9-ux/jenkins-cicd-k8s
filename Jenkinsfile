pipeline {
    agent any

    environment {
        IMAGE_NAME = "ajaykatkade9/jenkins-cicd-demo:${BUILD_NUMBER}"
    }

    stages {

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
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl set image deployment/jenkins-cicd-demo node-app=$IMAGE_NAME
                kubectl rollout status deployment/jenkins-cicd-demo
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
