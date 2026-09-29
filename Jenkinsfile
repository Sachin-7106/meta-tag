pipeline {

    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        skipDefaultCheckout(false)
    }

    environment {

        // ==========================================================
        // TOOLS
        // ==========================================================

        PYTHON_EXE = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\Python\\Python311\\python.exe'

        DOCKER_EXE = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'

        TERRAFORM_EXE = 'C:\\Terraform\\terraform.exe'

        // WSL distribution
        WSL_DISTRO = 'Ubuntu'

        // ==========================================================
        // APPLICATION
        // ==========================================================

        IMAGE_NAME = 'metaforge/metatag-generator'

        IMAGE_TAG = "jenkins-${BUILD_NUMBER}"

        FULL_IMAGE = "${IMAGE_NAME}:jenkins-${BUILD_NUMBER}"

        K8S_NAMESPACE = 'metaforge-prod'

        K8S_DEPLOYMENT = 'metatag-generator'

        // ==========================================================
        // DEMO MODE
        // ==========================================================

        DEMO_MODE = 'true'
    }

    stages {

        // ==========================================================
        // 01. CHECKOUT
        // ==========================================================

        stage('01. Checkout Source Control') {

            steps {

                echo '=========================================================='
                echo '01. GITHUB SOURCE CONTROL'
                echo '=========================================================='

                echo '--> Checking out source code...'

                checkout scm

                bat '''
                    echo Checking Git...
                    git --version

                    echo.
                    echo Current Commit:
                    git rev-parse --short HEAD

                    echo.
                    echo Current Branch:
                    git branch --show-current
                '''

                script {
                    def commitHash = bat(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "--> Git Commit Hash: ${commitHash}"
                }
            }
        }


        // ==========================================================
        // 02. INSTALL DEPENDENCIES
        // ==========================================================

        stage('02. Install Dependencies') {

            steps {

                echo '=========================================================='
                echo '02. INSTALL DEPENDENCIES'
                echo '=========================================================='

                echo '--> Installing backend dependencies...'

                dir('backend') {

                    bat '''
                        "%PYTHON_EXE%" -m pip install -r requirements.txt
                    '''
                }

                echo '--> Installing frontend dependencies...'

                dir('frontend') {

                    bat '''
                        npm ci
                    '''
                }

                echo '--> Dependency installation completed.'
            }
        }


        // ==========================================================
        // 03. TEST
        // ==========================================================

        stage('03. Execute Automated Test Suite') {

            steps {

                echo '=========================================================='
                echo '03. AUTOMATED TESTING'
                echo '=========================================================='

                echo '--> Running backend tests...'

                dir('backend') {

                    bat '''
                        "%PYTHON_EXE%" -m pytest tests/ -v
                    '''
                }

                echo '--> All automated tests passed.'
            }
        }


        // ==========================================================
        // 04. BUILD APPLICATION
        // ==========================================================

        stage('04. Build Application') {

            steps {

                echo '=========================================================='
                echo '04. APPLICATION BUILD'
                echo '=========================================================='

                dir('frontend') {

                    bat '''
                        echo Building React production application...
                        npm run build
                    '''
                }

                echo '--> Frontend production build completed.'
            }
        }


        // ==========================================================
        // 05. DOCKER BUILD
        // ==========================================================

        stage('05. Build OCI Docker Image') {

            steps {

                echo '=========================================================='
                echo '05. DOCKER CONTAINERIZATION'
                echo '=========================================================='

                echo "--> Building Docker image: ${FULL_IMAGE}"

                bat '''
                    echo Checking Docker Engine...
                    "%DOCKER_EXE%" version

                    echo.
                    echo Building Docker image...

                    "%DOCKER_EXE%" build ^
                        -t "%FULL_IMAGE%" ^
                        .

                    echo.
                    echo Docker image created successfully.

                    echo.
                    echo Docker Image Details:

                    "%DOCKER_EXE%" images "%IMAGE_NAME%"
                '''

                echo "--> Docker image built successfully: ${FULL_IMAGE}"
            }
        }


        // ==========================================================
        // 06. CONTAINER SECURITY SCAN
        // ==========================================================

        stage('06. Scan Container Vulnerabilities') {

            steps {

                echo '=========================================================='
                echo '06. CONTAINER SECURITY'
                echo '=========================================================='

                echo '--> Inspecting Docker image...'

                bat '''
                    "%DOCKER_EXE%" image inspect "%FULL_IMAGE%"
                '''

                echo '--> Docker image inspection completed.'

                echo '--> Trivy scan can be enabled when Trivy is installed.'
                echo '--> Continuing with image validation.'
            }
        }


        // ==========================================================
        // 07. CONTAINER REGISTRY
        // ==========================================================

        stage('07. Prepare Container Registry') {

            steps {

                echo '=========================================================='
                echo '07. CONTAINER REGISTRY'
                echo '=========================================================='

                echo '--> Validating Docker image before registry stage...'

                bat '''
                    "%DOCKER_EXE%" image inspect "%FULL_IMAGE%"
                '''

                echo '--> Local image is ready.'

                echo '----------------------------------------------------------'
                echo 'DEMO MODE'
                echo '----------------------------------------------------------'
                echo 'Registry push is skipped because no registry credentials'
                echo 'are configured in Jenkins.'
                echo 'The image will be used directly by Minikube.'
                echo '----------------------------------------------------------'
            }
        }


        // ==========================================================
        // 08. TERRAFORM VALIDATION
        // ==========================================================

        stage('08. Terraform Infrastructure Validation') {

            steps {

                echo '=========================================================='
                echo '08. TERRAFORM VALIDATION'
                echo '=========================================================='

                dir('terraform') {

                    bat '''
                        echo Terraform Version
                        "%TERRAFORM_EXE%" version

                        echo.
                        echo Terraform Init
                        "%TERRAFORM_EXE%" init -backend=false

                        echo.
                        echo Terraform Validate
                        "%TERRAFORM_EXE%" validate
                    '''
                }

                echo '--> Terraform validation completed successfully.'
            }
        }


        // ==========================================================
        // 09. TERRAFORM PLAN
        // ==========================================================

       stage('09. Terraform Infrastructure Plan') {

    steps {

        echo '=========================================================='
        echo '09. TERRAFORM INFRASTRUCTURE PLAN'
        echo '=========================================================='

        script {

            if (env.DEMO_MODE == 'true') {

                echo '----------------------------------------------------------'
                echo 'TERRAFORM LOCAL DEMO MODE'
                echo '----------------------------------------------------------'
                echo 'DEMO_MODE=true'
                echo 'AWS infrastructure provisioning is disabled.'
                echo 'Terraform configuration has already been validated.'
                echo 'Skipping AWS Terraform plan.'
                echo 'Continuing with local Minikube deployment.'
                echo '----------------------------------------------------------'

            } else {

                def awsCredentialsAvailable = bat(
                    script: '''
                        if "%AWS_ACCESS_KEY_ID%"=="" exit /b 1
                        if "%AWS_SECRET_ACCESS_KEY%"=="" exit /b 1
                        exit /b 0
                    ''',
                    returnStatus: true
                )

                if (awsCredentialsAvailable != 0) {

                    error(
                        'AWS credentials are required when DEMO_MODE=false. ' +
                        'Configure AWS credentials in Jenkins.'
                    )

                }

                echo '--> AWS credentials detected.'
                echo '--> Running Terraform plan...'

                dir('terraform') {

                    bat '''
                        "%TERRAFORM_EXE%" plan -out=tfplan
                    '''
                }

                echo '--> Terraform plan completed successfully.'
            }
        }
    }
}


        // ==========================================================
        // 10. ANSIBLE
        // ==========================================================
stage('WSL Diagnostic') {
    steps {
        bat '''
            echo ===== WINDOWS USER =====
            whoami

            echo ===== USER PROFILE =====
            echo USERPROFILE=%USERPROFILE%
            echo LOCALAPPDATA=%LOCALAPPDATA%

            echo ===== WSL DISTROS =====
            wsl --list --verbose

            echo ===== WSL STATUS =====
            wsl --status

            echo ===== UBUNTU TEST =====
            wsl -d Ubuntu -- whoami
        '''
    }
}
        stage('10. Ansible Host Configuration Management') {

            steps {

                echo '=========================================================='
                echo '10. ANSIBLE CONFIGURATION MANAGEMENT'
                echo '=========================================================='

                echo '--> Checking Ansible inside WSL...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- ansible --version
                '''

                echo '--> Running Ansible playbook...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- ansible-playbook ^
                        /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/ansible/playbook.yml ^
                        -i /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/ansible/inventory
                '''

                echo '--> Ansible configuration completed.'
            }
        }


        // ==========================================================
        // 11. KUBERNETES DEPLOYMENT
        // ==========================================================

        stage('11. Kubernetes Rolling Deployment') {

            steps {

                echo '=========================================================='
                echo '11. KUBERNETES DEPLOYMENT'
                echo '=========================================================='

                echo '--> Checking kubectl...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl version --client
                '''

                echo '--> Checking Minikube...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- minikube version
                '''

                echo '--> Checking Minikube cluster...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- minikube status
                '''

                echo '--> Loading Docker image into Minikube...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- minikube image load "%FULL_IMAGE"
                '''

                echo '--> Creating Kubernetes namespace...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl create namespace "%K8S_NAMESPACE%" --dry-run=client -o yaml ^
                        | wsl -d "%WSL_DISTRO%" -- kubectl apply -f -
                '''

                echo '--> Applying ConfigMap...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl apply ^
                        -f /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/kubernetes/configmap.yaml ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Applying Deployment...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl apply ^
                        -f /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/kubernetes/deployment.yaml ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Applying Service...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl apply ^
                        -f /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/kubernetes/service.yaml ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Applying Ingress...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl apply ^
                        -f /mnt/c/ProgramData/Jenkins/.jenkins/workspace/MetaForge-CI-CD/kubernetes/ingress.yaml ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Kubernetes resources applied.'
            }
        }


        // ==========================================================
        // 12. DEPLOYMENT VERIFICATION
        // ==========================================================

        stage('12. Production Deployment Verification') {

            steps {

                echo '=========================================================='
                echo '12. PRODUCTION DEPLOYMENT VERIFICATION'
                echo '=========================================================='

                echo '--> Waiting for Kubernetes rollout...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl rollout status ^
                        deployment/%K8S_DEPLOYMENT% ^
                        -n "%K8S_NAMESPACE%" ^
                        --timeout=180s
                '''

                echo '--> Checking deployment...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl get deployment ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Checking pods...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl get pods ^
                        -n "%K8S_NAMESPACE%" ^
                        -o wide
                '''

                echo '--> Checking services...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl get service ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '--> Checking ingress...'

                bat '''
                    wsl -d "%WSL_DISTRO%" -- kubectl get ingress ^
                        -n "%K8S_NAMESPACE%"
                '''

                echo '=========================================================='
                echo 'METAFORGE DEPLOYMENT VERIFIED'
                echo '=========================================================='
            }
        }
    }


    // ==========================================================
    // POST ACTIONS
    // ==========================================================

    post {

        success {

            echo '=========================================================='
            echo 'METAFORGE PIPELINE SUCCESS'
            echo '=========================================================='

            echo 'GitHub       : SUCCESS'
            echo 'Jenkins      : SUCCESS'
            echo 'Tests        : PASSED'
            echo 'Docker       : BUILT'
            echo 'Security     : INSPECTED'
            echo 'Terraform    : VALIDATED'
            echo 'Ansible      : COMPLETED'
            echo 'Kubernetes   : DEPLOYED'
            echo 'Production   : VERIFIED'

            echo '=========================================================='
            echo 'MetaForge CI/CD pipeline completed successfully.'
            echo '=========================================================='
        }

        failure {

            echo '=========================================================='
            echo 'METAFORGE PIPELINE FAILED'
            echo '=========================================================='

            echo 'Check the failed stage above for the exact error.'

            echo '=========================================================='
        }

        always {

            echo 'Cleaning transient Jenkins artifacts...'

            script {

                bat '''
                    if exist terraform\\tfplan del /f /q terraform\\tfplan
                '''
            }
        }
    }
}