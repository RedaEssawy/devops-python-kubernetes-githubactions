# Create a VPC and subnets
module "networking" {
    source = "./modules/networking"

    vpc_cidr = var.vpc_cidr
    availability_zones = var.availability_zones
    public_subnet_cidrs = var.public_subnet_cidrs
    allowed_ssh_cidrs = var.allowed_ssh_cidrs
    allowed_http_cidrs = var.allowed_http_cidrs
}

# Create EC2 instance for the master node
module "master_node" {
    source = "./modules/servers"
    ec2_ami = var.ec2_ami
    key_name = aws_key_pair.ssh_key.key_name
    ec2_instance_type = var.ec2_instance_type
    ec2_tags = var.master_node_tag 

    public_subnet_id = module.networking.public_subnet_id
    ec2_sg_id = module.networking.ec2_sg_id
}

# Create EC2 instance for the worker node
module "worker_node" {
    source = "./modules/servers"
    ec2_ami = var.ec2_ami
    key_name = aws_key_pair.ssh_key.key_name
    ec2_instance_type = var.ec2_instance_type
    ec2_tags = var.worker_node_tag
    public_subnet_id = module.networking.public_subnet_id
    ec2_sg_id = module.networking.ec2_sg_id
}

# Create EC2 instance for the self-hosted runner
module "runner" {
    source = "./modules/servers"
    ec2_ami = var.ec2_ami
    key_name = aws_key_pair.ssh_key.key_name
    ec2_instance_type = var.ec2_instance_type
    ec2_tags = var.runner_tag
    public_subnet_id = module.networking.public_subnet_id
    ec2_sg_id = module.networking.ec2_sg_id
}
