variable "aws_region" {
  description = "Target AWS Cloud region for EKS cluster infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Name of the Kubernetes cluster"
  type        = string
  default     = "metaforge-cluster"
}

variable "environment" {
  description = "Deployment environment namespace"
  type        = string
  default     = "production"
}

variable "node_instance_type" {
  description = "EC2 instance size for worker node group"
  type        = string
  default     = "t3.medium"
}

variable "desired_capacity" {
  description = "Desired number of Kubernetes worker nodes"
  type        = number
  default     = 3
}
