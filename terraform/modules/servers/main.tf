# Create a public EC2 instance
resource "aws_instance" "ec2_instance" {
  ami = var.ec2_ami
  instance_type = var.ec2_instance_type
  key_name = var.key_name
  subnet_id = var.public_subnet_id
  vpc_security_group_ids = [ var.ec2_sg_id ]

  tags = {
    
    Name = var.ec2_tags
  }
  
}   

# Allocate an Elastic IP and associate it with the EC2 instance
resource "aws_eip" "ec2_eip" {
  instance = aws_instance.ec2_instance.id
  domain = "vpc"
  tags = {
    Name = "ec2-eip"
  }
}