# Output the ID of the EC2 instance
output "ec2_instance_id" {
    value = aws_instance.ec2_instance.id
    description = "The ID of the Jenkins EC2 instance"
  
}

# Output the public IP address of the EC2 instance
output "ec2_public_id" {
    value = aws_eip.ec2_eip.public_ip
    description = "The public IP address of the Jenkins EC2 instance"
  
}

# Output the public DNS name of the EC2 instance
output "ec2_public_dns" {
    value = aws_eip.ec2_eip.public_dns
    description = "The public DNS name of the Jenkins EC2 instance"
  
}