# Define a variable for the master node tag
variable "master_node_tag" {
    type = string
    description = "Tags for the master node EC2 instance"
    default = "Master Node"
  
}
# Define a variable for the worker node tag
variable "worker_node_tag" {
    type = string
    description = "Tags for the worker node EC2 instances"
    default = "Worker Node"
  
}

# Define a variable for the self-hosted runner tag
variable "runner_tag" {
    type = string
    description = "Tags for the self-hosted runner EC2 instance"
    default = "Self-Hosted Runner"
  
}


# Define a variable for the region 
variable "aws_region" {
    type = string
    description = "The AWS region to deploy resources in"
    default = "us-east-1"
  
}

# Define a variable for the vpc CIDR block
variable "vpc_cidr" {
    type = string
    description = "The CIDR block for the VPC"
    default = "10.0.0.0/16"
  
}

# Define a variable for the availability zones
variable "availability_zones" {
    type = string
    description = "Availability zone"
    default = "us-east-1a"
  
}

# Define a variable for the public subnet CIDR blocks

variable "public_subnet_cidrs" {
    type = string
    description = "Public subnet CIDR blocks"
    default = "10.0.1.0/24"
  
}

# Define a variable for the ec2 instance type
variable "ec2_instance_type" {
    type = string
    description = "The instance type for the Jenkins server"
    default = "t2.micro"
  
}

# Define a variable for the ec2 AMI
variable "ec2_ami" {
    type = string
    description = "The AMI ID for the EC2 instance"
    default = "ami-0b6c6ebed2801a5cb"
  
}

# Define a variable for the SSH allowed CIDR blocks
variable "allowed_ssh_cidrs" {
    type = list(string)
    description = "List of CIDR blocks allowed to access Jenkins via SSH"
    default = ["0.0.0.0/0"]
  
}

# Define a variable for the HTTP allowed CIDR blocks
variable "allowed_http_cidrs" {
    type = list(string)
    description = "List of CIDR blocks allowed to access Jenkins via HTTP"
    default = ["0.0.0.0/0"]
  
}