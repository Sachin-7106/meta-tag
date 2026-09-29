# =========================================================
# MetaForge Terraform Infrastructure as Code Configuration
# =========================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. Virtual Private Cloud (VPC) Network
resource "aws_vpc" "metaforge_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "metaforge-vpc"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# 2. Public Subnet
resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.metaforge_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "metaforge-public-subnet-1a"
  }
}

# 3. Private Subnet
resource "aws_subnet" "private_subnet_b" {
  vpc_id            = aws_vpc.metaforge_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "metaforge-private-subnet-1b"
  }
}

# 4. Security Group for Kubernetes Worker Nodes
resource "aws_security_group" "k8s_cluster_sg" {
  name        = "metaforge-cluster-sg"
  description = "Security rules for MetaForge K8s cluster traffic"
  vpc_id      = aws_vpc.metaforge_vpc.id

  # Allow HTTP web traffic
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow HTTPS secure traffic
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow K8s API Server traffic
  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # Allow outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "metaforge-security-group"
  }
}

# 5. Kubernetes EKS Cluster Placeholder / Local Minikube Mock Resource
resource "aws_eks_cluster" "metaforge_cluster" {
  name     = var.cluster_name
  role_arn = "arn:aws:iam::123456789012:role/MetaForgeEKSClusterRole"

  vpc_config {
    subnet_ids         = [aws_subnet.public_subnet_a.id, aws_subnet.private_subnet_b.id]
    security_group_ids = [aws_security_group.k8s_cluster_sg.id]
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
