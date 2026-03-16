# Define a variable for the public subnet CIDR blocks
variable "public_subnet_cidrs" {
  description = "List of public subnet CIDR blocks"
  type        = string
  default     = "10.0.1.0/24"
}

# Define a variable for the availability zones
variable "availability_zones" {
  description = "List of availability zones"
  type        = string
  default     = "us-east-1a"
}

# Define a variable for the VPC CIDR block
variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

# Define a variable for the allowed SSH CIDR blocks
variable "allowed_ssh_cidrs" {
  description = "List of CIDRs allowed for SSH access"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Change in production
}

# Define a variable for the allowed HTTP CIDR blocks
variable "allowed_http_cidrs" {
  description = "List of CIDRs allowed for HTTP access"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}
