# Define the required Terraform providers
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.32.1"
    }
  }
}

# Configure the AWS provider
provider "aws" {
  region = var.aws_region
}

# Configure the TLS provider for generating SSH keys
provider "tls" {
  
}