output "master_node_ip" {
    value = module.master_node.ec2_public_id
    description = "The public IP address of the master node EC2 instance"
  
}

output "worker_node_ip" {
    value = module.worker_node.ec2_public_id
    description = "The public IP address of the worker node EC2 instance"
  
}

output "runner_ip" {
    value = module.runner.ec2_public_id
    description = "The public IP address of the self-hosted runner EC2 instance"
  
}