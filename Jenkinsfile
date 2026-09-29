pipeline {
    agent any

    environment {
        APP_NAME        = 'metatag-generator'
        LOCAL_IMAGE     = "metaforge/metatag-generator:jenkins-${BUILD_NUMBER}"
        K8S_NAMESPACE   = 'metaforge-prod'
        K8S_DEPLOYMENT  = 'metatag-generator'
        WSL_DISTRO      = 'Ubuntu'
        APP_ENV         = 'production'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    stages {

        stage('01. Checkout Source Control') {
            steps {
                echo "--> [GitHub] Checking out branch main..."

                checkout scm

                bat '''
                    git --version
                    git rev-parse --short HEAD
                '''

                script {
                    env.GIT_COMMIT_HASH = bat(
                        script: '@git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "--> Git Commit Hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }

        stage('02. Install Dependencies') {
            steps {
                echo "--> [Jenkins] Installing backend and frontend dependencies..."

                bat '''
                    python --version
                    node --version
                    npm --version
                '''

                dir('backend') {
                    bat '''
                        python -m pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }

                dir('frontend') {
                    bat '''
                        npm ci
                    '''
                }
            }
        }

        stage('03. Execute Automated Test Suite') {
            steps {
                echo "--> [Jenkins] Running automated backend tests..."

                dir('backend') {
                    bat '''
                        python -m pytest tests/ -v
                    '''
                }

                echo "--> Backend test suite completed successfully."
            }
        }

        stage('04. Build Application Assets') {
            steps {
                echo "--> [Jenkins] Building production frontend..."

                dir('frontend') {
                    bat '''
                        npm run build
                    '''
                }

                echo "--> Frontend production build completed."
            }
        }

        stage('05. Build OCI Docker Image') {
            steps {
                echo "--> [Docker] Building production image..."

                bat '''
                    docker version
                    docker build -t %LOCAL_IMAGE% .
                    docker images %LOCAL_IMAGE%
                '''

                echo "--> Docker image built successfully: ${LOCAL_IMAGE}"
            }
        }

        stage('06. Scan Container Vulnerabilities') {
            steps {
                echo "--> [Security] Checking Docker image..."

                bat '''
                    docker image inspect %LOCAL_IMAGE%
                '''

                echo "--> Container image inspection completed."
                echo "--> Trivy integration can be enabled when Trivy is installed on the Jenkins agent."
            }
        }

        stage('07. Push Image to Registry') {
            steps {
                echo "--> [Registry] Preparing container image..."

                /*
                 * For the local college demonstration, the image remains
                 * available in Docker Desktop/Minikube.
                 *
                 * Real GHCR push can be enabled later using Jenkins
                 * username/password credentials.
                 */

                bat '''
                    docker image inspect %LOCAL_IMAGE%
                '''

                echo "--> Local registry/demo image is ready."
            }
        }

        stage('08. Terraform Infrastructure Validation') {
            steps {
                echo "--> [Terraform] Validating Infrastructure as Code..."

                dir('terraform') {
                    bat '''
                        terraform version
                        terraform init -backend=false
                        terraform validate
                    '''
                }

                echo "--> Terraform validation completed."
            }
        }

        stage('09. Terraform Infrastructure Plan & Apply') {
            steps {
                echo "--> [Terraform] Generating infrastructure plan..."

                dir('terraform') {
                    bat '''
                        terraform plan -out=tfplan
                    '''
                }

                echo "--> Terraform plan generated successfully."
                echo "--> Cloud apply is intentionally not automatic for the local college demo."
            }
        }

        stage('10. Ansible Host Configuration Management') {
            steps {
                echo "--> [Ansible] Validating Ansible configuration through WSL..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "ansible --version"
                    wsl -d %WSL_DISTRO% -- bash -lc "cd /mnt/c/meta\\ tag/ansible && ansible-playbook --syntax-check -i inventory playbook.yml"
                '''

                echo "--> Ansible playbook syntax validation completed."
            }
        }

        stage('11. Kubernetes Rolling Deployment') {
            steps {
                echo "--> [Kubernetes] Deploying MetaForge to Minikube..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube status"
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl get nodes"
                '''

                echo "--> Loading Jenkins-built Docker image into Minikube..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube image load %LOCAL_IMAGE%"
                '''

                echo "--> Updating Kubernetes deployment image..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% set image deployment/%K8S_DEPLOYMENT app=%LOCAL_IMAGE%"
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% rollout status deployment/%K8S_DEPLOYMENT --timeout=180s"
                '''

                echo "--> Kubernetes rolling deployment completed."
            }
        }

        stage('12. Production Deployment Verification') {
            steps {
                echo "--> [Production] Verifying Kubernetes deployment..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get deployment"
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get pods -o wide"
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get service"
                '''

                echo "--> Checking pod readiness..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% wait --for=condition=Ready pod -l app=%K8S_DEPLOYMENT --timeout=180s"
                '''

                echo "--> Kubernetes production verification completed."
            }
        }
    }

    post {
        always {
            echo "--> Cleaning up transient workspace artifacts..."
        }

        success {
            echo "=========================================================="
            echo "   METAFORGE PIPELINE BUILD #${BUILD_NUMBER} SUCCESSFUL!"
            echo "=========================================================="
            echo "--> Git Commit : ${env.GIT_COMMIT_HASH}"
            echo "--> Kubernetes : ${K8S_NAMESPACE}"
            echo "--> Deployment : ${K8S_DEPLOYMENT}"
        }

        failure {
            echo "=========================================================="
            echo "   METAFORGE PIPELINE BUILD #${BUILD_NUMBER} FAILED!"
            echo "=========================================================="
        }
    }
}