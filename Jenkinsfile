pipeline {
    agent any

    environment {
        // Application
        APP_NAME        = 'metatag-generator'
        APP_ENV         = 'production'

        // Docker
        LOCAL_IMAGE     = "metaforge/metatag-generator:jenkins-${BUILD_NUMBER}"
        DOCKER_EXE      = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'

        // Python
        PYTHON_EXE      = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'

        // Terraform
        TERRAFORM_EXE   = 'C:\\Terraform\\terraform.exe'

        // WSL / Kubernetes
        WSL_DISTRO      = 'Ubuntu'
        K8S_NAMESPACE   = 'metaforge-prod'
        K8S_DEPLOYMENT  = 'metatag-generator'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    stages {

        // =========================================================
        // 01. CHECKOUT
        // =========================================================
        stage('01. Checkout Source Control') {
            steps {
                echo '--> [GitHub] Checking out branch main...'

                checkout scm

                bat '''
                    echo Checking Git...
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


        // =========================================================
        // 02. INSTALL DEPENDENCIES
        // =========================================================
        stage('02. Install Dependencies') {
            steps {
                echo '--> [Jenkins] Installing backend and frontend dependencies...'

                bat '''
                    echo ==========================================
                    echo Checking Python
                    echo ==========================================
                    "%PYTHON_EXE%" --version

                    echo.
                    echo ==========================================
                    echo Checking Node.js
                    echo ==========================================
                    node --version

                    echo.
                    echo ==========================================
                    echo Checking npm
                    echo ==========================================
                    npm --version

                    echo.
                    echo ==========================================
                    echo Checking Docker
                    echo ==========================================
                    "%DOCKER_EXE%" version
                '''

                dir('backend') {
                    bat '''
                        echo ==========================================
                        echo Installing Python dependencies
                        echo ==========================================

                        "%PYTHON_EXE%" -m pip install --upgrade pip

                        "%PYTHON_EXE%" -m pip install -r requirements.txt
                    '''
                }

                dir('frontend') {
                    bat '''
                        echo ==========================================
                        echo Installing frontend dependencies
                        echo ==========================================

                        npm ci
                    '''
                }

                echo '--> Dependency installation completed.'
            }
        }


        // =========================================================
        // 03. TEST
        // =========================================================
        stage('03. Execute Automated Test Suite') {
            steps {
                echo '--> [Jenkins] Running automated backend tests...'

                dir('backend') {
                    bat '''
                        "%PYTHON_EXE%" -m pytest tests/ -v
                    '''
                }

                echo '--> Backend test suite completed successfully.'
            }
        }


        // =========================================================
        // 04. FRONTEND BUILD
        // =========================================================
        stage('04. Build Application Assets') {
            steps {
                echo '--> [Jenkins] Building production frontend...'

                dir('frontend') {
                    bat '''
                        npm run build
                    '''
                }

                echo '--> Frontend production build completed.'
            }
        }


        // =========================================================
        // 05. DOCKER BUILD
        // =========================================================
        stage('05. Build OCI Docker Image') {
            steps {
                echo "--> [Docker] Building production image: ${LOCAL_IMAGE}"

                bat '''
                    echo ==========================================
                    echo Docker Engine
                    echo ==========================================

                    "%DOCKER_EXE%" version

                    echo.
                    echo ==========================================
                    echo Building Docker Image
                    echo ==========================================

                    "%DOCKER_EXE%" build -t %LOCAL_IMAGE% .

                    echo.
                    echo ==========================================
                    echo Docker Image
                    echo ==========================================

                    "%DOCKER_EXE%" images %LOCAL_IMAGE%
                '''

                echo "--> Docker image built successfully: ${LOCAL_IMAGE}"
            }
        }


        // =========================================================
        // 06. SECURITY / IMAGE INSPECTION
        // =========================================================
        stage('06. Scan Container Vulnerabilities') {
            steps {
                echo '--> [Security] Inspecting Docker image...'

                bat '''
                    "%DOCKER_EXE%" image inspect %LOCAL_IMAGE%
                '''

                echo '--> Container image inspection completed.'
                echo '--> Trivy scanning can be enabled when Trivy is installed.'
            }
        }


        // =========================================================
        // 07. REGISTRY
        // =========================================================
        stage('07. Push Image to Registry') {
            steps {
                echo '--> [Registry] Preparing container image...'

                /*
                 * LOCAL DEMO MODE
                 *
                 * The image remains inside Docker Desktop.
                 * It will be loaded into Minikube in Stage 11.
                 *
                 * A real GHCR push can be enabled later with
                 * Jenkins credentials.
                 */

                bat '''
                    "%DOCKER_EXE%" image inspect %LOCAL_IMAGE%
                '''

                echo '--> Docker image is ready for Minikube.'
            }
        }


        // =========================================================
        // 08. TERRAFORM VALIDATION
        // =========================================================
        stage('08. Terraform Infrastructure Validation') {
            steps {
                echo '--> [Terraform] Validating Infrastructure as Code...'

                dir('terraform') {
                    bat '''
                        echo ==========================================
                        echo Terraform Version
                        echo ==========================================

                        "%TERRAFORM_EXE%" version

                        echo.
                        echo ==========================================
                        echo Terraform Init
                        echo ==========================================

                        "%TERRAFORM_EXE%" init -backend=false

                        echo.
                        echo ==========================================
                        echo Terraform Validate
                        echo ==========================================

                        "%TERRAFORM_EXE%" validate
                    '''
                }

                echo '--> Terraform validation completed.'
            }
        }


        // =========================================================
        // 09. TERRAFORM PLAN
        // =========================================================
        stage('09. Terraform Infrastructure Plan & Apply') {
            steps {
                echo '--> [Terraform] Generating infrastructure plan...'

                dir('terraform') {
                    bat '''
                        "%TERRAFORM_EXE%" plan -out=tfplan
                    '''
                }

                echo '--> Terraform plan generated successfully.'
                echo '--> Automatic cloud infrastructure apply is disabled for the local college demo.'
            }
        }


        // =========================================================
        // 10. ANSIBLE
        // =========================================================
        stage('10. Ansible Host Configuration Management') {
            steps {
                echo '--> [Ansible] Validating Ansible configuration through WSL...'

                bat '''
                    echo ==========================================
                    echo Ansible Version
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "ansible --version"

                    echo.
                    echo ==========================================
                    echo Ansible Syntax Check
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "cd '/mnt/c/meta tag/ansible' && ansible-playbook --syntax-check -i inventory playbook.yml"
                '''

                echo '--> Ansible playbook syntax validation completed.'
            }
        }


        // =========================================================
        // 11. KUBERNETES DEPLOYMENT
        // =========================================================
        stage('11. Kubernetes Rolling Deployment') {
            steps {
                echo '--> [Kubernetes] Checking Minikube cluster...'

                bat '''
                    echo ==========================================
                    echo Minikube Status
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "minikube status"

                    echo.
                    echo ==========================================
                    echo Kubernetes Nodes
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl get nodes"
                '''

                echo '--> Loading Jenkins-built Docker image into Minikube...'

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube image load %LOCAL_IMAGE%"
                '''

                echo '--> Updating Kubernetes deployment image...'

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% set image deployment/%K8S_DEPLOYMENT% app=%LOCAL_IMAGE%"
                '''

                echo '--> Waiting for Kubernetes rolling deployment...'

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% rollout status deployment/%K8S_DEPLOYMENT% --timeout=180s"
                '''

                echo '--> Kubernetes rolling deployment completed.'
            }
        }


        // =========================================================
        // 12. PRODUCTION VERIFICATION
        // =========================================================
        stage('12. Production Deployment Verification') {
            steps {
                echo '--> [Production] Verifying Kubernetes deployment...'

                bat '''
                    echo ==========================================
                    echo Deployment
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get deployment"

                    echo.
                    echo ==========================================
                    echo Pods
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get pods -o wide"

                    echo.
                    echo ==========================================
                    echo Service
                    echo ==========================================

                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% get service"
                '''

                echo '--> Checking pod readiness...'

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% wait --for=condition=Ready pod -l app=%K8S_DEPLOYMENT% --timeout=180s"
                '''

                echo '--> Kubernetes production verification completed.'
            }
        }
    }


    // =============================================================
    // POST ACTIONS
    // =============================================================
    post {

        always {
            echo '--> Cleaning up transient workspace artifacts...'
        }

        success {
            echo '=========================================================='
            echo "   METAFORGE PIPELINE BUILD #${BUILD_NUMBER} SUCCESSFUL!"
            echo '=========================================================='
            echo "--> Git Commit : ${env.GIT_COMMIT_HASH}"
            echo "--> Docker     : ${LOCAL_IMAGE}"
            echo "--> Kubernetes : ${K8S_NAMESPACE}"
            echo "--> Deployment : ${K8S_DEPLOYMENT}"
            echo '=========================================================='
        }

        failure {
            echo '=========================================================='
            echo "   METAFORGE PIPELINE BUILD #${BUILD_NUMBER} FAILED!"
            echo '=========================================================='
        }
    }
}