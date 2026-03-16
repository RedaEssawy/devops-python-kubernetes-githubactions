# Output the ID of the VPC
output "vpc_id" {
    value = aws_vpc.main.id
    description = "The ID of the VPC"
  
}
# Output the IDs of the public subnets
output "public_subnet_id" {
    value = aws_subnet.public.id
    description = "The IDs of the public subnets"
  
}

# Output the ID of the security group for the EC2 instance
output "ec2_sg_id" {
    value = aws_security_group.ec2_sg.id
    description = "The ID of the security group for the EC2 instance"
  
}