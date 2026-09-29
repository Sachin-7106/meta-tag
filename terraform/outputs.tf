output "cluster_name" {
  description = "Kubernetes EKS Cluster Name"
  value       = aws_eks_cluster.metaforge_cluster.name
}

output "cluster_endpoint" {
  description = "Endpoint for Kubernetes API Server"
  value       = aws_eks_cluster.metaforge_cluster.endpoint
}

output "vpc_id" {
  description = "Virtual Private Cloud ID"
  value       = aws_vpc.metaforge_vpc.id
}

output "security_group_id" {
  description = "Cluster Security Group ID"
  value       = aws_security_group.k8s_cluster_sg.id
}
