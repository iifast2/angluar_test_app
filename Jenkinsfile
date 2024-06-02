pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Hello World'
            }
        }
        
         stage('Install dependencies') {
            steps {
                echo 'Install Dependencies...'
                bat 'npm install'
            }
        }
        
         stage('Build Application') {
            steps {
                echo 'Build Application'
                bat 'npm run build'
                bat 'dir'
                echo 'Archiving artifacts...'
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            }
        }
        
         stage('Build Docker image') {
            steps {
                echo 'Hello World'
            }
        }
        
         stage('Push image to registery') {
            steps {
                echo 'Hello World'
            }
        }
        
         stage('Push Dist to Nexus') {
            steps {
                echo 'Hello World'
            }
        }
        
         stage('Unti Tests') {
            steps {
                echo 'Hello World'
            }
        }
        
         stage('Deploy Angluar to K8s') {
            steps {
                echo 'Hello World'
            }
        }
    
        
    }
    
    post {
        always {
            echo 'This will always run'
        }
        
        success {
            echo 'This will run only if the pipeline succeeds'
        }
        
        failure {
            echo 'This will run only if the pipeline fails'
        }
        
    }
}
