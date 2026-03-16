# ami variable for the public EC2 instance
variable "ec2_ami" {
    type = string
    description = "The AMI ID for the Jenkins server"
    default = "ami-0b6c6ebed2801a5cb"
  
}
# Instance type variable for the Jenkins server
variable "ec2_instance_type" {
    type = string
    description = "The instance type for the Jenkins server"
    default = "t2.micro"
  
}
# Key name variable for SSH access to the Jenkins server
variable "key_name" {
    type = string
    description = "SSH key pair name"
  
}

# tags variable for the public EC2 instance
variable "ec2_tags" {
  description = "Tags for the EC2 instance"
  type        = string
  default     = ""
  
}
# subnet ID variable for the public EC2 instance
variable "public_subnet_id" {
  description = "Subnet ID for the public EC2 instance"
  type        = string
  default     = ""
  
}
variable "ec2_sg_id" {
  description = "Security group ID for the EC2 instance"
  type        = string

  
}