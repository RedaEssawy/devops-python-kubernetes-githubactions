# Output the public IP addresses of the EC2 instances
output "master_node_ip" {
    value = module.master_node.ec2_public_id
    description = "The public IP address of the master node EC2 instance"

  
}
# Save the master node IP to a local file
resource "local_file" "master_node_ip" {
    content  = module.master_node.ec2_public_id
    filename = "master_node_ip.txt"
  
}

# Output the public IP address of the worker node 
output "worker_node_ip" {
    value = module.worker_node.ec2_public_id
    description = "The public IP address of the worker node EC2 instance"
  
}
# Save the worker node IP to a local file
resource "local_file" "worker_node_ip" {
    content  = module.worker_node.ec2_public_id
    filename = "worker_node_ip.txt"
  
}

# Output the public IP address of the self-hosted runner EC2 instance
output "runner_ip" {
    value = module.runner.ec2_public_id
    description = "The public IP address of the self-hosted runner EC2 instance"
  
}
# Save the runner IP to a local file
resource "local_file" "runner_ip" {
    content  = module.runner.ec2_public_id
    filename = "runner_ip.txt"
  
}