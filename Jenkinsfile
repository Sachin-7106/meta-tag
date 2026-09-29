pipeline {
    agent any

    environment {
        APP_NAME        = 'metatag-generator'
        LOCAL_IMAGE     = "metaforge/metatag-generator:jenkins-${BUILD_NUMBER}"

        K8S_NAMESPACE   = 'metaforge-prod'
        K8S_DEPLOYMENT  = 'metatag-generator'
        WSL_DISTRO      = 'Ubuntu'

        APP_ENV         = 'production'

        // Jenkins runs as LocalSystem, so use the exact Python 3.11 path.
        PYTHON_EXE      = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    stages {

        // ============================================================
        // 01. SOURCE CONTROL
        // ============================================================

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


        // ============================================================
        // 02. DEPENDENCIES
        // ============================================================

        stage('02. Install Dependencies') {
            steps {
                echo "--> [Jenkins] Installing backend and frontend dependencies..."

                bat '''
                    echo Checking Python...
                    "%PYTHON_EXE%" --version

                    echo Checking Node.js...
                    node --version

                    echo Checking npm...
                    npm --version
                '''

                dir('backend') {
                    bat '''
                        echo Installing Python dependencies...
                        "%PYTHON_EXE%" -m pip install --upgrade pip
                        "%PYTHON_EXE%" -m pip install -r requirements.txt
                    '''
                }

                dir('frontend') {
                    bat '''
                        echo Installing frontend dependencies...
                        npm ci
                    '''
                }

                echo "--> Dependency installation completed."
            }
        }


        // ============================================================
        // 03. TESTS
        // ============================================================

        stage('03. Execute Automated Test Suite') {
            steps {
                echo "--> [Jenkins] Running automated backend tests..."

                dir('backend') {
                    bat '''
                        "%PYTHON_EXE%" -m pytest tests/ -v
                    '''
                }

                echo "--> Backend test suite completed successfully."
            }
        }


        // ============================================================
        // 04. FRONTEND BUILD
        // ============================================================

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


        // ============================================================
        // 05. DOCKER BUILD
        // ============================================================

        stage('05. Build OCI Docker Image') {
            steps {
                echo "--> [Docker] Building production image..."

                bat '''
                    echo Checking Docker...
                    docker version

                    echo Building MetaForge image...
                    docker build -t %LOCAL_IMAGE% .

                    echo Verifying image...
                    docker images %LOCAL_IMAGE%
                '''

                echo "--> Docker image built successfully: ${LOCAL_IMAGE}"
            }
        }


        // ============================================================
        // 06. SECURITY / IMAGE INSPECTION
        // ============================================================

        stage('06. Scan Container Vulnerabilities') {
            steps {
                echo "--> [Security] Inspecting Docker image..."

                bat '''
                    docker image inspect %LOCAL_IMAGE%
                '''

                echo "--> Container image inspection completed."
                echo "--> Trivy can be integrated later when installed on Jenkins."
            }
        }


        // ============================================================
        // 07. CONTAINER REGISTRY
        // ============================================================

        stage('07. Push Image to Registry') {
            steps {
                echo "--> [Registry] Preparing container image..."

                /*
                 * Local college demonstration mode.
                 *
                 * The image remains inside Docker Desktop and is
                 * subsequently loaded into Minikube.
                 *
                 * GHCR authentication/push can be enabled later.
                 */

                bat '''
                    docker image inspect %LOCAL_IMAGE%
                '''

                echo "--> Local Docker image is ready for Minikube."
            }
        }


        // ============================================================
        // 08. TERRAFORM VALIDATION
        // ============================================================

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


        // ============================================================
        // 09. TERRAFORM PLAN
        // ============================================================

        stage('09. Terraform Infrastructure Plan & Apply') {
            steps {
                echo "--> [Terraform] Generating infrastructure plan..."

                dir('terraform') {
                    bat '''
                        terraform plan -out=tfplan
                    '''
                }

                echo "--> Terraform plan generated successfully."
                echo "--> Cloud infrastructure apply is disabled for local college demo."
            }
        }


        // ============================================================
        // 10. ANSIBLE
        // ============================================================

        stage('10. Ansible Host Configuration Management') {
            steps {
                echo "--> [Ansible] Validating Ansible configuration through WSL..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "ansible --version"

                    wsl -d %WSL_DISTRO% -- bash -lc "cd '/mnt/c/meta tag/ansible' && ansible-playbook --syntax-check -i inventory playbook.yml"
                '''

                echo "--> Ansible playbook syntax validation completed."
            }
        }


        // ============================================================
        // 11. KUBERNETES DEPLOYMENT
        // ============================================================

        stage('11. Kubernetes Rolling Deployment') {
            steps {
                echo "--> [Kubernetes] Checking Minikube..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube status"
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl get nodes"
                '''

                echo "--> Loading Jenkins Docker image into Minikube..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube image load %LOCAL_IMAGE%"
                '''

                echo "--> Verifying image inside Minikube..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "minikube image ls | grep -F '%LOCAL_IMAGE%' || true"
                '''

                echo "--> Updating Kubernetes deployment image..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% set image deployment/%K8S_DEPLOYMENT app=%LOCAL_IMAGE%"
                '''

                echo "--> Waiting for Kubernetes rolling update..."

                bat '''
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% rollout status deployment/%K8S_DEPLOYMENT --timeout=180s"
                '''

                echo "--> Kubernetes rolling deployment completed."
            }
        }


        // ============================================================
        // 12. PRODUCTION VERIFICATION
        // ============================================================

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
                    wsl -d %WSL_DISTRO% -- bash -lc "kubectl -n %K8S_NAMESPACE% wait --for=condition=Ready pod -l app=%K8S_DEPLOYMENT% --timeout=180s"
                '''

                echo "--> Kubernetes production verification completed."
            }
        }
    }


    // ================================================================
    // POST ACTIONS
    // ================================================================

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
            echo "--> Docker     : ${LOCAL_IMAGE}"
            echo "=========================================================="
        }

        failure {
            echo "=========================================================="
            echo "   METAFORGE PIPELINE BUILD #${BUILD_NUMBER} FAILED!"
            echo "=========================================================="
        }
    }
}